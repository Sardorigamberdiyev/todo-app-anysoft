import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';
import { IDatabaseTableBuilder } from './database.table-builder.interface';
import { TasksTable } from './tables/tasks.table';
import { DatabaseTableName } from './database.table-name.enum';

@Injectable()
export class DatabaseSource implements OnModuleInit {
	private knex: Knex;

	constructor(configService: ConfigService) {
		this.knex = knex({
			client: 'pg',
			connection: {
				database: configService.get('DB_NAME'),
				port: configService.get('DB_PORT'),
				host: configService.get('DB_HOST'),
				user: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
			},
		});
	}

	public getTableModel<T extends object>(tableName: DatabaseTableName) {
		const test = this.knex<T>(tableName);
		return this.knex<T>(tableName);
	}

	public async onModuleInit() {
		const tables: IDatabaseTableBuilder[] = [new TasksTable(this.knex.fn)];
		for (const table of tables) {
			const tableExist = await this.knex.schema.hasTable(table.name);
			if (!tableExist) {
				await this.knex.schema.createTable(table.name, (builder) => table.build(builder));
			}
		}
	}
}
