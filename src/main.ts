import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import { PrismaExceptionFilter } from './common/filter/prisma-exception.filter';

async function bootstrap() {
  const logger = new Logger('main.ts');

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost)),
    new PrismaExceptionFilter(app.get(HttpAdapterHost)),
  );

  const config = new DocumentBuilder()
    .setTitle('trotot API')
    .setDescription(
      'This is trotot API project: A platform for renting houses, apartments, and rooms and franchising real estate.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
