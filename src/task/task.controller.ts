import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { TaskStatusService } from './task-status.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService, 
              private readonly taskStatusService: TaskStatusService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    Logger.log("Processing task creation") 
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    Logger.log("Process task find all ")
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  findAllStatus() {
    Logger.log("Process task find all possible status ")
    return this.taskStatusService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    Logger.log(`Process task find one: ${id}`)
    return this.taskService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    Logger.log(`Process task update: ${id}`)
    return this.taskService.update(+id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    Logger.log(`Process task remove: ${id}`)
    return this.taskService.remove(+id);
  }
}
