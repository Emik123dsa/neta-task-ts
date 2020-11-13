export class FetchException implements Error {
  public constructor(
    public readonly message: string,
    public readonly stack: string,
    public readonly name: string
  ) {}
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
