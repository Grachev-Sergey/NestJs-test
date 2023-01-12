import type { OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { AddCommentCommand } from './commands/impl';

import { CommentDto } from './dto/comments.dto';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class CommentsGeteway implements OnModuleInit {
  constructor(private commandBus: CommandBus) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      // eslint-disable-next-line no-console
      console.log(socket.id);
    });
  }

  @SubscribeMessage('addComment')
  async onNewMessage(@MessageBody() body: CommentDto) {
    const { userId, bookId, commentText } = body;
    const newComment = await this.commandBus.execute(
      new AddCommentCommand(userId, bookId, commentText),
    );
    this.server.emit('addComment', newComment);
  }
}
