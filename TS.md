### 安装TS
```shell
 npm i -g typescript # 安装ts
# 查看当前 tsc 编译器版本 tsc命令来编译ts文件为js
tsc -v 
```
- 一些有用的编译选项
```shell
tsc --outDir ./dist ./src/helloKaiKeBa.ts #--outDir指定编译文件输出目录
tsc --outDir ./dist --target ES6 ./src/helloKaiKeBa.ts #ts默认编译为es3
tsc --outDir ./dist --target ES6 --watch ./src/helloKaiKeBa.ts #--watch在监听模式下运行，当文件发生改变的时候自动编译
```
- 编译配置文件：`tsconfig.json`，配置好后我们直接输入tsc编译就行了
    - 我们可以把编译的一些选项保存在一个指定的 `json` 文件中，默认情况下 `tsc` 命令运行的时候会自动去加载运行命令所在的目录下的 `tsconfig.json` 文件，配置文件格如下
    ```json
    {
        "compilerOptions": {
            "outDir": "./dist",//输出的目录
            "target": "ES2015",//编译的版本 如es6
        "watch": true,//是否为热刷新
            "strictNullChecks":true//检测 `null` 或者 `undefined`，避免很多常见问题
        },
    // ** : 所有目录（包括子目录）
    // * : 所有文件，也可以指定类型 *.ts
    "include": ["./src/**/*"]
    }
    ```
