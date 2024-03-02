import { ITaskModel, TaskStatus } from './task.model';

export class TaskEntity implements ITaskModel {
	id?: number;
	title: string;
	description: string;
	order_id: number;
	soft_delete?: boolean;
	status: TaskStatus;
	story_point: number;
	created_at?: Date;

	constructor(task: ITaskModel) {
		this.id = task.id;
		this.title = task.title;
		this.description = task.description;
		this.order_id = task.order_id;
		this.soft_delete = task.soft_delete;
		this.status = task.status;
		this.story_point = task.story_point;
		this.created_at = task.created_at;
	}

	public makeSoftDelete() {
		this.soft_delete = true;
	}

	public updateData(setUpdate: Partial<Omit<ITaskModel, 'id' | 'created_at' | 'sfot_delete'>>) {
		this.title = setUpdate.title ?? this.title;
		this.description = setUpdate.description ?? this.description;
		this.story_point = setUpdate.story_point ?? this.story_point;
		this.status = setUpdate.status ?? this.status;
		this.order_id = setUpdate.order_id ?? this.order_id;
	}
}
