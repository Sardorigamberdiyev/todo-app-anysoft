import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetGroupedTaskListDTO {
	@IsString()
	@IsOptional()
	@ApiProperty({ type: String, required: false })
	searchByText?: string;
}
