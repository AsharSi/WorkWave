import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    next();
    return;
    const token = req.cookies.access_token;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) return next(errorHandler(403, 'Forbidden!'));

            req.user = user;
            next();
        })
    } else {
        return next(errorHandler(401, 'You are not authenticated!'));
    }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
    next();
    return;
    const headers = req.headers;
    verifyToken(req, res, () => {
        if(req.user.id === headers.user || req.user.isAdmin){
            next()
        } else {
            return next(errorHandler(403, 'You are not allowed to do so!'));
        }
    })
};

export const verifyTokenAndAdmin = (req, res, next) => {
    next();
    return;
    verifyToken(req, res, () => {
        if( req.user.isAdmin ){
            next()
        } else {
            return next(errorHandler(403, 'You are not an admin!'));
        }
    })
};
