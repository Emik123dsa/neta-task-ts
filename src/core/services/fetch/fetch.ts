import fetch, { Headers, Response } from "node-fetch";
/**
 * Fetch Service
 *
 * @export
 * @class FetchService
 */
export class FetchService {
  public async json<T>(
    query: string,
    method: string = "GET",
    headers?: Headers | string[][] | { [key: string]: string } | undefined
  ): Promise<T> {
    try {
      const _SCHEMA_RESPONSE: Response = await fetch(query, {
        method,
        headers,
      });

      if (_SCHEMA_RESPONSE.status !== 200 && !_SCHEMA_RESPONSE.ok) {
        Promise.reject(_SCHEMA_RESPONSE);
      }

      return (await _SCHEMA_RESPONSE.json()) as Promise<T>;
    } catch (e) {
      return e as Record<any, any>;
    }
  }

  public async text(
    query: string,
    method: string = "GET",
    headers?: Headers | string[][] | { [key: string]: string } | undefined
  ): Promise<string | Record<string, any>> {
    return new Promise(
      async (
        resolve: (
          value:
            | string
            | Record<string, any>
            | PromiseLike<string | Record<string, any>>
        ) => void,
        reject: (reason?: any) => void
      ) => {
        try {
          const _SCHEMA_RESPONSE: Response = await fetch(query, {
            method,
            headers,
          });

          if (_SCHEMA_RESPONSE.status !== 200 && !_SCHEMA_RESPONSE.ok) {
            reject(_SCHEMA_RESPONSE);
          }

          resolve(await _SCHEMA_RESPONSE.text());
        } catch (e) {
          reject(JSON.parse(e));
        }
      }
    );
  }
}
