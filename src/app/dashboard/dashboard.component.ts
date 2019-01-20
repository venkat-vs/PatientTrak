import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/services/base.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../Models/patient';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseService implements OnInit {
  private patients: Patient[] =[];

  constructor(private httpClient:HttpClient) {
    super(httpClient);
   }

  ngOnInit() {
    this.httpClient.get(environment.api_url).subscribe(res =>{
      this.patients = res as Patient[];
      console.log(this.patients);
    });     
  }

}
