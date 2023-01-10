export class RemoveFromFavoritesCommand {
  constructor(public readonly userId: number, public readonly bookId: number) {}
}
