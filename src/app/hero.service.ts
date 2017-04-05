/**
 * Created by CZ on 2017/4/5.
 */
// 创建一个基于承诺 (Promise)的数据服务。

/*服务文件命名约定：
 服务名称的小写形式（基本名），加上.service后缀。
 如果服务名称包含多个单词，我们就把基本名部分写成中线形式 (dash-case)。
 例如，SpecialSuperHeroService服务应该被定义在special-super-hero.service.ts文件中。
*/

import { Injectable } from '@angular/core';  // 服务必备
import { Hero } from './hero';
import { HEROES } from './mock-heroes';


// 1.可注入的服务
/*
 当 TypeScript 看到@Injectable()装饰器时，就会记下本服务的元数据。
 如果 Angular 需要往这个服务中注入其它依赖，就会使用这些元数据。
 无论是出于提高统一性还是减少变更的目的， 都应该从一开始就加上@Injectable()装饰器。
*/
@Injectable()  // 不要忘了写圆括号！如果忘了写，就会导致一个很难诊断的错误。
export class HeroService {
//  2.添加一个名叫getHeros的桩方法。 HeroService的getHeroes方法改写为返回承诺的形式(异步)：
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }
// 导入HEROES常量，并在getHeroes方法中返回它
//  慢一点（模仿用http加载数据）
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
  getHero(id: Number): Promise<Hero> {   // 添加一个getHero方法，用来通过id从getHeros过滤英雄列表：
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }
}
