import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from 'src/tasks/task.model';
import { BaseResponseTask } from '../common/base-response-task';

export class ResponsesGetGroupedTasks {
	@ApiProperty({ type: BaseResponseTask, isArray: true })
	[TaskStatus.New]: BaseResponseTask[];

	@ApiProperty({ type: BaseResponseTask, isArray: true })
	[TaskStatus.InProgress]: BaseResponseTask[];

	@ApiProperty({ type: BaseResponseTask, isArray: true })
	[TaskStatus.Test]: BaseResponseTask[];

	@ApiProperty({ type: BaseResponseTask, isArray: true })
	[TaskStatus.Done]: BaseResponseTask[];
}