- 指定加载的配置文件
- 使用 `--project` 或 `-p` 指定配置文件目录，会默认加载该目录下的 `tsconfig.json` 文件
```shell
tsc -p ./configs
# 也可以指定某个具体的配置文件
tsc -p ./configs/ts.json
```
****
### 类型识别系统
- 程序 = 数据结构 + 算法 = 各种格式的数据 + 处理数据的逻辑
- 在 `TypeScript` 中，类型标注的基本语法格式为：数据载体：数据类型
- 基础的简单的类型标注：
    - 基础类型
        - string
        - number
        - boolean
        ```typescript
        let title: string = '字符串';
        let n: number = 100;
        let isOk: boolean = true;
        ```
    - 空和未定义类型
        - 因为在 `Null` 和 `Undefined` 这两种类型有且只有一个值，在标注一个变量为 `Null` 和 `Undefined` 类型，那就表示该变量不能修改了
        ```typescript
        let a: null;
        // ok
        a = null;
        // error
        a = 1;
        //默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 其它类型的变量
        let a: number;
        // ok
        a = null;
        ```
        > 小技巧：在配置文件中指定 `strictNullChecks` 配置为 `true`，可以有效的检测 `null` 或者 `undefined`，避免很多常见问题
    - 对象类型
        - 内置对象类型
            - 在 `JavaScript` 中，有许多的内置对象，比如：Object、Array、Date……，我们可以通过对象的 <u>构造函数</u> 或者 <u>类</u> 来进行标注
            ```typescript
            let a: object = {};
            // 数组这里标注格式有点不太一样，后面我们在数组标注中进行详细讲解
            let arr: Array<number> = [1,2,3];
            let d1: Date = new Date();
            ```
        - 自定义对象类型：
            - 字面量标注
            ```typescript
            let a: {username: string; age: number} = {
            username: 'zMouse',
            age: 35
            };
            // ok
            a.username;
            a.age;
            // error
            a.gender; 
            `优点` : 方便、直接
            `缺点` : 不利于复用和维护
            ```
            - 接口
            ```typescript
            // 这里使用了 interface 关键字
            interface Person {
            username: string;
            age: number;
            };
            let a: Person = {
            username: 'zMouse',
            age: 35
            };
            // ok
            a.username;
            a.age;
            // error
            a.gender;
            `优点` : 复用性高
            `缺点` : 接口只能作为类型标注使用，不能作为具体值，它只是一种抽象的结构定义，并不是实体，没有具体功能实现
            ************************************************************************************
            interface Point {
                x: number;
                y: number;
                color?: string;//接口也可以使用？来定义可选属性。表示该类型属性是可选的
            }
            ************************************************************************************
            
            //当我们标注了一个属性为只读(readonly)，那么该属性除了初始化以外，是不能被再次赋值的
            interface Point {
                readonly x: number;
                readonly y: number;
            }
            ************************************************************************************
            
            <--有的时候，我们希望给一个接口添加任意属性，可以通过索引类型来实现-->
            //当同时存在数字类型索引和字符串类型索引的时候，数字类型的值类型必须是字符串类型的值类型或子类型
            //**数字类型索引**
            interface Point {
                x: number;
    y: number;
                [prop: number]: number;
}
            ************************************************************************************
                
            //**字符串类型索引**
            interface Point {
                x: number;
                y: number;
                [prop: string]: number;
            }
            ************************************************************************************
            
            //我们还可以使用接口来描述一个函数
            interface IFunc {
  (a: string): string;//定义函数类型
            }
            let fn: IFunc = function(a) {}
            ************************************************************************************
            
            //多个同名的接口合并成一个接口
            interface Box {
                height: number;
                width: number;
            }
            
            interface Box {
                scale: number;
            }
            let box: Box = {height: 5, width: 6, scale: 10}//合并接口，但是如果其中一个类型不同的话将会报错
            ```
            - 定义 <u>类</u> 或者 <u>构造函数</u>
            ```typescript
            // 类
            `优点` : 功能相对强大，定义实体的同时也定义了对应的类型
            `缺点` : 复杂，比如只想约束某个函数接收的参数结构，没有必要去定一个类，使用接口会更加简单
            class Person {
                constructor(public username: string, public age: number) {
            }
            }
            // ok
            a.username;
            a.age;
            // error
            a.gender;
            ************************************************************************************
            
            //构造函数
            interface AjaxOptions {
                url: string;
                method: string;
            }
            
            function ajax(options: AjaxOptions) {}
            
            ajax({
                url: '',
                method: 'get'
            });
            ```
            - 包装对象
            ```typescript
            //这里说的包装对象其实就是 `JavaScript` 中的 `String`、`Number`、`Boolean`，我们知道 `string` 类型 和 `String` 类型并不一样，在 `TypeScript` 中也是一样
            let a: string;
            a = '1';
            // error String有的，string不一定有（对象有的，基础类型不一定有）
            a = new String('1');
            
            let b: String;
            b = new String('2');
            // ok 和上面正好相反
            b = '2';
            ```
    - 数组类型
        - `TypeScript` 中数组存储的类型必须一致，所以在标注数组类型的时候，同时要标注数组中存储的数据类型
        ```typescript
        //**使用泛型标注**
        // <number> 表示数组中存储的数据类型，
        let arr1: Array<number> = [];
        // ok
        arr1.push(100);
        // error
        arr1.push('123');
        //**简单标注**
        let arr2: string[] = [];
        // ok
        arr2.push('123');
        // error
        arr2.push(1);
        ```
    - 元组类型
        -元组类似数组，但是存储的元素类型不必相同，但是需要注意：
            - 初始化数据的个数以及对应位置标注类型必须一致
            - 越界数据必须是元组标注中的类型之一（标注越界数据可以不用对应顺序 - <u>联合类型</u>）
            ```typescript
            let data1: [string, number] = ['开课吧', 100];
            // ok
            data1.push(100);
            // ok
            data1.push('100');
            // error
            data1.push(true);
            ```
    - 枚举类型
        - 枚举的作用组织收集一组关联数据的方式，通过枚举我们可以给一组有关联意义的数据赋予一些友好的名字
        ```typescript
        enum HTTP_CODE {
        OK = 200,
        NOT_FOUND = 404,
        METHOD_NOT_ALLOWED
        };
        // 200
        HTTP_CODE.OK;
        // 405
        HTTP_CODE.METHOD_NOT_ALLOWED;
        // error
        HTTP_CODE.OK = 1;
        ```
        - 注意事项：
            - <u>key</u> 不能是数字
            - <u>value</u> 可以是数字，称为 <u>数字类型枚举</u>，也可以是字符串，称为 <u>字符串类型枚举</u>，但不能是其它值，默认为数字：<u>0</u>
            - 枚举值可以省略，如果省略，则：
            - 第一个枚举值默认为：0
            - 非第一个枚举值为上一个数字枚举值 + 1
            - 枚举值为只读（常量），初始化后不可修改
        > **字符串类型枚举**枚举类型的值，也可以是字符串类型
        ```typescript
        enum URLS  {
        USER_REGISETER = '/user/register',
        USER_LOGIN = '/user/login',
        // 如果前一个枚举值类型为字符串，则后续枚举项必须手动赋值
        INDEX = 0
        }
        ```
        > 注意：如果前一个枚举值类型为字符串，则后续枚举项必须手动赋值
        > 小技巧：枚举名称可以是大写，也可以是小写，推荐使用全大写（通常使用全大写的命名方式来标注值为常量）
    - 无值类型
        - 表示没有任何数据的类型，通常用于标注无返回值函数的返回值类型，函数默认标注类型为：`void`
        ```typescript
        function fn():void {
            // 没有 return 或者 return undefined
        }
        ```
        > 在 `strictNullChecks` 为 `false` 的情况下，`undefined` 和 `null` 都可以赋值给 `void` ，但是当 `strictNullChecks` 为 `true` 的情况下，只有 `undefined` 才可以赋值给 `void`
    - Never类型
        - 当一个函数永远不可能执行 `return` 的时候，返回的就是 `never` ，与 <u>void</u> 不同，`void` 是执行了 `return`， 只是没有值，`never` 是不会执行 `return`，比如抛出错误，导致函数终止执行
        ```typescript
        function fn(): never {
            throw new Error('error');
        }
        ```
    - 任意类型
        - 有的时候，我们并不确定这个值到底是什么类型或者不需要对该值进行类型检测，就可以标注为 `any` 类型
        ```typescript
        let a: any;
        ```
        - 一个变量申明未赋值且未标注类型的情况下，默认为 `any` 类型
        - 任何类型值都可以赋值给 `any` 类型
        - `any` 类型也可以赋值给任意类型
        - `any` 类型有任意属性和方法
        >注意：标注为 `any` 类型，也意味着放弃对该值的类型检测，同时放弃 IDE 的智能提示
        > 小技巧：当指定 `noImplicitAny` 配置为 `true`，当函数参数出现隐含的 `any` 类型时报错
    - 未知类型（Version3.0 Added）
        -  <u>unknow</u>，3.0 版本中新增，属于安全版的 <u>any</u>，但是与 any 不同的是：
        - <u>unknow</u> 仅能赋值给 <u>unknow</u>、<u>any</u>
        - <u>unknow</u> 没有任何属性和方法
    - 函数类型
        - 在 <u>JavaScript</u> 函数是非常重要的，在 <u>TypeScript</u> 也是如此。同样的，函数也有自己的类型标注格式
        - 参数
        - 返回值
        ```typescript
        函数名称( 参数1: 类型, 参数2: 类型... ): 返回值类型;
        function add(x: number, y: number): number {
            return x + y;
        }
        ```
