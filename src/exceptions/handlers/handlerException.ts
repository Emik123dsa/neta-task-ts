/**
 * An Instance of Handler Exception
 *
 * @export
 * @class HandlerException
 */
export class HandlerException {
  public error(payload: Error | undefined): void {
    console.error(payload);
  }
}
