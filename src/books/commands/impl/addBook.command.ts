export class AddBookCommand {
  constructor(
    public readonly cover: string,
    public readonly title: string,
    public readonly author: string,
    public readonly description: string,
    public readonly dateOfIssue: string,
    public readonly genre: string[],
    public readonly hardCover: boolean,
    public readonly hardCoverPrice: number,
    public readonly paperback: boolean,
    public readonly paperbackPrice: number,
    public readonly status: string,
    public readonly rating: number,
  ) {}
}
