export class AddCommentCommand {
  constructor(
    public readonly userId: number,
    public readonly bookId: number,
    public readonly commentText: string,
  ) {}
}
