# 面向对象
- ### 传值和传址
    1. 普通数据类型不会受到相互影响
        ```javascript
        let a = 10;
        let b = a;
        b = 20;
        console.log(a)//普通数据类型不会受到影响。 a =10;

    2. 复杂数据类型会更改内存中的地址。如`son.protoType =dad.protoType;`
        - 解决方法1，转JSON序列，此方法会丢失对象内的方法和undefined
            ```javascript
            let obj ={
                name:'张三';
                age;2;
                fun:function(){
                    console.log('fn...')
                }
            }
            let obj2 =JSON.parse(JSON.stringify(obj))//转换成json序列
            obj2.age =30;//在赋值就不会改变原来的数据了；
            console.log(obj,obj2)//obj2里面的方法会丢失

        - 解决方法2，使用深拷贝，首先创建一个空对象，然后把要拷贝目标的属性循环依次写入这个新的对象。
            ```javascript
            //for in循环对象会把对象的原型里面的属性和方法也遍历出来
            //hasOwnProperty(key)。判断是对象自身的属性还是原型的属性，返回true/false
            function deepCopy(obj) {
                let newObj = Array.isArray(obj) ? [] : {};//判断这个新的对象是要给数组还是一个对象；
                for (let i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        if (typeof obj[i] === "object") {
                            if (obj[i] === null) {
                                newObj[i] = null;
                            } else {
                                newObj[i] = deepCopy(obj[i]);
                            }
                        } else {
                            newObj[i] = obj[i];
                        }
                    }
                }
                return newObj;
            }

                let obj = {
                    name: "张三",
                    age: 20,
                    /**
                     *对象的属性有可能是一个数组
                     也有可能是一个对象。所以在深拷贝的时候要注意 
                     **/
                    arr: [1, 2, 3],
                    obj3: {

                    },
                    test: undefined,
                    fn: function () {
                        console.log("fn...");
                    },
                    test2: null//tyepof会把null当成一个对象来处理
                }
                let obj2 = deepCopy(obj);
                obj2.age = 30;
                console.log(obj, obj2);
    
- ### es5简单继承
- 改变this指向，和父类公用一个this达到继承的目的，但是不能继承父类protoType的方法
    ```javascript
    //父类
    function Dad(height){
        this.name ='张三';
        this.age =20;
        this.height =height;
        this.monngy = '$10000'；
    }
    //子类的继承3种方法，不能继承原型
    function Son(height){
        Dad.call(this,height);
        // Dad.apply(this,[height])
        // Dad.bind(this)(height);
    }
    let newSon = new Son("178cm");
    console.log(newSon);
- ### 组合继承
- 通过一个空的构造函数来继承父类的原型方法
    ```javascript
    // 组合继承；
    function Dad(height){
        this.name = "张三";
        this.age = 20;
        this.height = height;
        this.money = "$1000000";
    }
    Dad.prototype.hobby = function(){
        console.log("喜欢高尔夫");
    }
    //共通this，常用call()
    function Son(height){
        Dad.call(this,height);
        // Dad.apply(this,[height])
        // Dad.bind(this)(height);
    }
    let Link = function(){};//创建一个空的构造函数来搭桥
    Link.prototype = Dad.prototype;
    Son.prototype = new Link();

    // Son.prototype  预定义属性constructor会改变；
    Son.prototype.constructor = Son;//重新设置预定义属性
    Son.prototype.hobby = function(){
        console.log("篮球");
    }
    let newSon = new Son("178cm");
    // console.log(newSon);
    newSon.hobby();
    let newDad = new Dad("179cm");
    newDad.hobby();
# Es6 class类
- 类的属性一般都写在`constructor`里面，es6的类会把方法直接写入原型
    ```javascript
    class Drag(){
        static height ='123'//这里是这个类的静态属性
        constructor(){//属性写这里面
            this.name ='张三';
        }
        hobby(){//实例化后方法直接写如原型
            console.log('篮球');
        }
    }
    let drag1 = new Drag();
- Es6 继承`extends`
    ```js
    class Drag(){
        static height ='123'//这里是这个类的静态属性
        constructor(age){//属性写这里面
            this.name ='张三';
            this.age =age;
        }
        hobby(){//实例化后方法直接写如原型
            console.log('篮球');
        }
    }

    //继承父类
    class Son extends Drag{
        constructor(age){
            super(age);//super相当于es5里面的call
        }
        hobby(){
            super.hobby()//相当于先继承父类的方法
            console.log('子类的方法')//再写子类自己的方法
        }
    }
    实例化子类
    let son =new Son(20);
    son.hobby();

- 合并对象方法
    `Object.assign()`如果两个对象有相同的属性 第二个参数会覆盖第一个参数
    ```javascript
    assign(obj,obj2)
    assign({},{})


