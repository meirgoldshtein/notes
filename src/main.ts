import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(PORT || 3000,
    () => console.log(`Application is running on: http://localhost:${PORT}`),
  );
}
bootstrap();
