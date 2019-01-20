import { Component, OnInit } from '@angular/core';
import { Patient } from '../../Models/patient';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends BaseService implements OnInit {
  private patients: Patient[] = [];
  model: any = [];

  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.model.BVCount = 0;
    this.model.PACount = 0;
    this.model.PRCount = 0;
    this.model.PAPCount = 0;
    this.model.CoPayCount = 0;
  }

  ngOnInit() {
    this.httpClient.get(environment.api_url).subscribe(res => {
      this.patients = res as Patient[];
      this.model.BVCount = this.patients.filter(x => x.service === 'BV').length;
      this.model.PACount = this.patients.filter(x => x.service === 'PA').length;
      this.model.PRCount = this.patients.filter(x => x.service === 'PR').length;
      this.model.PAPCount = this.patients.filter(
        x => x.service === 'PAP'
      ).length;
      this.model.CoPayCount = this.patients.filter(
        x => x.service === 'CoPay'
      ).length;
    });
  }
}
