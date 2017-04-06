import { Component } from '@angular/core';
import { Hero } from './hero';
import { Router } from '@angular/router';
// 使用 HeroService 服务
import { HeroService } from './hero.service';

/* ngOnInit 生命周期钩子
 Angular提供了一些接口，用来介入组件生命周期的几个关键时间点：刚创建时、每次变化时，以及最终被销毁时。
*/
import { OnInit } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'my-heroes',
    /*
   注意@Component装饰器中指定的 CSS 选择器selector，它指定了一个叫my-app的元素。 该元素是index.html的body里的占位符
   当我们通过main.ts中的AppComponent类启动时，Angular 在index.html中查找一个<my-app>元素， 然后实例化一个AppComponent，并将其渲染到<my-app>标签中。
   */
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  /*我们可以像上面那样把它们内联在组件中，或者把样式移到单独的文件中， 这样能让编写组件变得更容易
   当我们为一个组件指定样式时，它们的作用域将仅限于该组件。 上面的例子中，这些样式只会作用于AppComponent组件，而不会“泄露”到外部 HTML 中。
  */
})


export class HeroesComponent implements OnInit { // 在 Angular 的ngOnInit生命周期钩子里面调用服务来获得英雄数据。
  heroes: Hero[];
  selectedHero: Hero;
  /*注入 HeroService
   1)添加一个构造函数，并定义一个私有属性。
   2)添加组件的providers元数据。
   构造函数自己什么也不用做，它在参数中定义了一个私有的heroService属性，并把它标记为注入HeroService的靶点。
   */
  constructor(
    private router: Router,
    private heroService: HeroService) { };
  // 注意：构造函数是为了简单的初始化工作而设计的，例如把构造函数的参数赋值给属性。 它的负担不应该过于沉重。

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);  // 服务承诺模式的写法
  };
  ngOnInit(): void { // 生命周期钩子
    this.getHeroes(); // 通过调用getHeroes来完成初始化
  }
  // 添加一个onSelect方法，用于将用户点击的英雄赋给selectedHero属性。
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    // 将一个包含两个元素的链接参数数组 — 路径和路由参数 — 传递到router.navigate， 与之前在DashboardComponent中使用[routerLink]绑定一样。
    this.router.navigate(['/detail' , this.selectedHero.id]);
  }
/*
 更新 HeroesComponent 类
 点击按钮时，HeroesComponent导航到HeroDetailComponent。 该按钮的点击事件被绑定到gotoDetail方法，它使用命令式的导航，告诉路由器去哪儿。

 该方法需要组件类做一些变化：

 1.从 Angular 路由器库导入router
 2.在构造函数中注入router（与HeroService一起）
 3.实现gotoDetail，调用router.navigate方法
*/
  add(name: string): void {   // 添加方法
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void { // 删除方法
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero); // 过滤掉删除的英雄对象，返回不为删除的英雄列表
        if (this.selectedHero === hero) { this.selectedHero = null; }
      //  从数组中移除了被删除的英雄，如果删除的是正选中的英雄，还会清空选择。
      });
  }
}



