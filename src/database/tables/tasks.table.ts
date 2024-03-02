import { IDatabaseTableBuilder } from '../database.table-builder.interface';
import { knex } from 'knex';
import { DatabaseTableName } from '../database.table-name.enum';
import { TaskStatus } from 'src/tasks/task.model';

export class TasksTable implements IDatabaseTableBuilder {
	public name: DatabaseTableName = DatabaseTableName.Task;

	constructor(private readonly fn: knex.Knex.FunctionHelper) {}

	public build(builder: knex.Knex.CreateTableBuilder) {
		builder.increments('id', { primaryKey: true });
		builder.string('title', 256);
		builder.text('description');
		builder.smallint('order_id').defaultTo(1);
		builder.string('status', 12).defaultTo(TaskStatus.New);
		builder.smallint('story_point');
		builder.boolean('soft_delete').defaultTo(false);
		builder.timestamp('created_at', { useTz: true }).defaultTo(this.fn.now());

		builder.check('?? > ??', ['order_id', 0]);
	}
}
