// main.ts no backend NestJS
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors() // <---- Importante para permitir requests do Next.js
  await app.listen(3000)
  app.enableCors();

}
bootstrap()
