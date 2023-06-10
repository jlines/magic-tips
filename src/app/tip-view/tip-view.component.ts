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
  public skillList: any;
  public skillData: any;
  public constructor(private http: HttpClient) {}
  public ngOnInit(): void {
    const combo_url: string = '/assets/combos.json';
    this.http.get(combo_url).subscribe((response: any) => {
      this.comboData = response;

      this.skillList = _(response)
                        .map("components[0].name")
                        .concat(_.map(response, "components[1].name"))
                        .uniq()
                        .sortBy()
                        .value()
    })

    const skill_url: string = '/assets/skills.json';
    this.http.get(skill_url).subscribe((response: any) => {
      this.skillData = response;
    })
  }

  selectedSkill?: any;
  availableCombos?: any;
  primaryCombos?: any;
  secondaryCombos?: any;

  onSelect(skill: any): void {
    this.selectedSkill = skill;
    console.log(skill);
    this.availableCombos = _.filter(this.comboData, (o) => 
      _.find(o.components, (c) => {
        return c.name.toLowerCase() === skill.name.toLowerCase();
      }));

    this.primaryCombos = _.filter(this.comboData, (o) => 
      _.find(o.components, (c) => {
        return c.name.toLowerCase() === skill.name.toLowerCase() && c.primary;
      }));

    this.secondaryCombos = this.availableCombos.filter((i: any) => !this.primaryCombos.find((f: any) => f.name === i.name));
  }

  onDeselect(): void {
    this.selectedSkill = null;
    this.availableCombos = null;
  }
}
