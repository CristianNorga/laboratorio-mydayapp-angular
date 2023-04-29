import { Component, OnInit, OnDestroy, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { map } from 'rxjs/operators';

import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  enableEditTimeout: number | undefined = undefined;

  @ViewChildren('editInput') editInputs!: QueryList<ElementRef>;

  constructor(private tasksService: TasksService){}

  ngOnInit(){
    this.tasksService.currentItems$.subscribe(newData => this.tasks = newData)
  }

  ngOnDestroy() {
    clearTimeout(this.enableEditTimeout);
  }

  mark(index: number): void{
    this.tasks[index].isCompleted = !this.tasks[index].isCompleted

    this.tasksService.changeState(this.tasks);
  }

  enableEdit(index: number): void {
    this.tasks[index].isEdit = true;
    this.enableEditTimeout = window.setTimeout(()=>{
      this.editInputs.toArray()[index].nativeElement.focus();
    },0)
  }

  captureText(event: any, index: number):void{

    let text = this.editInputs.toArray()[index].nativeElement.value.trim();
    if (!text) return;

    this.tasks[index].name = text;
    this.tasks[index].isEdit = false;

    this.tasksService.editTask(this.tasks[index], index);
  }

  discardChanges(index: number):void{
    this.tasks[index].isEdit = false;
    this.editInputs.toArray()[index].nativeElement.value = this.tasks[index].name;
  }

  deleteTask(index: number){
    this.tasksService.deleteTask(index);
  }
}
