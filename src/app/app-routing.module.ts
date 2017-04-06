/**
 * Created by CZ on 2017/4/6.
 */
import { NgModule } from '@angular/core';
/*Angular 路由器:路由告诉路由器，当用户点击链接或者把 URL 粘贴到浏览器地址栏时，应该显示哪个视图。
 是一个可选的外部 Angular NgModule，名叫RouterModule。
 路由器包含了多种服务(RouterModule)、多种指令(RouterOutlet、RouterLink、RouterLinkActive)、和一套配置(Routes)。
 */
import { RouterModule , Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
/*更新 AppModule
 在 Angular 模块中声明该应用所需的指令。
 只要把这些指令列在NgModule装饰器的declarations数组中就可以了。
 */
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  /*路由定义包括以下部分：
   path: 路由器会用它来匹配浏览器地址栏中的地址，如heroes。
   component: 导航到此路由时，路由器需要创建的组件（HeroesComponent）。
   */
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // 重定向路由 设置默认打开的路径,匹配方式（prefix、full）
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, // 配置带参数的路由,路径中的冒号 (:) 表示:id是一个占位符，当导航到这个HeroDetailComponent组件时，它将被填入一个特定英雄的id。
  { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // forRoot方法提供了路由需要的路由服务提供商和指令，并基于当前浏览器 URL 初始化导航。
  exports: [RouterModule] // 添加RouterModule到exports，这样关联模块的组件可以访问路由的声明，比如RouterLink和RouterOutlet。
  // 如果你有守卫服务，添加模块providers；本例子无守卫服务。
})
export  class  AppRoutingModule {
}
