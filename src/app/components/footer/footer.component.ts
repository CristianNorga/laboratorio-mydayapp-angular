import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  tasks: Task[] = [];
  pending: number = 0;
  
  constructor(private tasksService: TasksService){
  }

  ngOnInit(){
    this.tasksService.currentItems$.subscribe(newData => {
      this.pending = newData.filter(task => !task.isCompleted).length
    })
  }

  clearCompleted(){
    this.tasksService.clearCompleted();
  }
}
