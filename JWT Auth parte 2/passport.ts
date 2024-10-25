import 'dotenv/config'
import passport from "passport";
import passportJWT from "passport-jwt";
import { db } from "./db";

const SECRET = process.env.SECRET || '';

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        const user = await db.one(`SELECT * FROM users WHERE id=$1`, payload.id);
        return user ? done(null, user) : done(new Error("user not found"));
      } catch (error) {
        done(error);
      }
    }
  )
);
