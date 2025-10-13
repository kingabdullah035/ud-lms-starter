// api/src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ✅ Make every route start with /api (e.g., /api/courses)
  app.setGlobalPrefix('api')

  // CORS (from your .env)
  const origins = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  app.enableCors({
    origin: origins.length ? origins : true,
    credentials: true,
  })

  const port = parseInt(process.env.PORT ?? '4000', 10)
  await app.listen(port, '0.0.0.0')
  console.log(`API listening on :${port}`)
}
bootstrap()
