import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './heroes.component';
/*更新 AppModule
 在 Angular 模块中声明该应用所需的指令。
 只要把这些指令列在NgModule装饰器的declarations数组中就可以了。
*/
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';
// 使用 HeroService 服务
import { HeroService } from './hero.service';

/*Angular 路由器:路由告诉路由器，当用户点击链接或者把 URL 粘贴到浏览器地址栏时，应该显示哪个视图。
是一个可选的外部 Angular NgModule，名叫RouterModule。
路由器包含了多种服务(RouterModule)、多种指令(RouterOutlet、RouterLink、RouterLinkActive)、和一套配置(Routes)。
*/
import { RouterModule } from '@angular/router';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([  // forRoot方法提供了路由需要的路由服务提供商和指令，并基于当前浏览器 URL 初始化导航。
      /*路由定义包括以下部分：
       path: 路由器会用它来匹配浏览器地址栏中的地址，如heroes。
       component: 导航到此路由时，路由器需要创建的组件（HeroesComponent）。
       */
      {
        path: 'heroes',
        component: HeroesComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'detail/:id',  // 配置带参数的路由,路径中的冒号 (:) 表示:id是一个占位符，当导航到这个HeroDetailComponent组件时，它将被填入一个特定英雄的id。
        component: HeroDetailComponent
      },
      { // 重定向路由 设置默认打开的路径
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full' // 匹配方式（prefix、full）
      }
    ])
  ],
  /*
   添加HeroDetailComponent到NgModule装饰器中的declarations(声明)数组。
   这个数组包含了所有由我们创建的并属于应用模块的组件、管道和指令。
  */
  declarations: [
    AppComponent ,
    HeroesComponent ,
    HeroDetailComponent ,
    DashboardComponent
  ],
  /*
   注册一个HeroService提供商，来告诉注入器如何创建HeroService
   在@Component组件的元数据底部添加providers数组属性
   providers数组告诉 Angular，当它创建新的AppComponent组件时，也要创建一个HeroService的新实例。
   */
  providers: [HeroService], // 把HeroService定义为AppComponent的一个提供商,应用中的所有组件都可以使用它
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
