export class GetFiltredBooksQuery {
  constructor(
    public readonly genre: string,
    public readonly minPrice: string,
    public readonly maxPrice: string,
    public readonly sorting: string,
    public readonly page: string,
    public readonly search: string,
  ) {}
}
