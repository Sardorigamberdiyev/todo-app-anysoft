import { ApiProperty } from '@nestjs/swagger';
import { httpMessages } from 'src/common/http-messages';

export class BaseResponseNotFound {
	@ApiProperty({ type: String, default: httpMessages.error.notFound })
	message: string;

	@ApiProperty({ type: String, default: 'Not Found' })
	error: string;

	@ApiProperty({ type: Number, default: 404 })
	statusCode: number;
}
