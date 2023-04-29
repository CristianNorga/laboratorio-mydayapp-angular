import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { Task } from '../models/task.model'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private itemsSource = new BehaviorSubject<Task[]>([]);
  currentItems$ = this.itemsSource.asObservable().pipe(
    map((items)=> this.filterByPath(items))
    )

  tasks: Task[] = [];
  path: string = '';

  // .pipe(
  //   map((task) => {
  //     let { path } = JSON.parse(this.route.toString())
  //     switch (path) {
  //       case 'pending':
  //         return task.isCompleted;
  //       case 'completed':
  //         return false;
  //       case '':
  //       case 'all':
  //       default:
  //         return true;
  //     }
  //   })
  // ).

  constructor() { }

  private notify(){
    this.itemsSource.next(this.tasks)
    this.saveData()
  }

  filterByPath(tasks: Task[]){
    tasks = tasks.filter((task)=>{
      switch (this.path) {
        case 'pending':
          return !task.isCompleted;
        case 'completed':
          return task.isCompleted;
        case '':
        case 'all':
        default:
          return true;
      }
    })
    return tasks
  }
  changePath(newPath: string | undefined){
    this.path = newPath ? newPath : '';
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
