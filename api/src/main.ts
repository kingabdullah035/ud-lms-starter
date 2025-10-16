// // api/src/main.ts
// import { NestFactory } from '@nestjs/core'
// import { AppModule } from './app.module'
// import { ValidationPipe } from '@nestjs/common'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)

//   // All routes start with /api (e.g., /api/courses)
//   app.setGlobalPrefix('api')

//   // Optional but recommended
//   app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

//   // ✅ Hard-coded explicit CORS (no wildcards)
//   app.enableCors({
//     origin: [
//       'http://localhost:3000',                        // local dev
//       'https://b2182526.ud-lms-starter.pages.dev',   // your Cloudflare Pages URL
//     ],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     credentials: true,
//   })

//   const port = Number(process.env.PORT ?? 4000)
//   await app.listen(port, '0.0.0.0')
//   console.log(`API listening on :${port} with prefix /api`)
// }
// bootstrap()


// api/src/main.ts
// api/src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

function parseCorsEnv(): (string | RegExp)[] {
  // Allow adding more origins via env, e.g.
  // CORS_ORIGIN="https://myapp.com,https://staging.myapp.com"
  const raw = process.env.CORS_ORIGIN?.trim()
  if (!raw) return []
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // All routes start with /api (e.g., /api/courses)
  app.setGlobalPrefix('api')

  // Optional but recommended
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // CORS: allow local dev and Cloudflare Pages (prod + preview subdomains)
  const defaultOrigins: (string | RegExp)[] = [
    'http://localhost:3000',
    // Matches production & preview URLs like:
    // https://something.ud-lms-starter.pages.dev
    /\.ud-lms-starter\.pages\.dev$/,
  ]

  const extraOrigins = parseCorsEnv()

  app.enableCors({
    origin: defaultOrigins.concat(extraOrigins),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })

  const port = Number(process.env.PORT ?? 4000)
  await app.listen(port, '0.0.0.0')
  console.log(`API listening on :${port} with prefix /api`)
}

bootstrap()
