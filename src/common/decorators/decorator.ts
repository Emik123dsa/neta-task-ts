import InjectionToken, {
  ParamInfo,
  typeInfo,
} from "@neta/providers/injection-token";
import { ctorApplicationSchema } from "@neta/coercion";
import * as dotenv from "dotenv";
import "reflect-metadata";
import * as path from "path";

const rootSchema: symbol = Symbol("rootSchema");
const environmentSchema: symbol = Symbol("environmnetSchema");
const injectableSchema: symbol = Symbol("injectableSchema");

const _Env: dotenv.DotenvConfigOutput = dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
/**
 * Class Environment Decorator
 *
 * @export
 * @template T
 * @param {T} constructor
 * @returns
 */
export function EnvironmentApplicationSchema({
  isErrorModeEnabled,
}: Pick<Environment.Factory, "isErrorModeEnabled">) {
  return <T extends Constructor>(_targetConstructor: T) => {
    let _EnvParsedOutput: Environment.Response<dotenv.DotenvParseOutput> = {
      parsed: _Env.parsed,
    };

    if (isErrorModeEnabled) {
      Object.assign(_EnvParsedOutput, {
        error: _Env.error,
      } as Environment.Response<dotenv.DotenvParseOutput>);
    }

    let _EnvMutator = class extends _targetConstructor {
      public _EnvironmentSchema: Environment.Response<
        dotenv.DotenvParseOutput
      > = _EnvParsedOutput;
    };

    Object.defineProperty(_EnvMutator, environmentSchema, {
      value: (_targetConstructor as any).environmentSchema,
    });

    return _EnvMutator;
  };
}

/**
 * Class Root Decorator
 *
 * @export
 * @template T
 * @param {T} constructor
 * @returns
 */
export function RootApplicationSchema({
  imports,
  declarations,
  providers,
  bootstrap,
}: Partial<Application.Factory>) {
  return <T extends Constructor>(_targetConstructor: T) => {
    let _RootMutator = class extends _targetConstructor {
      public __BOOTSTRAP__ = ctorApplicationSchema(bootstrap);
      public __PROVIDER__ = ctorApplicationSchema(providers);
      public __DECLARATIONS__ = ctorApplicationSchema(declarations);
      public __IMPORTS__ = ctorApplicationSchema(imports);
    };

    Object.defineProperty(_RootMutator, rootSchema, {
      value: (_targetConstructor as any).rootSchema,
    });

    return _RootMutator;
  };
}
export const INJECTION_TOKEN_METADATA_KEY = "injectionTokens";
/**
 * Get Params Info (From DI library)
 *
 * @export
 * @param {Constructor} target
 * @returns {ParamInfo[]}
 */
export function getParamInfo(target: Constructor): ParamInfo[] {
  const params: any[] =
    Reflect.getOwnMetadata("design:paramtypes", target) || [];

  const injectionTokens: Dictionary<InjectionToken<any>> =
    Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};

  Object.keys(injectionTokens).forEach((key) => {
    params[+key] = injectionTokens[key];
  });

  return params;
}

export function Injectable<T extends Constructor>() {
  return (_targetConstructor: T): void => {
    const paramInfo: ParamInfo[] = getParamInfo(_targetConstructor);
    // console.log(paramInfo);
   
    // return class extends _targetConstructor {
    //   // public constructor(...args: any[]) {
    //   //   super();
    //   // }
    // };
  };
}
