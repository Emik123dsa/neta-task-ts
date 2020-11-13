import { RootApplication } from "@neta/root";
/**
 * initApplication
 *
 * @export
 * @param {Constructor} __initApplication
 * @returns {Promise<void>}
 */
export function initApplication(
  __initApplication: typeof RootApplication & InitBootstrap
): Promise<void> {
  return new Promise(
    (
      res: (value: void | PromiseLike<void>) => void,
      rej: (reason?: any) => void
    ): void => {
      try {
        const __CLASS__: RootApplication = new __initApplication();
        res((__CLASS__ as InitBootstrap).main());
      } catch (e) {
        rej(e);
      }
    }
  );
}
