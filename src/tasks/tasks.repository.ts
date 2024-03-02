import { DatabaseSource } from 'src/database/database.source';
import { DatabaseTableName } from 'src/database/database.table-name.enum';
import { ITaskModel } from './task.model';
import { Injectable } from '@nestjs/common';
import { GetTaskListDTO } from './dto/get-task-list.dto';
import { GetGroupedTaskListDTO } from './dto/get-grouped-task-list.dto';

@Injectable()
export class TasksRepository {
	constructor(private readonly databaseSource: DatabaseSource) {}

	private getQueryBuilder() {
		return this.databaseSource.getTableModel<ITaskModel>(DatabaseTableName.Task);
	}

	public async createOne(task: ITaskModel) {
		const resultRows = await this.getQueryBuilder().insert(task, '*');
		return resultRows[0] || null;
	}

	public async updateOne(task: Required<ITaskModel>) {
		const { id, ...partialEntity } = task;
		const resultRows = await this.getQueryBuilder().where({ id }).update(partialEntity, '*');
		return resultRows[0] || null;
	}

	public async deleteById(id: number) {
		const resultRows = await this.getQueryBuilder().where({ id }).del('*');
		return resultRows[0] || null;
	}

	public async findOne(by: Partial<ITaskModel>) {
		return this.getQueryBuilder().where(by).select('*').first();
	}

	public async findAll({ searchByText, page, limit }: GetTaskListDTO) {
		const offset = (+page || 1) * +limit - +limit;

		const queryBuilderList = this.getQueryBuilder()
			.where({ soft_delete: false })
			.orderBy('created_at', 'desc')
			.offset(offset)
			.limit(+limit);
		const queryBuilderCount = this.getQueryBuilder()
			.where({ soft_delete: false })
			.count()
			.first();

		if (searchByText) {
			queryBuilderList
				.whereILike('title', `%${searchByText}%`)
				.orWhereILike('description', `%${searchByText}%`);

			queryBuilderCount
				.whereILike('title', `%${searchByText}%`)
				.orWhereILike('description', `%${searchByText}%`);
		}

		return {
			tasks: await queryBuilderList,
			count: (await queryBuilderCount).count,
		};
	}

	public async findAllWithoutLimit({ searchByText }: GetGroupedTaskListDTO) {
		const queryBuilder = this.getQueryBuilder()
			.where({ soft_delete: false })
			.orderBy('order_id', 'asc');
		if (searchByText) {
			queryBuilder
				.whereILike('title', `%${searchByText}%`)
				.orWhereILike('description', `%${searchByText}%`);
		}
		return queryBuilder;
	}
}
