import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateTaskDTO {
	@IsString()
	@IsNotEmpty()
	@MaxLength(256)
	@ApiProperty({ type: String, required: true, maxLength: 1 })
	title: string;

	@IsString()
	@ApiProperty({ type: String, required: true })
	description: string;

	@IsNumber()
	@Min(1)
	@ApiProperty({ type: Number, required: true, minimum: 1 })
	story_point: number;
}
