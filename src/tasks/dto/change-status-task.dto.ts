import { IsEnum, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task.model';

export class ChangeStatusTaskDTO {
	@IsEnum(TaskStatus)
	@ApiProperty({
		enum: [TaskStatus.New, TaskStatus.InProgress, TaskStatus.Test, TaskStatus.Done],
		required: true,
	})
	status: TaskStatus;

	@IsNumber()
	@Min(1)
	@ApiProperty({ type: Number, required: true })
	order_id: number;
}
