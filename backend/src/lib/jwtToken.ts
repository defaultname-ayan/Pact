import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const signJWT = (payload: object, options?: jwt.SignOptions) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, options || {}, (err, token) => {
      if (err || !token) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as {
    userId: number;
    iat: number;
    exp: number;
  };
};
