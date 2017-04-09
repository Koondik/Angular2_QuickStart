/**
 * Created by YGD on 2017/4/9.
 */
import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions  导入 RxJS 操作符
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  // moduleId: module.id,
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  /*
   Subject（主题）是一个可观察的事件流中的生产者。 searchTerms生成一个产生字符串的Observable，用作按名称搜索时的过滤条件。
   每当调用search时都会调用next来把新的字符串放进该主题的可观察流中。
  */
  ngOnInit(): void {
    this.heroes = this.searchTerms  // Subject也是一个Observable对象。 我们要把搜索词的流转换成Hero数组的流，并把结果赋值给heroes属性。
    /*
       如果我们直接把每一次用户按键都直接传给HeroSearchService，就会发起一场 HTTP 请求风暴。 这可不好玩。我们不希望占用服务器资源，也不想耗光蜂窝移动网络的流量。
       幸运的是，我们可以在字符串的Observable后面串联一些Observable操作符，来归并这些请求。 我们将对HeroSearchService发起更少的调用，并且仍然获得足够及时的响应。做法如下：
       1.在传出最终字符串之前，debounceTime(300)将会等待，直到新增字符串的事件暂停了 300 毫秒。 我们实际发起请求的间隔永远不会小于 300ms。
       2.distinctUntilChanged确保只在过滤条件变化时才发送请求， 这样就不会重复请求同一个搜索词了。
       3.switchMap会为每个从debounce和distinctUntilChanged中通过的搜索词调用搜索服务。 它会取消并丢弃以前的搜索可观察对象，只保留最近的。
      */
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      /*switchMap操作符 (以前叫"flatMapLatest")是非常智能的。
       每次符合条件的按键事件都会触发一次对http方法的调用。即使在发送每个请求前都有 300 毫秒的延迟， 我们仍然可能同时拥有多个在途的 HTTP 请求，并且它们返回的顺序未必就是发送时的顺序。
       switchMap保留了原始的请求顺序，并且只返回最近一次 http 调用返回的可观察对象。 这是因为以前的调用都被取消或丢弃了。
       如果搜索框为空，我们还可以短路掉这次http方法调用，并且直接返回一个包含空数组的可观察对象。
       注意，取消HeroSearchService的可观察对象并不会实际中止 (abort) 一个未完成的 HTTP 请求， 除非服务支持这个特性，这个问题我们以后再讨论。 目前我们的做法只是丢弃不希望的结果。
      */
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Hero[]>([]))
      /*
       catch拦截失败的可观察对象。这个简单的例子中只是把错误信息打印到控制台（但实际的应用需要做更多事），然后返回一个包含空数组的可观察对象，以清空搜索结果。
      */
      .catch(error => {  // 获取数据失败时
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }
  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
