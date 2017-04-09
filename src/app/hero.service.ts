/**
 * Created by CZ on 2017/4/5.
 */
// 创建一个基于承诺 (Promise)的数据服务。

/*服务文件命名约定：
 服务名称的小写形式（基本名），加上.service后缀。
 如果服务名称包含多个单词，我们就把基本名部分写成中线形式 (dash-case)。
 例如，SpecialSuperHeroService服务应该被定义在special-super-hero.service.ts文件中。
*/

import { Injectable } from '@angular/core';  // 服务必备
import { Headers, Http } from '@angular/http';


/*
 不幸的是，Angular 的Observable并没有一个toPromise操作符... 没有打包在一起发布。 Angular的Observable只是一个骨架实现。
 有很多像toPromise这样的操作符，用于扩展Observable，为其添加有用的能力。 如果我们希望得到那些能力，就得自己添加那些操作符。
*/
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';


// 1.可注入的服务
/*
 当 TypeScript 看到@Injectable()装饰器时，就会记下本服务的元数据。
 如果 Angular 需要往这个服务中注入其它依赖，就会使用这些元数据。
 无论是出于提高统一性还是减少变更的目的， 都应该从一开始就加上@Injectable()装饰器。
*/
@Injectable()  // 不要忘了写圆括号！如果忘了写，就会导致一个很难诊断的错误。
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http ) { }
//  2.添加一个名叫getHeros的桩方法。 HeroService的getHeroes方法改写为返回承诺的形式(异步)：
  getHeroes(): Promise<Hero[]> {
    // return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl)   // Http服务中的每个方法都返回一个 HTTP Response对象的Observable实例。
      .toPromise()    // Angular 的http.get返回一个 RxJS 的Observable对象。 Observable（可观察对象）是一个管理异步数据流的强力方式。利用toPromise操作符把Observable直接转换成Promise对象
      .then( response => response.json().data as Hero[])
      // json方法返回的对象只有一个data属性。 这个data属性保存了英雄数组，这个数组才是调用者真正想要的。 所以我们取得这个数组，并且把它作为承诺的值进行解析。
      .catch(this.handleError);  // catch了服务器的失败信息，并把它们传给了错误处理器
  }
  private handleError(error: any): Promise<any> {  // 通过一个被拒绝 (rejected) 的承诺来把该错误用一个用户友好的格式返回给调用者， 以便调用者能把一个合适的错误信息显示给用户。
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  update(hero: Hero): Promise<Hero> {  // 修改
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  /*
   通过一个编码在 URL 中的英雄 id 来告诉服务器应该更新哪个英雄。
   put 的 body 是该英雄的 JSON 字符串，它是通过调用JSON.stringify得到的。
   并且在请求头中标记出的 body 的内容类型（application/json）。
  */
  }
// 导入HEROES常量，并在getHeroes方法中返回它
//  慢一点（模仿用http加载数据）
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
  getHero(id: Number): Promise<Hero> {// 添加一个getHero方法，用来通过id从getHeros过滤英雄列表：
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }
  create(name: string): Promise<Hero> {  // 添加
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {  // 删除
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}


