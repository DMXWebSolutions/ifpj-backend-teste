const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const user = require('../services/mongo/models/users')
const restify = require('restify')

const jwtMiddleware = (deps) => {
  return async (req, res, next) => {
    if(!deps.exclusions.includes(req.href())) {

      const token = req.headers['x-access-token']

      if(!token) {
        return res.send(403, { error: 'Token não fornecido'})  
      }

      // try {
      //   req.decoded = jwt.verify(token, authConfig.secret)

      // } catch (error) {
      //   console.log(error)
      //   res.send(403, { error: 'Falha ao autenticar o token'})
      // }

      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.send(401, { error: 'Token invalid' });
    
        req.userId = decoded.id;
        return next();
      });
    }
    
    return next()
  }
}


module.exports = jwtMiddleware

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader)
//     return res.status(401).send({ error: 'No token provided' });

//   const parts = authHeader.split(' ');

//   if (!parts.length === 2)
//     return res.status(401).send({ error: 'Token error' });

//   const [ scheme, token ] = parts;

//   if (!/^Bearer$/i.test(scheme))
//     return res.status(401).send({ error: 'Token malformatted' });

//   jwt.verify(token, authConfig.secret, (err, decoded) => {
//     if (err) return res.status(401).send({ error: 'Token invalid' });

//     req.userId = decoded.id;
//     return next();
//   });
// };