****
### 高阶类型
- 联合类型也可以称为多选类型，当我们希望标注一个变量为多个类型之一时可以选择联合类型标注，<u>或</u> 的关系
```typescript
function css(ele: Element, attr: string, value: string|number) {
    // ...
}
let box = document.querySelector('.box');
// document.querySelector 方法返回值就是一个联合类型
if (box) {
    // ts 会提示有 null 的可能性，加上判断更严谨
    css(box, 'width', '100px');
    css(box, 'opacity', 1);
    css(box, 'opacity', [1,2]);  // 错误
}
```
- 交叉类型也可以称为合并类型，可以把多种类型合并到一起成为一种新的类型，<u>并且</u> 的关系。对一个对象进行扩展：
```typescript
interface o1 {x: number, y: string};
interface o2 {z: number};
let o: o1 & o2 = Object.assign({}, {x:1,y:'2'}, {z: 100});
```
**小技巧**
> `TypeScript` 在编译过程中只会转换语法（比如扩展运算符，箭头函数等语法进行转换，对于 `API` 是不会进行转换的（也没必要转换，而是引入一些扩展库进行处理的），如果我们的代码中使用了 `target` 中没有的 `API` ，则需要手动进行引入，默认情况下 `TypeScript` 会根据 `target` 载入核心的类型库
> `target` 为 `es5` 时: `["dom", "es5", "scripthost"]`
>  `target` 为 `es6` 时: `["dom", "es6", "dom.iterable", "scripthost"]`
>  如果代码中使用了这些默认载入库以外的代码，则可以通过 `lib` 选项来进行设置。在配置文件中新加一个配置就行了：'lib':'es6'
> http://www.typescriptlang.org/docs/handbook/compiler-options.html
- 有的时候，我们希望标注的不是某个类型，而是一个固定值，就可以使用字面量类型，配合联合类型会更有用
```typescript
function setPosition(ele: Element, direction: 'left' | 'top' | 'right' | 'bottom') {
  	// ...
}
// ok
box && setDirection(box, 'bottom');
// error
box && setDirection(box, 'hehe');
```
- 类型别名:有的时候类型标注比较复杂，这个时候我们可以类型标注起一个相对简单的名字
```typescript
type dir = 'left' | 'top' | 'right' | 'bottom';
function setPosition(ele: Element, direction: dir) {
  	// ...
}
```
- 使用类型别名定义函数类型:这里需要注意一下，如果使用 `type` 来定义函数类型，和接口有点不太相同
```typescript
type callback = (a: string) => string;
let fn: callback = function(a) {};
// 或者直接
let fn: (a: string) => string = function(a) {}
```
- interface 与 type 的区别
    **interface**
        - 只能描述 `object`/`class`/`function` 的类型
        - 同名 `interface` 自动合并，利于扩展
    **type**
        - 不能重名
        - 能描述所有数据
