/**
 * Created by CZ on 2017/4/5.
 */
/*组件命名原则：
所有组件名都以Component结尾。
所有组件的文件名都以.component结尾。使用小写中线命名法 （也叫烤串命名法）拼写文件名
*/

import { Component , Input } from  '@angular/core';
import { Hero } from './hero';

/*使用@Component装饰器创建元数据。在元数据中，我们指定选择器的名字，用以标识此组件的元素。
 然后，我们导出这个类，以便其它组件可以使用它。*/
@Component({
  selector: 'my-hero-detail',
  template: `<div *ngIf="hero">
              <h2>{{hero.name}} details</h2>
              <div>
                <label>id: </label>{{hero.id}}
              </div>
              <div>
                <label>name: </label>
                <input [(ngModel)]="hero.name" placeholder="name">
                <!--[(ngModel)]
                 3、为了同时显示和修改英雄的名字，我们还使用了内置的ngModel指令，往<input>元素上添加了双向数据绑定。 
                 ngModel指令将这些修改传播到每一个对hero.name的其它绑定。在使用ngModel做双向数据绑定之前，得先导入FormsModule， 把它加入 Angular 模块的imports列表
                 3.1、[(ngModel)]语法只能设置一个数据绑定属性。 如果需要做更多或不同的事情，就得自己用它的展开形式。
                 3.2、比如强制让输入值变成大写形式： <input [ngModel]="currentHero.firstName"  (ngModelChange)="setUpperCaseFirstName($event)">
                -->
              </div>
            </div>`
})
export class HeroDetailComponent {
  /*
   让一个组件接收输入
   把hero声明成输入属性。
   这里我们采用首选的方式：使用我们前面导入的@Input装饰器向hero属性添加注解。
  */
  @Input()
  hero: Hero;
}
