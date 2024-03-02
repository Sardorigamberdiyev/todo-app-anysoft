export enum TaskStatus {
	New = 'new',
	InProgress = 'inProgress',
	Test = 'test',
	Done = 'done',
}

export interface ITaskModel {
	id?: number;
	title: string;
	description: string;
	story_point: number;
	order_id?: number;
	status?: TaskStatus;
	created_at?: Date;
	soft_delete?: boolean;
}
