import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

/*更新 AppModule
 在 Angular 模块中声明该应用所需的指令。
 只要把这些指令列在NgModule装饰器的declarations数组中就可以了。
*/

import { HeroDetailComponent } from './hero-detail.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule
  ],
  /*
   添加HeroDetailComponent到NgModule装饰器中的declarations(声明)数组。
   这个数组包含了所有由我们创建的并属于应用模块的组件、管道和指令。
  */
  declarations: [ AppComponent , HeroDetailComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
