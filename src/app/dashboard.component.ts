/**
 * Created by CZ on 2017/4/5.
 */
/*
 实现OnInit接口，因为我们将在ngOnInit方法中初始化英雄数组 —— 就像上次一样。
 我们需要导入Hero类和HeroService类来引用它们的数据类型。
 */
import { Component , OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  // template: `<h3>My Dashboard</h3>`
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) {};
  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
