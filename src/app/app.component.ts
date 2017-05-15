/**
 * Created by CZ on 2017/4/5.
 */
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
            <h1 myHighlight>{{title}}</h1>    
            <!--<my-heroes></my-heroes>-->
            
            <!--路由-->
            <!--
            锚标签中的[routerLink]绑定。 
            我们把RouterLink指令（ROUTER_DIRECTIVES中的另一个指令）绑定到一个字符串。 
            它将告诉路由器，当用户点击这个链接时，应该导航到哪里。
            -->
            <nav>
              <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
              <!--
              routerLinkActive指令
              Angular路由器提供了routerLinkActive指令，我们可以用它来为匹配了活动路由的 HTML 导航元素自动添加一个 CSS 类。
              -->
              <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
            </nav>
            <!--router-outlet
            标签添加到模板的底部。 RouterOutlet是RouterModule提供的指令之一。 
            当我们在应用中导航时，路由器就把激活的组件显示在<router-outlet>里面。
            -->
            <router-outlet></router-outlet> 
            
            `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = `Tour of Heroes`;
}
