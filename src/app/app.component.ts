import { Component } from '@angular/core';
import { Hero } from './hero';

// 使用 HeroService 服务
import { HeroService } from './hero.service';


/* ngOnInit 生命周期钩子
 Angular提供了一些接口，用来介入组件生命周期的几个关键时间点：刚创建时、每次变化时，以及最终被销毁时。
*/
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
    /*
   注意@Component装饰器中指定的 CSS 选择器selector，它指定了一个叫my-app的元素。 该元素是index.html的body里的占位符
   当我们通过main.ts中的AppComponent类启动时，Angular 在index.html中查找一个<my-app>元素， 然后实例化一个AppComponent，并将其渲染到<my-app>标签中。
   */
  template: `
            <h1>{{title}}</h1>
            <!--
             2、我们使用 ES2015 的模板字符串写了一个多行模板，使我们的模板更具可读性。
            -->
            <h2>My Heroes</h2>
            <ul class="heroes">
              <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <!--ngFor:
                 ngFor的*前缀表示<li>及其子元素组成了一个主控模板。
                 ngFor指令在AppComponent.heroes属性返回的heroes数组上迭代，并输出此模板的实例。
                 引号中赋值给ngFor的那段文本表示“从heroes数组中取出每个英雄，存入一个局部的hero变量，并让它在相应的模板实例中可用”。
                 hero前的let关键字表示hero是一个模板输入变量。 在模板中，我们可以引用这个变量来访问一位英雄的属性。
                -->
                
                <!--事件绑定：(click)
                圆括号标识<li>元素上的click事件是绑定的目标。 
                等号右边的表达式调用AppComponent的onSelect()方法，并把模板输入变量hero作为参数传进去。
                它是我们前面在ngFor中定义的那个hero变量。-->
                
                <!--属性绑定的语法：[class.selected]
                在class上为selected类添加一个属性绑定。我们把绑定表达式设置为selectedHero和hero的比较结果。
                模板中的class.selected包裹在方括号中。 这就是属性绑定的语法，实现从数据源(hero === selectedHero表达式)到class属性的单向数据流动。-->
                <span class="badge">{{hero.id}}</span> {{hero.name}}
                <!--
                 1、我们的《英雄指南》使用双大括号插值表达式(单向数据绑定的一种形式)来显示应用的标题和Hero对象的属性。
                -->
              </li>
            </ul>
    
            <!--刚刚从模板中移除英雄详情的地方， 放上用来表示HeroDetailComponent组件的元素标签。-->
            <my-hero-detail [hero]="selectedHero"></my-hero-detail>
            <!--把该组件的selectedHero属性绑定到HeroDetailComponent组件的hero属性上,hero是属性绑定的目标 — 它位于等号 (=) 左边方括号中。-->
            `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  /*我们可以像上面那样把它们内联在组件中，或者把样式移到单独的文件中， 这样能让编写组件变得更容易
   当我们为一个组件指定样式时，它们的作用域将仅限于该组件。 上面的例子中，这些样式只会作用于AppComponent组件，而不会“泄露”到外部 HTML 中。
  */


  /*
   注册一个HeroService提供商，来告诉注入器如何创建HeroService
   在@Component组件的元数据底部添加providers数组属性
   providers数组告诉 Angular，当它创建新的AppComponent组件时，也要创建一个HeroService的新实例。
  */
  providers: [HeroService] // 把HeroService定义为AppComponent的一个提供商
})

export class AppComponent implements OnInit {
  title = `Tour of Heroes`;
  heroes: Hero[];
  selectedHero: Hero;
  /*注入 HeroService
   1)添加一个构造函数，并定义一个私有属性。
   2)添加组件的providers元数据。
   构造函数自己什么也不用做，它在参数中定义了一个私有的heroService属性，并把它标记为注入HeroService的靶点。
   */
  constructor(private heroService: HeroService) { };
  // 注意：构造函数是为了简单的初始化工作而设计的，例如把构造函数的参数赋值给属性。 它的负担不应该过于沉重。

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);  // 服务承诺模式的写法
  };
  ngOnInit(): void { // 生命周期钩子
    this.getHeroes(); // 通过调用getHeroes来完成初始化
  }
  // 添加一个onSelect方法，用于将用户点击的英雄赋给selectedHero属性。
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };
}



