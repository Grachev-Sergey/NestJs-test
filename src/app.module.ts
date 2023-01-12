import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmAsyncConfig } from './config/typeorm.config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { GenreModule } from './genre/genre.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CartModule } from './cart/cart.module';
import { RatingModule } from './rating/rating.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    AuthModule,
    BooksModule,
    GenreModule,
    FavoritesModule,
    CartModule,
    RatingModule,
    CommentsModule,
  ],
})
export class AppModule {}
