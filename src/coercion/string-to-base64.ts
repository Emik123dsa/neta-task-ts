import { Base64 } from "js-base64";
/**
 * To Base 64 Coder Coercion
 *
 * @export
 * @param {string} payload
 * @param {EncodeSchema} [encoding="utf-8"]
 * @returns {(string | void)}
 */
export function to_base_64(
  payload: string,
  encoding: EncodeSchema = "utf-8"
): string | void {
  const bytes: string = Base64.btoaPolyfill(payload);
  return bytes;
}
