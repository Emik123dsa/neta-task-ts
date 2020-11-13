export type InjectionToken<T extends any> = Constructor2<T> | string | symbol;

export function isNormalToken(
  payload?: InjectionToken<any>
): payload is string | symbol {
  return typeof payload === "string" || typeof payload === "symbol";
}

export function isConstructorToken(
  payload?: InjectionToken<any>
): payload is Constructor2<any> {
  return typeof payload === "function";
}

export interface TokenDescriptor {
  token: InjectionToken<any>;
  multiple: boolean;
}

export type ParamInfo = TokenDescriptor | InjectionToken<any>;

export const typeInfo = new Map<Constructor2<any>, ParamInfo[]>();

export default InjectionToken;
