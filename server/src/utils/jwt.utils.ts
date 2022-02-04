import config from "config";
import jwt from "jsonwebtoken";

const privateKey = config.get("privateKey") as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (err: any) {
    return {
      valid: false,
      // We will use expired to see if we should reissue another token
      expired: err.message === "JWT expired",
      decoded: null,
    };
  }
}