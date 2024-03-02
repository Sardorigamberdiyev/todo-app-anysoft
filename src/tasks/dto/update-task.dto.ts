import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateTaskDTO {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(256)
	@ApiProperty({ type: String, required: false, maxLength: 256 })
	title?: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ type: String, required: false })
	description?: string;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@ApiProperty({ type: Number, required: false, minimum: 1 })
	story_point?: number;
}
