import { AddCopyToCartHandler } from './addCopyToCart.handler';
import { AddToCartHandler } from './addToCart.handler';
import { RemoveAllBooksFromCartHandler } from './removeAllBooksFromCart.handler';
import { RemoveBookFromCartHandler } from './removeBookFromCart.handler';
import { RemoveCopyFromCartHandler } from './removeCopyFromCart.handler';

export const CommandHandlers = [
  AddToCartHandler,
  AddCopyToCartHandler,
  RemoveCopyFromCartHandler,
  RemoveBookFromCartHandler,
  RemoveAllBooksFromCartHandler,
];