# 事件对象
- 系统提供的自定义事件对象方法`EvenTarger`
    1. `EventTarget.addEventListener()`添加自定义事件监听
        ```js
        fucnction cancer() {
               console.log('默认取消')
            }
        let cancer = new Event('cancer');//实例化的时候要加Event('事件名')
        this.addEventListener('cancer', cancer);
    2. `EventTarget.removeEventListener()`
    3. `EventTarget.dispatchEvent()`这个是EventTarget的事件触发器
    
- 详解2
    `addeventlistenner（event ,fn,booleen）`
    - 第一个参数  为系统的事件名 但是前面不能加on 例如cilick 而不是onclick 只能是系统定义的事件名 不能自定义
    - 第二个 传入当以一个事件触发之后的回调函数
    - 第三个 是否阻止冒泡
    - 如果想自定第一个参数 那么要先实例化`even`t类 传入你自定义的名称  
    - 然后用`addeventlistenner` 把他们绑定在一起 
    - 然后用`dispatchevent` 触发 
    ```js
    function click() {
            console.log(1111)
         }
         let a = document.querySelector(".box")
        let h = new Event("b")
        a.addEventListener("b", click)
        a.dispatchEvent(h)

****
# Es6基础整理
- let 和 const
    - let 和 var 的差异
        - let 允许声明一个在作用域限制在块级中的变量、语句或者表达式
            - 块级作用域 {}
        - var 声明的变量只能是全局或者整个函数块的
        - let 不能重复声明
        - let 不会被预解析
        - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let
    - const 常量
        - 常量不能重新赋值
        - 不能重复声明
        - 块级作用域
        - const 不会被预解析
        - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const
- 解构赋值
    - 对象的解构赋值
    - 数组的解构赋值
    - 字符串的解构赋值
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- 展开运算符
    - 对象展开
    - 数组展开
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
- Set 对象    
    - Set 对象的数据结构
    - Set 相关属性与方法
        - size 属性
        - clear()、delete()、has()、add()    
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set
- Map 对象
    - Map 对象的数据结构
    - Map 相关属性与方法
    - size 属性
    - clear()、delete()、get()、has()、set()
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map
- 函数新增扩展
    - 箭头函数
        - 箭头函数的各种写法
        - 箭头函数的 this 问题
        - 箭头函数的不定参问题
        - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    - rest 参数设置
    - 参数默认值设置
