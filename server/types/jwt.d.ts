import "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    _id?: string;
  }
}
