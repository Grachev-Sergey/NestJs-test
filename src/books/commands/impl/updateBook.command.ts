import type { Genre } from '../../../db/entities/genre.entity';

export class UpdateBookCommand {
  constructor(
    public readonly cover: string,
    public readonly title: string,
    public readonly author: string,
    public readonly description: string,
    public readonly dateOfIssue: string,
    public readonly genre: Genre[],
    public readonly hardCover: boolean,
    public readonly hardCoverPrice: number,
    public readonly paperback: boolean,
    public readonly paperbackPrice: number,
    public readonly status: string,
    public readonly rating: number,
    public readonly bookId: number,
  ) {}
}
