import { Global, Module } from '@nestjs/common';
import { DatabaseSource } from './database.source';

@Global()
@Module({
	providers: [DatabaseSource],
	exports: [DatabaseSource],
})
export class DatabaseModule {}
