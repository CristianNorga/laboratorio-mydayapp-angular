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

  private notify(){
    this.itemsSource.next(this.tasks)
    this.saveData()
  }

  addTask(text: string): void {

    const task: Task = {
      name: text,
      isCompleted: false
    }
    this.tasks.push(task)
    this.notify();
  }

  editTask(task: Task, index: number){
    this.tasks[index] = {
      ...task
    };

    this.itemsSource.next(this.tasks);
    this.saveData()
  }

  changeState(tasks: Task[]): void{
    this.tasks = tasks;

    this.notify();
  }

  deleteTask(index: number): void{
    this.tasks.splice(index, 1);

    this.notify();
  }

  clearCompleted():void{
    this.tasks = this.tasks.filter(task => !task.isCompleted);

    this.notify();
  }

  saveData():void {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }

  loadData(data: string):void{
    console.log(data)
    this.tasks = JSON.parse(data);
    this.itemsSource.next(this.tasks)
  }
}
