import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import _, { List } from 'lodash';

@Component({
  selector: 'app-tip-view',
  templateUrl: './tip-view.component.html',
  styleUrls: ['./tip-view.component.scss']
})
export class TipViewComponent implements OnInit {
  public comboData: any;
  public testList: Array<string> = ['a','b','c','d'];
  public skillList: any;
  public constructor(private http: HttpClient) {}
  public ngOnInit(): void {
    const url: string = '/assets/combos.json';
    this.http.get(url).subscribe((response: any) => {
      this.comboData = response;

      this.skillList = _(response)
                        .map("components[0].name")
                        .concat(_.map(response, "components[1].name"))
                        .uniq()
                        .sortBy()
                        .value()
    })
  }

  selectedSkill?: any;
  availableCombos?: any;
  primaryCombos?: any;
  secondaryCombos?: any;

  onSelect(skill: string): void {
    this.selectedSkill = skill;
    this.availableCombos = _.filter(this.comboData, (o) => 
      _.find(o.components, (c) => {
        return c.name.toLowerCase() === skill.toLowerCase();
      }));

    this.primaryCombos = _.filter(this.comboData, (o) => 
      _.find(o.components, (c) => {
        return c.name.toLowerCase() === skill.toLowerCase() && c.primary;
      }));

    this.secondaryCombos = this.availableCombos.filter((i: any) => !this.primaryCombos.find((f: any) => f.name === i.name));
  }

  onDeselect(): void {
    this.selectedSkill = null;
    this.availableCombos = null;
  }
}
