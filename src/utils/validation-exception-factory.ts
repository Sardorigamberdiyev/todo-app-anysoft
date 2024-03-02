import { ValidationPipeOptions, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationExceptionFactory: ValidationPipeOptions['exceptionFactory'] = (errors) => {
	return new BadRequestException(validationException(errors));
};

function validationException(errors: ValidationError[]) {
	return errors.reduce((prev, curr) => {
		return {
			[curr.property]: curr.children?.length
				? validationException(curr.children)
				: curr.constraints,
			...prev,
		};
	}, {});
}
