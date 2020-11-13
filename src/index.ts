import { initApplication } from "@neta/common/init";
import { RootApplication } from "@neta/root";

initApplication(RootApplication as InitBootstrap & typeof RootApplication)
  .then(() => {})
  .catch((reason: Error | undefined): void => {
    console.log(reason);
  });
