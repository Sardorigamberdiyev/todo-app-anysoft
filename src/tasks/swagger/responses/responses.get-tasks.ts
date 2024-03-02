import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseTask } from '../common/base-response-task';

export class ResponsesGetTasks {
	@ApiProperty({ type: BaseResponseTask, isArray: true })
	tasks: BaseResponseTask[];

	@ApiProperty({ type: String })
	count: string;
}
