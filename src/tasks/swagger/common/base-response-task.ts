import { ApiProperty } from '@nestjs/swagger';
import { ITaskModel, TaskStatus } from 'src/tasks/task.model';

export class BaseResponseTask implements ITaskModel {
	@ApiProperty()
	id: number;

	@ApiProperty()
	title: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	status: TaskStatus;

	@ApiProperty()
	order_id: number;

	@ApiProperty()
	soft_delete: boolean;

	@ApiProperty()
	story_point: number;

	@ApiProperty()
	created_at: Date;
}
