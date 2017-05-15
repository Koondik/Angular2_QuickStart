import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
/*注册 HTTP 服务
 要能从本应用的任何地方访问这些服务，就要把HttpModule添加到AppModule的imports列表中。
 */
import { HttpModule } from '@angular/http';

// 引入路由模块
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
/*更新 AppModule
 在 Angular 模块中声明该应用所需的指令。
 只要把这些指令列在NgModule装饰器的declarations数组中就可以了。
*/

import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './hero-search.component';
// 使用 HeroService 服务
import { HeroService } from './hero.service';

import { HighlightDirective  } from './attribute-directives'; // 引用自定义指令


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),  // InMemoryWebApiModule将Http客户端默认的后端服务 — 这是一个辅助服务，负责与远程服务器对话 — 替换成了内存 Web API服务：
  ],
  /*
   添加HeroDetailComponent到NgModule装饰器中的declarations(声明)数组。
   这个数组包含了所有由我们创建的并属于应用模块的组件、管道和指令。
  */
  declarations: [
    AppComponent ,
    HeroesComponent ,
    HeroDetailComponent ,
    DashboardComponent,
    HeroSearchComponent,
    HighlightDirective
  ],
  /*
   注册一个HeroService提供商，来告诉注入器如何创建HeroService
   在@Component组件的元数据底部添加providers数组属性
   providers数组告诉 Angular，当它创建新的AppComponent组件时，也要创建一个HeroService的新实例。
   */
  providers: [HeroService], // 把HeroService定义为AppComponent的一个提供商,应用中的所有组件都可以使用它  这是在告诉 Angular：该组件的构造函数需要一个HeroService服务，这样组件就可以从服务中获得英雄数据。
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
