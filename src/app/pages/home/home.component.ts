import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private tasksService: TasksService){}
  
  ngOnInit(){
    let path = this.route.snapshot.routeConfig?.path;
    this.tasksService.changePath(path);
  }
  
}
