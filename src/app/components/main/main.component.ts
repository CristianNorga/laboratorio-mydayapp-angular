import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService){}

  ngOnInit(){
    this.tasksService.currentItems.subscribe(newData => this.tasks = newData)
  }

  mark(index: number): void{
    this.tasks[index].isCompleted = !this.tasks[index].isCompleted

    this.tasksService.changeState(this.tasks);
  }

  enableEdit(index: number): void{
    this.tasks[index].isEdit = true
  }
}
