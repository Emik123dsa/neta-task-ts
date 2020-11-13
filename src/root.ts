import { EnvironemntSchema } from "@neta/environment";
import { RootApplicationSchema } from "@neta/common/decorators";
import { LoggerService } from "@neta/core/services/logger";
import { ChalkService } from "@neta/core/services/chalk";
import { BootstrapApplication } from "@neta/bootstrap";
/**
 * Root Application Schema Definition
 *
 * @export
 * @class RootApplication
 */
@RootApplicationSchema({
  imports: [EnvironemntSchema],
  providers: [LoggerService, ChalkService],
  bootstrap: [BootstrapApplication],
})
export class RootApplication {
  public main(...args: any[]): void {}
}
