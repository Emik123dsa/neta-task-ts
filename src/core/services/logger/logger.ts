import { HandlerException } from "@neta/exceptions/handlers";
/**
 * Logger Service
 *
 * @export
 * @class Logger
 */
export class LoggerService implements Environment.Logger {
  protected readonly handlerException: HandlerException;
  public constructor() {
    this.handlerException = new HandlerException();
  }
  /**
   * LOG
   *
   * @param {(string | undefined)} payload
   * @param {...any[]} options
   * @memberof Logger
   */
  public log(payload: string | undefined, ...options: any[]) : void {
    console.log(payload, ...options);
  }
  /**
   * ERROR
   *
   * @param {(Error | undefined)} payload
   * @memberof Logger
   */
  public error(payload: Error | undefined) {
    this.handlerException.error(payload);
  }
  /**
   * WARN
   *
   * @param {(string | undefined)} payload
   * @param {...any[]} options
   * @memberof Logger
   */
  public warn(payload: string | undefined, ...options: any[]) {
    console.warn(payload, ...options);
  }
}
