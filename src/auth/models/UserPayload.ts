export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  type: string;
  iat?: number;
  exp?: number;
}
