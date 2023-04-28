import { Component, Input } from '@angular/core';

import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  @Input() test: Task[] = [];
  // @Input('test')
  // set changeImg(newImg: string) {
  //   this.img = newImg;
  // }
}
