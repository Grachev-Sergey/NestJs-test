import { GetAllBooksHandler } from './getAllBooks.handler';
import { GetFiltredBooksHandler } from './getFiltredBooks.handler';
import { GetOneBookHandler } from './getOneBook.handler';
import { GetRecommendedBooksHandler } from './getRecommendedBooks.handler';

export const QueryHandlers = [
  GetAllBooksHandler,
  GetFiltredBooksHandler,
  GetRecommendedBooksHandler,
  GetOneBookHandler,
];
