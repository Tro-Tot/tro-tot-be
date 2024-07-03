import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('main.ts');
  const config = new DocumentBuilder()
    .setTitle('trotot API')
    .setDescription(
      'This is trotot API project: A platform for renting houses, apartments, and rooms and franchising real estate.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
