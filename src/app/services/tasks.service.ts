import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../models/task.model'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private itemsSource = new BehaviorSubject<Task[]>([]);
  currentItems = this.itemsSource.asObservable();

  tasks: Task[] = [];

  constructor() { }

  addTask(text: string): void {

    const task: Task = {
      name: text,
      isCompleted: false
    }

    this.tasks.push(task)

    console.log('TasksService.addTask', task)

    this.itemsSource.next(this.tasks)
  }

  editTask(task: Task, index: number){
    this.tasks[index] = {
      ...task
    }
  }

  changeState(tasks: Task[]): void{
    this.tasks = tasks
  }
}
