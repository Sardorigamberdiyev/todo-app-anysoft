import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTaskListDTO } from './dto/get-task-list.dto';
import { TaskStatus } from './task.model';
import { ChangeStatusTaskDTO } from './dto/change-status-task.dto';
import { httpMessages } from 'src/common/http-messages';
import { GetGroupedTaskListDTO } from './dto/get-grouped-task-list.dto';

@Injectable()
export class TasksService {
	constructor(private readonly tasksRepository: TasksRepository) {}

	public async getTasks(dto: GetTaskListDTO) {
		return this.tasksRepository.findAll(dto);
	}

	public async getTaskById(taskId: number) {
		const task = await this.tasksRepository.findOne({ id: taskId, soft_delete: false });
		if (!task) {
			throw new NotFoundException(httpMessages.error.notFound);
		}
		return task;
	}

	public async getGroupedTasks(dto: GetGroupedTaskListDTO) {
		const tasks = await this.tasksRepository.findAllWithoutLimit(dto);
		// Функция для сортироваки
		const getFilteredList = (byStatus: TaskStatus) =>
			tasks.filter((task) => task.status === byStatus);
		// Сортируем по каждому статусу
		return {
			[TaskStatus.New]: getFilteredList(TaskStatus.New),
			[TaskStatus.InProgress]: getFilteredList(TaskStatus.InProgress),
			[TaskStatus.Test]: getFilteredList(TaskStatus.Test),
			[TaskStatus.Done]: getFilteredList(TaskStatus.Done),
		};
	}

	public createTask(dto: CreateTaskDTO) {
		const taskEntity = new TaskEntity(dto);
		return this.tasksRepository.createOne(taskEntity);
	}

	public async updateTaskData(taskId: number, dto: UpdateTaskDTO | ChangeStatusTaskDTO) {
		const task = await this.tasksRepository.findOne({ id: taskId, soft_delete: false });
		if (!task) {
			throw new NotFoundException(httpMessages.error.notFound);
		}
		const taskEntity = new TaskEntity(task) as Required<TaskEntity>;
		taskEntity.updateData(dto);
		return this.tasksRepository.updateOne(taskEntity);
	}

	public async softDeleteTask(taskId: number) {
		const task = await this.tasksRepository.findOne({ id: taskId, soft_delete: false });
		if (!task) {
			throw new NotFoundException(httpMessages.error.notFoundOrDeleted);
		}
		const taskEntity = new TaskEntity(task) as Required<TaskEntity>;
		taskEntity.makeSoftDelete();
		return this.tasksRepository.updateOne(taskEntity);
	}

	public async hardDeleteTask(taskId: number) {
		const task = await this.tasksRepository.findOne({ id: taskId });
		if (!task) {
			throw new NotFoundException(httpMessages.error.notFoundOrDeleted);
		}
		return this.tasksRepository.deleteById(taskId);
	}
}
