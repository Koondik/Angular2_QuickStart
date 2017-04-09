/**
 * Created by YGD on 2017/4/9.
 */
/*
 但是请求并非总是“一次性”的。我们可以开始一个请求， 并且取消它，在服务器对第一个请求作出回应之前，再开始另一个不同的请求。
 像这样一个请求-取消-新请求的序列用承诺是很难实现的，但接下来我们会看到，它对于可观察对象却很简单。
 */

// 我们要为《英雄指南》添加一个英雄搜索特性。 当用户在搜索框中输入一个名字时，我们将不断发起 HTTP 请求，以获得按名字过滤的英雄。
import { Injectable } from '@angular/core';  // 服务必备
import { Http } from '@angular/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()  // 不要忘了写圆括号！如果忘了写，就会导致一个很难诊断的错误。
export class HeroSearchService {
  constructor(private http: Http) { }
  search(term: string): Observable<Hero[]> {
   return this.http
     .get(`app/heroes/?name=${term}`)   // HeroSearchService中的http.get()调用和HeroService中的很相似，只是这次带了查询字符串。 显著的不同是：我们不再调用toPromise，而是直接返回可观察对象。
     .map(response => response.json().data as Hero[]);
  }
}

