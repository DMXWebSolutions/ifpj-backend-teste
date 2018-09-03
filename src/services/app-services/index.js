const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_APP_HOST,
    user: process.env.MYSQL_APP_USER,
    password: process.env.MYSQL_APP_PASSWORD,
    database:process.env.MYSQL_APP_DATABASE,
});

const errorHandler  = (error, msg, rejectFunction) => {
    console.error(error);
    rejectFunction({ error: msg});
}

const usersModule = require('./users')({ connection, errorHandler });
const notificationsModule = require('./notifications')({ connection, errorHandler });

module.exports = {
    users: () => usersModule,
    notifications: () => notificationsModule,
}