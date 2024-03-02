import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from './utils/validation-exception-factory';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	const config = new DocumentBuilder()
		.setTitle('Todo app')
		.setDescription('Todo app task for ANYSOFT')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
	app.useGlobalPipes(new ValidationPipe({ exceptionFactory: validationExceptionFactory }));
	await app.listen(3000);
}
bootstrap();
