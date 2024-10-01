import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('ShelfMateAPI')
  .setDescription('API to manage ShelfMate')
  .setVersion('1.0')
  .build();
