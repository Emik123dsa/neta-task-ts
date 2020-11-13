// import { DotenvParseOptions } from "dotenv/types";
import { EnvironmentApplicationSchema } from "@neta/common/decorators";
import * as dotenv from "dotenv";

@EnvironmentApplicationSchema({
  isErrorModeEnabled: true,
})
export class EnvironemntSchema
  implements
    Environment.Schema<Environment.Response<dotenv.DotenvParseOptions>> {
  public _EnvironmentSchema!: Environment.Response<dotenv.DotenvParseOptions>;
  /**
   * Parsed
   *
   * @readonly
   * @type {(Readonly<dotenv.DotenvParseOptions> | undefined)}
   * @memberof Env
   */
  public get _Parsed(): (payload: string) => string {
    let vm = this as OmitThisParameter<this>;
    return function (payload: string) {
      return (vm._EnvironmentSchema?.parsed as dotenv.DotenvParseOutput)[
        payload
      ];
    };
  }
  /**
   * Errors Env
   *
   * @readonly
   * @type {(Readonly<Error> | undefined)}
   * @memberof Env
   */
  public get _Errors(): Error {
    return this._EnvironmentSchema?.error as Error;
  }
}