- 新增数组扩展
    - Array.form()、Array.of() 
    - find()、findIndex()、includes()
    - flat()、flatMap()
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
- 新增字符串扩展
    - includes(), startsWith(), endsWith()
    - repeat()
    - 模版字符串   
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String
- 新增对象扩展
    - 属性简洁表示法
    - 属性名表达式
    - 方法简写
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object
- babel 使用
    - Babel 是一个 JavaScript 编译器
    - 手册地址：https://www.babeljs.cn/
    - Babel 基本是否方法
    ```

****

# Es6高阶
- 同步异步概念
    - 同步阻塞：做一件事情的过程中，在等待结果返回的时候不能去做其他的事情，只能等待结果完成
    - 异步非阻塞 ：做一件事情的过程中，在等待结果的同时，可以去做其他的事情，当结果查询出来之后，用一个状态来通知做这个事情的主体
- `Promise`Promise对象是一个构造函数，用来生成Promise实例;
    所谓Promise对象，就是代表了未来某个将要发生的事件（通常是一个异步操作）。
    它的好处在于，有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数   
    ```js
    let p =new Promise((resolve,reject)=>{
        resolve('成功状态');
        //reject('失败状态');
    })
    ```
    - Promise对象的3种状态：
        - pending(等待状态),
        - resolved(成功状态)/fulfilled(火狐),
        - rejected(失败状态)
        ```js
        //提供方法；then: 接收2个参数 onresolved,onrejected  ； 
         p.then(function (res) {
             console.log("成功回调",res);
         },function (err) {
             console.log("失败回调 ",err);
         });```
    - then 的返回值，会返回一个新的 Promise 对象, 但是状态会有几种情况:
        1. then 的回调函数中没有返回值，then就会返回一个状态为: resolved 的 promise 对象
        2. then 的回调函数返回值是 非 promise 的值, then就会返回一个状态为: resolved 的 promise 对象，另外会把返回值，传递给 下一个 then
        3. then 的回调函数返回值是 promise 对象，then 就直接返回这个  promise 对象，具体的状态可以由我们自己定义,具体传递的值，也由我们自己
        ```js
         let p2 = p.then(function () {
             return new Promise((resolve)=>{
                     resolve();
             });
         })
         console.log(p2);
         p2.then();```
    - `catch` 失败回调，抛出错误。也会返回一个Promise对象，之后还可以继续then
    - `Promise.all([])`会同时执行所有状态为成功的Promise对象，把结果保存在一个数组里面。
    - `Promise.race([])`会同时执行所有的Promise对象，把结果返回在一个数组里面。不论成功与否。
    - `Promise.resolve()`修改then状态为resolved的Promise对象
    - `Promise.reject()`修改then状态为rejected的Promise对象
        ```js
        let p2 = p1.then(()=>{
        return Promise.reject();//这里修改了默认状态，会返回一个状态为rejected的Promise对象
        });
        console.log(p2);
    - `async await后面跟一个Promise对象`异步函数，同步写法
        - await 必须要等待结果(Promise里面的resolve成功结果)，才能继续执行下一个await。否则将不执行
        ```js 
        //方块运动
        function move(el, styname, end) {
            return new Promise((resolve, reject) => {
                let star = parseInt(window.getComputedStyle(el)[styname]);
                let jlpx = end - star;
                let speed = 10;

                function fn() {
                    let newpx = parseInt(window.getComputedStyle(el)[styname]);
                    if (newpx == end) {
                        resolve('运动完成');
                        //reject('运动错')
                    } else {
                        if (jlpx > 0) {
                            el.style[styname] = newpx + speed + 'px'
                        } else {
                            el.style[styname] = newpx - speed + 'px';
                        }
                        window.requestAnimationFrame(fn);
                    }
                }
                fn()
            });

        }
        async function myfn() {
            await move(box, 'left', 400).then(rec => {
                console.log(rec)
            })
            await move(box, 'top', 400).then(rec => {
                console.log(rec)
            })
            await move(box, 'left', 0).then(rec => {
                console.log(rec)
            })
            await move(box, 'top', 0).then(rec => {
                console.log(rec)
            })
        }
        myfn()
    ```
- Es5数据劫持`defineProperty`如果创建的对象没有此属性，可以直接添加该属性 这个里面取不到外面的this
    ```js

     let o = {};
     Object.defineProperty(o,"message",{
         configurable:true,//是否可配置。比如删除 默认false
         enumerable:true,//是否可枚举 默认false
         get(){//获取数据
             console.log("get..");
             return "测试数据";
         },
         set(newValue){
            console.log("set..",newValue);
         }
     })
    // console.log(o);
    // delete o.message;
    // console.log(o);
    // for(let i in o){
    //     console.log(i);
    // }
- Es6数据劫持`proxy`
    ```js
        let obj = {
        name:"张三",
        age:20
    }
    /*
    target 对象本身，key:对象的属性名。自动循环，
    **/
    let newObj = new Proxy(obj,{
        get(target,key){
            console.log("get...");
            return target[key];
        },
        set(target,key,newValue){
            console.log("set..");
            target[key] = newValue;
            return true;
        },
    })
    ```
- Es6模块化，为js的严格模式 https://blog.csdn.net/qq_29677867/article/details/90482887
    - 在html:
     ```js
     <script type="module">
    //导入模块
    </script> 
    ```
    - 在js模块中导出模块： 
    ```js
    //common.js
    export default { name:"abc" }
    //b.js
    import common from "common.js"
    console.log( common.name ) //"abc"
    // 按需导入（延迟导入）；import方法:返还一个promise对象；
    document.onclick =async function(){
        // import num from './a.js';
        // import("./a.js").then(res=>{
        //     console.log(res);
        // })
        let res = await import("./a.js");
        console.log(res);
    }
- 非模块化的弊端：
    1. 代码杂乱无章，没有条理性，不便于维护，不便于复用
    2. 很多代码重复、逻辑重复
    3. 全局变量污染
    4. 不方便保护私有数据(闭包)
