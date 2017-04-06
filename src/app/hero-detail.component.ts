/**
 * Created by CZ on 2017/4/5.
 */
/*组件命名原则：
所有组件名都以Component结尾。
所有组件的文件名都以.component结尾。使用小写中线命名法 （也叫烤串命名法）拼写文件名
*/

import { Component , Input , OnInit} from  '@angular/core';
import { Hero } from './hero';
// 通过路由获取id值
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';

import 'rxjs/add/operator/switchMap';  // 导入switchMap运算符，之后会与路由参数Observable一起使用。

/*使用@Component装饰器创建元数据。在元数据中，我们指定选择器的名字，用以标识此组件的元素。
 然后，我们导出这个类，以便其它组件可以使用它。*/
@Component({
  // moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  /*
   让一个组件接收输入
   把hero声明成输入属性。
   这里我们采用首选的方式：使用我们前面导入的@Input装饰器向hero属性添加注解。
  */
  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {};
  /*
   注意switchMap运算符如何将可观察的路由参数中的 id 映射到一个新的Observable， 即HeroService.getHero方法的结果。
   如果用户在 getHero 请求执行的过程中再次导航这个组件，switchMap 再次调用HeroService.getHero之前， 会取消之前的请求。
   英雄的id是数字，而路由参数的值总是字符串。 所以我们需要通过 JavaScript 的 (+) 操作符把路由参数的值转成数字。
  */
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params ) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {  // goBack方法，它使用之前注入的Location服务， 利用浏览器的历史堆栈，导航到上一步。
    this.location.back();
  }
}
