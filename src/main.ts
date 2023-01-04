import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure doc titles
  const swaggerConfig = new DocumentBuilder()
    .setTitle('MongoDB REST API')
    .setDescription('Kenility challenge API REST con MongoDB')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Docs route
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