- 类型推导:每次都显式标注类型会比较麻烦，<u>TypeScript</u> 提供了一种更加方便的特性：类型推导。<u>TypeScript</u> 编译器会根据当前上下文自动的推导出对应的类型标注，这个过程发生在：
    - 初始化变量
    - 设置函数默认参数值
    - 返回函数值
    ```typescript
    // 自动推断 x 为 number
    let x = 1;
    // 不能将类型“"a"”分配给类型“number”
    x = 'a';

    // 函数参数类型、函数返回值会根据对应的默认值和返回值进行自动推断
    function fn(a = 1) {return a * a}
    ```
- 类型断言:有的时候，我们可能标注一个更加精确的类型（缩小类型标注范围），比如：
    ```typescript
    let img = document.querySelector('#img');
    ```
    - 我们可以看到 <u>img</u> 的类型为 <u>Element</u>，而 <u>Element</u> 类型其实只是元素类型的通用类型，如果我们去访问 <u>src</u> 这个属性是有问题的，我们需要把它的类型标注得更为精确：<u>HTMLImageElement</u> 类型，这个时候，我们就可以使用类型断言，它类似于一种 类型转换：
    ```typescript
    let img = <HTMLImageElement>document.querySelector('#img');
    或者
    let img = document.querySelector('#img') as HTMLImageElement;
    ```
    > 注意：断言只是一种预判，并不会数据本身产生实际的作用，即：类似转换，但并非真的转换了

****

### 函数详解

- **函数的标注**

  - 一个函数的标注包含

    \- 参数

    \- 返回值

    ```typescript
    function fn(a: string): string {};//函数定义1
    let fn: (a: string) => string = function(a) {};//定义2
    type callback = (a: string): string;
    interface ICallBack {
     (a: string): string;
    }
    let fn: callback = function(a) {};
    let fn: ICallBack = function(a) {};
    ***********************************************************************
        
    //可选参数 ？
    let div = document.querySelector('div');
    function css(el: HTMLElement, attr: string, val?: any) {
    }
    // 设置
    div && css( div, 'width', '100px' );
    // 获取
    div && css( div, 'width' );
    ***********************************************************************
    
    //我们还可以给参数设置默认值
        - 有默认值的参数也是可选的
        - 设置了默认值的参数可以根据值自动推导类型
    function sort(items: Array<number>, order = 'desc') {}
    sort([1,2,3]);
    // 也可以通过联合类型来限制取值
    function sort(items: Array<number>, order:'desc'|'asc' = 'desc') {}
    // ok
    sort([1,2,3]);
    // ok
    sort([1,2,3], 'asc');
    // error
    sort([1,2,3], 'abc');
    ***********************************************************************
    
    //剩余参数是一个数组，所以标注的时候一定要注意
    interface IObj {
        [key:string]: any;
    }
    function merge(target: IObj, ...others: Array<IObj>) {
        return others.reduce( (prev, currnet) => {
            prev = Object.assign(prev, currnet);
            return prev;
        }, target );
    }
    let newObj = merge({x: 1}, {y: 2}, {z: 3});
    ***********************************************************************
    
    //- 对于普通函数而言，`this` 是会随着调用环境的变化而变化的，所以默认情况下，普通函数中的 `this` 被标注为 `any`，但我们可以在函数的第一个参数位（它不占据实际参数位置）上显式的标注 `this` 的类型
    interface T {
        a: number;
        fn: (x: number) => void;
    }
    let obj1:T = {
        a: 1,
        fn(x: number) {
            //any类型
            console.log(this);
        }
    }
    let obj2:T = {
        a: 1,
        fn(this: T, x: number) {
            //通过第一个参数位标注 this 的类型，它对实际参数不会有影响
            console.log(this);
        }
    }
    obj2.fn(1);
    ***********************************************************************
    - 箭头函数的 `this` 不能像普通函数那样进行标注，它的 `this` 标注类型取决于它所在的作用域 `this` 的标注类型
    ```