****
### 正则
- 正则对象下的方法
- `text`返回一个布尔值
- `exec`查找匹配的正则，一次只能查找一个，返回一个对象；
    ```js
    // 1.test 2.exce;
     let str = "dfasfd342234fda2342342f";
     let reg = /\d+/;
     let res = reg.test(str);
     console.log(res);
     let reg = /\d+/g;
     let res = reg.exec(str);
    console.log(res);
     let res1 = reg.exec(str);
     console.log(res1);

### 元字符
- 正则表达式中有特殊含义的非utf字母字符；
​- 字符类别（Character Classes）
  - 匹配行结束符（\n \r \u2028 或 \u2029）以外的任意单个字符
  - 在 `字符集合（Character Sets）` 中，. 将失去其特殊含义，表示的是原始值
- `\ `转义符，它有两层含义
    - 表示下一个具有特殊含义的字符为字面值
    - 表示下一个字符具有特殊含义（转义后的结果是元字符内约定的）
- `\d` 匹配任意一个阿拉伯数字的字符
- `\D` 匹配任意一个非阿拉伯数字的字符
- `\w` 匹配任意一个（字母、数字、下划线）的字符
- `\W` 匹配任意一个非（字母、数字、下划线）的字符
- `\s` 匹配一个空白符，包括空格、制表符、换页符、换行符和其他 Unicode 空格
- `\S` 匹配一个非空白符
- `\t` 匹配一个水平制表符（tab）
- `\r` 匹配一个回车符（carriage return）
- `\n` 匹配一个换行符（linefeed）
- `\v `匹配一个垂直制表符（vertical tab）
- `\f` 匹配一个换页符（form-feed）
### 字符集合
[xyz]
- 一个字符集合，也叫字符组。匹配集合中的任意一个字符。你可以使用连字符'-'指定一个范围
- `[xyz]` 是一个反义或补充字符集，也叫反义字符组。也就是说，它匹配任意不在括号内的字符。你也可以通过使用连字符 '-' 指定一个范围内的字符
### 边界
- `^` 匹配输入开始。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符后的开始处
- `$`匹配输入结尾。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符的前的结尾处
- `\b`匹配一个零宽单词边界（zero-width word boundary）
- `\B`匹配一个非零宽单词边界（zero-width word boundary）
### 分组
- (子项)
  - 可以使用 () 对表达式进行分组，类似数学中分组，也称为子项
  - 索引分组
  - 命名分组
    - (?<name>...)
    - groups属性
  - 捕获匹配
    - 具有捕获（capturing）特性，即会把匹配结果保存到（子项结果）中
    - (x)
  - 非捕获匹配
    - 不具有捕获（capturing）特性，即不会把匹配结果保存到（子项结果）中
    - (?:x)
  - 零宽断言/预查（Assertions）
    - 用于指定查找在某些内容(但并不包括这些内容)之前或之后的内容
    - 正向零宽断言/预查
      - 肯定 (?=pattern)
      - 否定(?!pattern)
    - 负向零宽断言/预查（注意：ES2018新增）
      - 肯定 (?<=pattern)
      - 否定 (?<!patten)
  - 捕获与零宽断言的区别
    - 捕获：匹配的内容出现在结果中但不出现在子项结果中
    - 零宽断言：完全不会出现在结果
### 反向引用
  - `\n`这里的 n 表示的是一个变量，值为一个数字，指向正则表达式中第 n 个括号（从左开始数）中匹配的子字符串
### 数量词汇
  - `x{n}`
    - n 是一个正整数。前面的模式 x 连续出现 n 次时匹配
  - `x{n,m}`
    - n 和 m 为正整数。前面的模式 x 连续出现至少 n 次，至多 m 次时匹配
  - `x{n,}`
    - n 是一个正整数。前面的模式 x 连续出现至少 n 次时匹配
  - `x*`
    - 匹配前面的模式 x 0 或多次
  - `x+`
    - 匹配前面的模式 x 1 或多次。等价于 {1,}
  - `x?`
    - 匹配前面的模式 x 0 或 1 次
  - `x|y`
    - 匹配 x 或 y
### 匹配模式
  - `g` global，全局模式：找到所有匹配，而不是在第一个匹配后停止
  - `i` ignore，忽略大小写模式：匹配不区分大小写
  - `m` multiple，多行模式：将开始和结束字符（^和$）视为在多行上工作，而不只是匹配整个输入字符串的最开始和最末尾处
  - `s` dotAll / singleline模式：. 可以匹配换行符
  - `u` unicode，unicode模式：匹配unicode字符集
      ```js
       console.log(/^.$/.test("\uD842\uDFB7"));
       console.log(/^.$/u.test("\uD842\uDFB7"));
      ```
  - `y` sticky，粘性模式：匹配正则中lastIndex属性指定位置的字符，并且如果没有匹配也不尝试从任何后续的索引中进行匹配

- 正则工具  http://regexper.com