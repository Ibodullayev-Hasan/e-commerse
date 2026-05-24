import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './common/interceptors';
import { HttpExceptionFilter } from './common/filters';
import { Logger, VersioningType } from '@nestjs/common';
import { setupGlobalPipes, winstonConfig } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonConfig()
  });

  const logger = new Logger(`e-commerce`)
  try {

    const configService = app.get(ConfigService)

    app.setGlobalPrefix(configService.getOrThrow("PREFIX"))
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: configService.getOrThrow("VERSION") });

    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter);

    setupGlobalPipes(app);

    const port = configService.getOrThrow('SERVER_PORT') || 5000;

    await app.listen(port);

    logger.log(`Server run on port ${port}`);
  } catch (error: any) {
    logger.error(error.message)
  }
}
bootstrap();
