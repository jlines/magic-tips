import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-tip-view',
  templateUrl: './tip-view.component.html',
  styleUrls: ['./tip-view.component.scss']
})
export class TipViewComponent implements OnInit {
  public comboData: any;
  public skillList: any;
  public constructor(private http: HttpClient) {}
  public ngOnInit(): void {
    const url: string = '/assets/combos.json';
    this.http.get(url).subscribe((response: any) => {
      this.comboData = response;
      this.skillList = _.map(response, "components[0].name")
      this.skillList = _.uniq(this.skillList.concat(_.map(response, "components[1].name")))
      console.log(this.skillList);
    })
  }
}
