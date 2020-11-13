import chalk from "chalk";
/**
 * Chalk Service
 *
 * @export
 * @class ChalkService
 */
export class ChalkService {
  public accept(payload: string): void {
    const accept: chalk.Chalk = chalk.bold.green;
    accept(payload);
  }

  public warn(payload: string): void {
    const warn: chalk.Chalk = chalk.keyword("orange");
    warn(payload);
  }

  public error(payload: string): void {
    const error: chalk.Chalk = chalk.bold.red;
    error(payload);
  }
}
