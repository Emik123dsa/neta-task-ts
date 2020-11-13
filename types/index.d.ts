/// <reference no-default-lib="true"/>

import { Headers } from "node-fetch";

declare global {
  export type EncodeSchema = "utf-8";
  /**
   *  Constructors Instance
   */
  export type Constructor = new (...args: any[]) => {};
  export type Constructor2<T> = new (...args: any[]) => T;
  /**
   *  Abstract Constructor Instance
   */
  export type AbstractConstructor<A> = Function & { prototype: A };

  export namespace IInjector {
    export type Name = string | symbol | number;
  }
  /**
   * Injector instance
   *
   * @interface IDI
   * @template T
   */
  export interface Injector<T> {
    set(
      name: IInjector.Name,
      payload: T | T[]
    ): (name: IInjector.Name, payload: T | T[]) => void;
    get(name: IInjector.Name): Readonly<T>;
    has(name?: IInjector.Name): boolean;
  }
  /**
   * Async Dependency Injection
   *
   * @interface IAsyncDI
   * @template T
   */
  export interface AsyncInjector<T> {
    set(
      name: IInjector.Name,
      payload: T | T[]
    ): (name: IInjector.Name, payload: T | T[]) => Promise<void>;
    get(name: IInjector.Name): Readonly<Promise<T>>;
    has(name?: IInjector.Name): Promise<boolean>;
  }

  /**
   *  Resolving of current environment,
   *  which is provided by .env file
   */
  export namespace Environment {
    /**
     * Environment Schema
     *
     * @export
     * @interface Schema
     * @template T
     */
    export interface Schema<T> {
      _EnvironmentSchema: T;
    }
    /**
     * Config Schema
     *
     * @export
     * @interface Config
     */
    export interface Config {
      ROOT_API: string;
      REQUEST_HEADERS:
        | Headers[]
        | string[][]
        | Record<string, string>
        | undefined;
      CANDIDATE_EMAIL: string;
    }
    /**
     * Response Schema
     *
     * @export
     * @interface Response
     * @template T
     */
    export interface IResponse<T> {
      error: Error;
      parsed: T;
    }
    /**
     *  Response undefined
     */
    export type Response<T> = {
      [P in keyof IResponse<T>]?: IResponse<T>[P] | undefined;
    };
    /**
     * Factory for ENV
     *
     * @export
     * @interface Factory
     */
    export interface Factory {
      isErrorModeEnabled: boolean;
    }

    export interface Logger {
      log: (payload: string | undefined, ...options: any[]) => void;
      error: (payload: Error | undefined) => void;
      warn: (payload: string | undefined, ...options: any[]) => void;
    }
  }

  export namespace Application {
    export interface Factory {
      imports?: Constructor[];
      providers?: Constructor[];
      declarations?: Constructor[];
      bootstrap?: Constructor[];
    }
  }

  export interface ResponesEntity<T> {
    code: number;
    message: T;
  }

  export interface InitBootstrap {
    main: (...args: any[]) => void;
  }

  export type Dictionary<T> = { [key: string]: T };

  export namespace HtmlDomParser {
    export type Type = string | null;
    export type Name = string | null;
    export type Attributes = Record<string, string>;
    export interface IOutput {
      type?: HtmlDomParser.Type;
      name?: HtmlDomParser.Name;
      attribs?: HtmlDomParser.Attributes | HtmlDomParser.Attributes[];
      children?: HtmlDomParser.IOutput[];
      next?: HtmlDomParser.IOutput;
      prev?: HtmlDomParser.IOutput;
      parent?: HtmlDomParser.IOutput;
    }
    export type Output = { [P in keyof IOutput]: IOutput[P] | undefined };
  }
}
