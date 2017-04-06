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
// 引入路由模块
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule
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
