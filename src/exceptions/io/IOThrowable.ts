import { IOException } from "./IOException";

export function IOThrowable(): Error {
  throw new IOException(`[, ENVIRONMENT IS CONSISTING ANY ERROR]`);
}
