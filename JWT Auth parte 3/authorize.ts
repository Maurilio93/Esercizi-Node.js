import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: Express.User | undefined) => {
    if (!user || err) {
      res.status(401).json({ msg: `Unathorized` });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
