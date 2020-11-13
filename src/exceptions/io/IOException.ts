export class IOException extends Error {
  public constructor(public readonly message: string) {
    super(message);
  }
  /**
   * printStack Trace
   *
   * @returns {string}
   * @memberof FetchException
   */
  public printStackTrace(): string {
    return this.message;
  }
  /**
   * To String
   *
   * @returns {string}
   * @memberof FetchException
   */
  public toString(): string {
    return `message : ${this.message}`;
  }
}