- **函数重载**

- 有的时候，同一个函数会接收不同类型的参数返回不同类型的返回值，我们可以使用函数重载来实现

  ```typescript
  function showOrHide(ele: HTMLElement, attr: string, value: 'block'|'none'|number) {
    //
  }
  
  let div = document.querySelector('div');
  if (div) {
   showOrHide( div, 'display', 'none' );
   showOrHide( div, 'opacity', 1 );
    // error，这里是有问题的，虽然通过联合类型能够处理同时接收不同类型的参数，但是多个参数之间是一种组合的模式，我们需要的应该是一种对应的关系
   showOrHide( div, 'display', 1 );
  }
  ```

  我们来看一下函数重载

  ```typescript
  function showOrHide(ele: HTMLElement, attr: 'display', value: 'block'|'none');
  function showOrHide(ele: HTMLElement, attr: 'opacity', value: number);
  function showOrHide(ele: HTMLElement, attr: string, value: any) {
   ele.style[attr] = value;
  }
  let div = document.querySelector('div');
  if (div) {
   showOrHide( div, 'display', 'none' );
   showOrHide( div, 'opacity', 1 );
   // 通过函数重载可以设置不同的参数对应关系
   showOrHide( div, 'display', 1 );
  }
  ```
  
  \-  重载函数类型只需要定义结构，不需要实体，类似接口
  
  ```typescript
interface PlainObject {
  [key: string]: string|number;
}
  function css(ele: HTMLElement, attr: PlainObject);
  function css(ele: HTMLElement, attr: string, value: string|number);
  function css(ele: HTMLElement, attr: any, value?: any) {
    if (typeof attr === 'string' && value) {
  ​    ele.style[attr] = value;
    }
    if (typeof attr === 'object') {
  ​    for (let key in attr) {
  ​      ele.style[attr] = attr[key];
  ​    }
    }
  }
  let div = document.querySelector('div');
  if (div) {
    css(div, 'width', '100px');
    css(div, {
  ​    width: '100px'
    });
    // error，如果不使用重载，这里就会有问题了
    css(div, 'width');
  }
  ```
  

****

### 面向对象编程TS

- 类 

  ```typescript
  /*- `class` 关键字
  - 构造函数：`constructor`
  - 成员属性定义
  - 成员方法
  - this关键字
  - 通常类的名称我们会使用 大坨峰命名 规则，也就是 （单词）首字母大写*/
  class User {
    // 类的特征都定义在 {} 内部
  }
  ```

- 构造函数：

  ```typescript
  /*通过 `class` 定义了一个类以后，我们可以通过 `new` 关键字来调用该类从而得到该类型的一个具体对象：也就是实例化。
  为什么类可以像函数一样去调用呢，其实我们执行的并不是这个类，而是类中包含的一个特殊函数：构造函数 - `constructor`*/
  class User {
  	constructor() {//实例化的构造函数
      console.log('实例化...')
    }
  }
  let user1 = new User;
  /*- 默认情况下，构造函数是一个空函数
  - 构造函数会在类被实例化的时候调用
  - 我们定义的构造函数会覆盖默认构造函数
  - 如果在实例化（new）一个类的时候无需传入参数，则可以省略 `()`
  - 构造函数 `constructor` 不允许有`return` 和返回值类型标注的（因为要返回实例对象）
  - 通常情况下，我们会把一个类实例化的时候的初始化相关代码写在构造函数中，比如对类成员属性的初始化赋值*/
  ```

- **成员属性与方法定义**

