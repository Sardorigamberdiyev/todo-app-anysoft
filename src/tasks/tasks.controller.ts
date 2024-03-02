import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { isNumberString } from 'class-validator';
import { GetTaskListDTO } from './dto/get-task-list.dto';
import { ChangeStatusTaskDTO } from './dto/change-status-task.dto';
import { ResponsesGetGroupedTasks } from './swagger/responses/responses.get-grouped-tasks';
import { ResponsesGetTask } from './swagger/responses/responses.get-task';
import { BaseResponseMessage } from './swagger/common/base-response-message';
import { BaseResponseNotFound } from './swagger/common/base-response-not-found';
import { httpMessages } from 'src/common/http-messages';
import { ResponsesGetTasks } from './swagger/responses/responses.get-tasks';
import { GetGroupedTaskListDTO } from './dto/get-grouped-task-list.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Get('/')
	@ApiOperation({ description: 'Получить список задач' })
	@ApiOkResponse({ type: ResponsesGetTasks })
	public getTasks(@Query() dto: GetTaskListDTO) {
		return this.tasksService.getTasks(dto);
	}

	@Get('/group/list')
	@ApiOperation({ description: 'Получить сгрупированный список задач' })
	@ApiOkResponse({ type: ResponsesGetGroupedTasks })
	public getGroupedTasks(@Query() dto: GetGroupedTaskListDTO) {
		return this.tasksService.getGroupedTasks(dto);
	}

	@Get('/:taskId')
	@ApiOperation({ description: 'Получить задачу по идентификатору' })
	@ApiParam({ name: 'taskId' })
	@ApiOkResponse({ type: ResponsesGetTask })
	@ApiNotFoundResponse({ type: BaseResponseNotFound })
	public getTask(@Param('taskId') taskId: string) {
		if (!isNumberString(taskId)) {
			throw new NotFoundException(httpMessages.error.notFound);
		}
		return this.tasksService.getTaskById(+taskId);
	}

	@Post('/')
	@ApiOperation({ description: 'Создать задачу' })
	@ApiBody({ type: CreateTaskDTO })
	@ApiCreatedResponse({ type: BaseResponseMessage })
	public async createTask(@Body() dto: CreateTaskDTO) {
		await this.tasksService.createTask(dto);
		return { message: httpMessages.success.created };
	}

	@Put('/:taskId')
	@ApiOperation({ description: 'Изменить задачу по идентификатору' })
	@ApiParam({ name: 'taskId' })
	@ApiBody({ type: UpdateTaskDTO })
	@ApiOkResponse({ type: BaseResponseMessage })
	@ApiNotFoundResponse({ type: BaseResponseNotFound })
	public async updateTask(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDTO) {
		if (!isNumberString(taskId)) {
			throw new NotFoundException(httpMessages.error.notFound);
		}
		await this.tasksService.updateTaskData(+taskId, dto);
		return { message: httpMessages.success.updated };
	}

	@Patch('/:taskId/drag-drop')
	@ApiOperation({ description: 'Изменить статус задачи по идентификатору (перетаскивание)' })
	@ApiParam({ name: 'taskId' })
	@ApiBody({ type: ChangeStatusTaskDTO })
	@ApiOkResponse({ type: BaseResponseMessage })
	@ApiNotFoundResponse({ type: BaseResponseNotFound })
	public async dragAndDrop(@Param('taskId') taskId: string, @Body() dto: ChangeStatusTaskDTO) {
		if (!isNumberString(taskId)) {
			throw new NotFoundException(httpMessages.error.notFound);
		}
		await this.tasksService.updateTaskData(+taskId, dto);
		return { message: httpMessages.success.updated };
	}

	@Delete('/:taskId/soft')
	@ApiOperation({ description: 'Неполное удаление' })
	@ApiParam({ name: 'taskId' })
	@ApiOkResponse({ type: BaseResponseMessage })
	@ApiNotFoundResponse({ type: BaseResponseNotFound })
	public async softDeleteTask(@Param('taskId') taskId: string) {
		if (!isNumberString(taskId)) {
			throw new NotFoundException(httpMessages.error.notFound);
		}
		await this.tasksService.softDeleteTask(+taskId);
		return { message: httpMessages.success.softDeleted };
	}

	@Delete('/:taskId/hard')
	@ApiOperation({ description: 'Полное удаление из БД' })
	@ApiParam({ name: 'taskId' })
	@ApiOkResponse({ type: BaseResponseMessage })
	@ApiNotFoundResponse({ type: BaseResponseNotFound })
	public async hardDeleteTask(@Param('taskId') taskId: string) {
		if (!isNumberString(taskId)) {
			throw new NotFoundException(httpMessages.error.notFound);
		}
		await this.tasksService.hardDeleteTask(+taskId);
		return { message: httpMessages.success.hardDeleted };
	}
}
