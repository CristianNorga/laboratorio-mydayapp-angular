import { Component } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  tasks: Task[] = [];

  constructor(
  ) { }

  // ngOnInit(): void {
  // }

}