```typescript
class User {//定义一个user类
  id: number;
  username: string;
  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
      //在类内部，我们可以通过 `this` 关键字来访问类的成员属性和方法
  }
	postArticle(title: string, content: string): void {
    console.log(`发表了一篇文章： ${title}`)
     //console.log(`${this.username} 发表了一篇文章： ${title}`)
  }
}
let user1 = new User(1, 'zMouse');
let user2 = new User(2, 'MT');
*************************************************************************************************
//因为在构造函数中对类成员属性进行传参赋值初始化是一个比较常见的场景，所以 `ts` 提供了一个简化操作：给构造函数参数添加修饰符来直接生成成员属性
 class User {
  constructor(
  	public id: number,//`public` 就是类的默认修饰符，表示该成员可以在任何地方进行读写操作
    public username: string
  ) {
    // 可以省略初始化赋值
  }
	postArticle(title: string, content: string): void {
    console.log(`${this.username} 发表了一篇文章： ${title}`)
  }
}
let user1 = new User(1, 'zMouse');
let user2 = new User(2, 'MT');
```

- **继承**

```typescript
//在 `ts` 中，也是通过 `extends` 关键字来实现类的继承
*************************************************************************************************
/*在子类中，我们可以通过 `super` 来引用父类
- 如果子类没有重写构造函数，则会在默认的 `constructor` 中调用 `super()`
- 如果子类有自己的构造函数，则需要在子类构造函数中显示的调用父类构造函数 : `super(//参数)`，否则会报错
- 在子类构造函数中只有在 `super(//参数)` 之后才能访问 `this`
- 在子类中，可以通过 `super` 来访问父类的成员属性和方法
- 通过 `super` 访问父类的的同时，会自动绑定上下文对象为当前子类 `this`*/
class VIP extends User {//继承父类
  constructor(
  		id: number,
      	username: string,
     	public score = 0
    ) {
        super(id, username);//引用父类的属性
    }
  postAttachment(file: string): void {
    console.log(`${this.username} 上传了一个附件： ${file}`)
  }
}
let vip1 = new VIP(1, 'Leo');
vip1.postArticle('标题', '内容');//调用父类的方法
vip1.postAttachment('1.png');//调用子类自己定义的方法
*************************************************************************************************
/*默认情况下，子类成员方法集成自父类，但是子类也可以对它们进行重写和重载*/
 class VIP extends User {
    constructor(
  		id: number,
      username: string,
      public score = 0
    ) {
        super(id, username);
    }
  	// postArticle 方法重写，覆盖原来父类的方法
    postArticle(title: string, content: string): void {
      this.score++;
      console.log(`${this.username} 发表了一篇文章： ${title}，积分：${this.score}`)；
    }
    postAttachment(file: string): void {
        console.log(`${this.username} 上传了一个附件： ${file}`)
    }
}
// 具体使用场景
let vip1 = new VIP(1, 'Leo');
vip1.postArticle('标题', '内容');
*************************************************************************************************
//方法重载，跟函数的重载差不多
class VIP extends User {
    constructor(
  	  id: number,
      username: string,
      public score = 0
    ) {
        super(id, username);
    }
    // 参数个数，参数类型不同：重载父类的方法
  	postArticle(title: string, content: string): void;
    postArticle(title: string, content: string, file: string): void;
    postArticle(title: string, content: string, file?: string) {
        super.postArticle(title, content);
        if (file) {
            this.postAttachment(file);
        }
    }
    postAttachment(file: string): void {
        console.log(`${this.username} 上传了一个附件： ${file}`)
    }
}
// 具体使用场景
let vip1 = new VIP(1, 'Leo');
vip1.postArticle('标题', '内容');
vip1.postArticle('标题', '内容', '1.png');
```

- **修饰符**

  - 有的时候，我们希望对类成员（属性、方法）进行一定的访问控制，来保证数据的安全，通过 `类修饰符` 可以做到这一点，目前 TypeScript 提供了四种修饰符

  ```typescript
  /*
  - public：公有，类成员的默认修饰符，访问级别为：
  	- 自身/子类/类以外
  - protected：受保护的修饰符，访问级别为：
  	- 自身/子类
  - private：私有修饰符，访问级别为：
  	- 自身
  - readonly：只读，只争对类成员使用，之外只读不能重写赋值
  	- 自身/子类/类以外
  */
  *************************************************************************************************
  class User {
    constructor(
    	readonly id: number,// 可以访问，但是一旦确定不能修改
      protected username: string,// 可以访问，但是不能外部修改
      private password: string // 外部包括子类不能访问，也不可修改
    ) {
      // ...
    }
  	// ...
  }
  let user1 = new User(1, 'zMouse', '123456');
  ```

- 