/**
 * Created by CZ on 2017/5/15.
 */
import { Directive , ElementRef , HostListener , Input } from '@angular/core'; // import语句指定了从 Angular 的core库导入的一些符号。
// HostListener装饰器添加两个事件处理器，它们会在鼠标进入或离开时进行响应。

@Directive({selector:'[myHighlight]'})  // Directive提供@Directive装饰器功能。
/*
 然后，@Directive装饰器函数以配置对象参数的形式，包含了指令的元数据。
 @Directive装饰器需要一个 CSS 选择器，以便从模板中识别出关联到这个指令的 HTML。
 用于 attribute 的 CSS 选择器就是属性名称加方括号。 这里，指令的选择器是[myHighlight]，Angular 将会在模板中找到所有带myHighlight属性的元素
*/

export class HighlightDirective {
  constructor(private el: ElementRef) {}
  // ElementRef注入到指令构造函数中。这样代码就可以访问 DOM 元素了。 Input将数据从绑定表达式传达到指令中。
  @HostListener('mouseenter') onMouseEnter() { // @HostListener装饰器引用属性型指令的宿主元素，在这个例子中就是<p>。
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
/*
 @Directive元数据之后就是该指令的控制器类，名叫HighlightDirective，它包含该指令的逻辑。 然后导出HighlightDirective，以便让它能从其它组件中访问到。

 Angular 会为每个匹配的元素创建一个指令控制器类的实例，并把 Angular 的ElementRef和Renderer注入进构造函数。
 ElementRef是一个服务，它赋予我们通过它的nativeElement属性直接访问 DOM 元素的能力。
 Renderer服务允许通过代码设置元素的样式。
*/

