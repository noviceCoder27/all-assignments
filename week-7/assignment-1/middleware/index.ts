export {};
const jwt = require('jsonwebtoken');
import { Request,Response,NextFunction } from 'express';
const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

interface RequestObject extends Request{
  userId : string;
}

interface User {
  id: string
}

const authenticateJwt = (req : RequestObject, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err :object, user: User) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
    authenticateJwt,
    SECRET
}
