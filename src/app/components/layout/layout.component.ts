import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  tasks: Task[] = [];


  constructor(private tasksService: TasksService) { }

  ngOnInit() {

    this.tasksService.currentItems$.subscribe(newData => this.tasks = newData)

    let laodStore = localStorage.getItem('mydayapp-angular');
    if (laodStore) {
      this.tasksService.loadData(laodStore);
    } else {
      localStorage.setItem('mydayapp-angular', '[]');
    }

  }

  captureText(event: any): void {
    let text: string = event.target.value;

    text = text.trim();
    if (!text) return;

    this.tasksService.addTask(text);
    event.target.value = '';
  }

}