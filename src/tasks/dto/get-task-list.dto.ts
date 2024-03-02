import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetTaskListDTO {
	@IsNumberString()
	@ApiProperty({ type: String, default: 1, required: true })
	page: string;

	@IsNumberString()
	@ApiProperty({ type: String, default: 10, required: true })
	limit: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ type: String, required: false })
	searchByText?: string;
}
