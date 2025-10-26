import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true
  })

  await app.listen(3001, '0.0.0.0')
  console.log('API server running on http://localhost:3001')
}

bootstrap()

