// api/src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // All routes start with /api (e.g., /api/courses)
  app.setGlobalPrefix('api')

  // Optional but recommended
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // ✅ Hard-coded explicit CORS (no wildcards)
  app.enableCors({
    origin: [
      'http://localhost:3000',                        // local dev
      'https://b2182526.ud-lms-starter.pages.dev',   // your Cloudflare Pages URL
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })

  const port = Number(process.env.PORT ?? 4000)
  await app.listen(port, '0.0.0.0')
  console.log(`API listening on :${port} with prefix /api`)
}
bootstrap()
