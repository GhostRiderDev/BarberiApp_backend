import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CacthAllExceptionsFilter } from './utils/cathAllErrors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new CacthAllExceptionsFilter());
  const config = new DocumentBuilder()
    .setTitle('Barberia API')
    .setDescription('The barberia API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
