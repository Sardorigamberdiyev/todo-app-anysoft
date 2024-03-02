import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseMessage {
	@ApiProperty({ type: String })
	message: string;
}
