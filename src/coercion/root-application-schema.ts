/**
 * Ctor Application Schema
 *
 * @export
 * @template T
 * @param {T[]} payload
 * @returns {*}
 */
export function ctorApplicationSchema<T extends Constructor>(
  payload: T[] | undefined
): any {
  if (payload) {
    for (const _payload of payload) {
      return { ...new _payload() };
    }
  }
}
