import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.currentItems.subscribe(newData => this.tasks = newData)
  }

  captureText(event: any): void{
    let text: string = event.target.value;
    
    text = text.trim();
    if (!text) return;

    this.tasksService.addTask(text)
  }

}
