import knex from 'knex';
import { DatabaseTableName } from './database.table-name.enum';

export interface IDatabaseTableBuilder {
	name: DatabaseTableName;
	build: (builder: knex.Knex.CreateTableBuilder) => void;
}
