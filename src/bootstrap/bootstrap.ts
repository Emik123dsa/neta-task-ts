import chalk from "chalk";
import { FetchService } from "./../core/services/fetch/fetch";
import { EnvironemntSchema } from "@neta/environment";
import { ChalkService } from "@neta/core/services/chalk/chalk";
import { LoggerService } from "@neta/core/services/logger/logger";
import { autoInjectable as Injectable, inject as Inject } from "tsyringe";
import { IOThrowable } from "@neta/exceptions/io/IOThrowable";
import parse from "html-dom-parser";
import { to_base_64 } from "@neta/coercion";

@Injectable()
export class BootstrapApplication {
  private readonly HTML_REG_EXP: RegExp = /<\s*html[^>]*>(.*?)<\s*\/s*html>/;

  public constructor(
    private readonly _loggerService: LoggerService,
    private readonly _chalkService: ChalkService,
    @Inject(FetchService) private _fetchService,
    @Inject(EnvironemntSchema) private _env: EnvironemntSchema
  ) {
    try {
      if (this.getErrors) IOThrowable();
      const vm = this as OmitThisParameter<this>;

      this.initScript().then((data: string | void | Error):
        | Error
        | void
        | never => {
        if (typeof data !== "string") return IOThrowable();
        vm.sendPacket(data);
      });
    } catch (e) {
      this._loggerService.log(chalk.bold.red("O-ops! Something went wrong"));
    }
  }

  private async sendPacket(payload: string): Promise<void> {
    try {
      const Schema: ResponesEntity<string> = await this._fetchService.json(
        this.getApiRoot,
        "POST",
        {
          "Candidate-Email": this.getEmail,
          Authorization: `Bearer ${to_base_64(payload)}`,
        }
      );

      this._loggerService.log(
        chalk.yellowBright(
          (`Token authorization: ` +
            Schema.message.replace(/(.*)(\:)?\s(.*)/gim, "$3")) as string
        )
      );
    } catch (e) {
      this._loggerService.log(chalk.bold.red("O-ops! Something went wrong"));
    }
  }

  private async initScript(): Promise<void | Error | string> {
    try {
      let Schema: string = await this._fetchService.text(
        this.getApiRoot,
        "GET"
      );

      const SchemaFormatted: string | null = Schema.replace(/(\n|\r)+/gim, "");

      let RegHtmlParsed!: RegExpMatchArray | null;

      if (!(RegHtmlParsed = SchemaFormatted.match(this.HTML_REG_EXP)))
        return IOThrowable();

      const domParsed: HtmlDomParser.Output[] = parse(RegHtmlParsed[0]);

      const parsedTags: string[] = this.parseHtmlText(domParsed);

      const parseTagsAmount:
        | Record<string, number>
        | undefined = this.parseTagsAmount(parsedTags.sort());

      if (!parseTagsAmount) return IOThrowable();

      return this.getBearerToken(parseTagsAmount);
    } catch (e) {
      this._loggerService.log(chalk.bold.red("O-ops! Something went wrong"));
    }
  }

  private parseHtmlText<T extends HtmlDomParser.Output>(
    payload: T[],
    acc: string[] = []
  ): string[] {
    if (Array.isArray(payload) && payload.length > 0) {
      payload.forEach((item: T, index: number): void => {
        if (item.name) {
          acc.push(item.name as string);
        }
        if (Array.isArray(item.children) && item.children.length > 0) {
          this.parseHtmlText(item.children, acc);
        }
      });
    }

    return acc;
  }

  private parseTagsAmount(payload: string[]) {
    if (payload.length > 0) {
      return payload.reduce((acc: Record<string, number>, item: string): Record<
        string,
        number
      > => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
    }
  }

  private getBearerToken(
    parseTagsAmount: Record<string, number>
  ): Readonly<string> {
    let _authToken: string = "";

    for (const _item in parseTagsAmount) {
      if (parseTagsAmount.hasOwnProperty(_item)) {
        _authToken += _item + parseTagsAmount[_item];
      }
    }

    return _authToken;
  }

  private get getEmail(): Readonly<string> {
    return this._env._Parsed("CANDIDATE_EMAIL");
  }

  private get getApiRoot(): Readonly<string> {
    return this._env._Parsed("API_ROOT");
  }

  private get getErrors(): Readonly<Error> {
    return this._env._Errors;
  }
}
