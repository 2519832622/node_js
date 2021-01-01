# `React`笔记大全
- `React.js` 提供 `React.js` 核心功能代码，如：虚拟 dom，组件
    - `React.createElement`(type,props,children);(dom标签,属性名,子标签)
- `ReactDOM` 提供了与浏览器交互的 DOM 功能，如：dom 渲染
``` JS
ReactDOM.render(
    React.createElement("header",{id:"title"},
        React.createElement("h1",null,"hello React"),
        React.createElement("p",null,"欢迎来到 React 的世界")
    ),
    document.querySelector("#box")//渲染到页面dom
);
```
 - `ReactDOM.render(element, container[, callback])`
        - `element`：要渲染的内容
        - `container`：要渲染的内容存放容器
        - `callback`：渲染后的回调函数 
- `babel`
    - `babel-standalone.js`：在浏览器中处理 JSX
    ``` JS
      /*
        jsx: js + xml 语法糖
    */     
    ReactDOM.render(
        <header id="title">//xml语法
            <h1>Hello React</h1>
            <p>欢迎来到 React 的世界</p>
        </header>,
        document.querySelector("#box")
    );
    ```
    - https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js

- `JSX `使用注意事项
    - 必须有,且只有一个顶层的包含元素
    - `JSX` 不是html，很多属性在编写时不一样
        - `className`
        - `style` 
    - 列表渲染时，必须有 key 值
    - 在 `jsx` 所有标签必须闭合
    - 组件的首字母一定大写，标签一定要小写   

- 插值表达式:
    - 当在属性中使用 {} 的时候，不要使用引号包含
    ``` JS
    let text = document.querySelector("#text");
        text.oninput = ()=>{
            ReactDOM.render(
                <div>
                    这是新内容：{text.value}//{插值表达式}
                </div>,
                document.querySelector("#box")
            );
        };
    ```
    - 在 JXS 中可以使用 {表达式} 嵌入表达式,表达式：产生值的一组代码的集合（`有返回值的都可以`）
        - 变量
        - 算术运算
        - 函数调用
        - ……
    - 注意：分清楚 表达式 与 语句 的区别，if、for、while 这些都是语句，JSX 不支持语句
    ``` JS
    let fn = ()=>{
        return (
            <div>
                <span>第一块</span>
                <strong>第二块</strong>
            </div>   
        );
    }
    ReactDOM.render(
        <header id="title">
          <div>{fn()}</div>//可以调一个回调函数
         {["1","2",3]}//数组类型。
        </header>,
        document.querySelector("#box")
    );
    ```
    
- 输出数据类型
    - 字符串、数字：原样输出
    - 布尔值、空、未定义 会被忽略
    ``` JS
    let isShow = false;
    ReactDOM.render(
        <header id="title">
            {/*isShow?<h1>正确</h1>:<h1>错误</h1>*/}
            {/*isShow&&<h1>正确</h1>*/}
            {/*isShow||<h1>错误</h1>*/}
            {fn()}//回调函数
        </header>,
        document.querySelector("#box")
    );
    ```
    
- 列表渲染
    - 数组
    - 对象
    ``` JS
    let arr = [
        <p>第一个p</p>,
        <p>第二个p</p>,
        <p>第三个p</p>
    ];
    let arr1 = [
        "a",
        "b",
        "c",
        "d"
    ];
    let obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
    }
    Object.keys(obj)//拿到对象里面的每一个属性名
    ReactDOM.render(
        <div>
            {Object.keys(obj).map((item,index)=><p>第{index}{item}个p</p>)}
        </div>,
        document.querySelector("#box")
    );
    ```
****
### **基于自动化的集成环境模式** **`create-react-app`** 脚手架
- Create React App 是一个使用 Node.js 编写的命令行工具，通过它可以帮助我们快速生成 React.js 项目，并内置了 Babel、Webpack 等工具帮助我们实现 ES6+ 解析、模块化解析打包，也就是通过它，我们可以使用 模块化 以及 ES6+ 等更新的一些特性。同时它还内置 ESLint 语法检测工具、Jest 单元测试工具。还有一个基于 Node.js 的 WebServer 帮助我们更好的在本地预览应用，其实还有更多。这些都通过 Create React App 帮助我们安装并配置好了，**开箱即用**
``` JS
//安装
npm i -g create-react-app
yarn global add create-react-app
create-react-app <项目名称>//进入项目文件
npx create-react-app <项目名称>//或者npx
//运行命令以后，就会在运行命令所在目录下面创建一个以项目名称为名的目录

npm start//启动一个内置的本地 WebServer，根目录映射到 './public' 目录，默认端口：3000
npm test//运行 Jest 测试
npm run build//打包应用（准备上线）
```
****
### **组件**
- 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。
- props 和 state
    - props 父组件传递过来的参数
    - state 组件自身状态
    - setState
    - 多个 setState 合并
- props 与 state 的区别
    - state 的主要作用是用于组件保存、控制、修改*自己*的可变状态，在组件内部进行初始化，也可以在组件内部进行修改，但是组件外部不能修改组件的 state
    - props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件，它是外部传进来的配置参数，组件内部无法控制也无法修改
    - state 和 props 都可以决定组件的外观和显示状态。通常，props 做为不变数据或者初始化数据传递给组件，可变状态使用 state
    - **函数组件**

    ``` JS
    function Welcome(props) {//props代表属
        return <h1>我的名字, {props.name}</h1>;s
    }

    const element = <Welcome name="狗比" />;
    ReactDOM.render(
    element,
    document.querySelector('#root')
    );
    ```
- **Class组件** State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件
    1. 创建一个同名的 ES6 class，并且继承于 React.Component。
    2. 添加一个空的 render() 方法。
    3. 将函数体移动到 render() 方法之中。
    4. 在 render() 方法中使用 this.props 替换 props。
    5. 删除剩余的空函数声明。

    ```js
    //html
    ReactDOM.render(
    <App data={arr} />,
    document.getElementById('root')
    );
    //js 
    import React from "react";//每个组件必须引入此文件
    class App extends React.Component {//必须继承react
        /** constructor(props){
            super(props);
            this.state={//状态
                name:'傻逼',
                age:88
            }
        } 一般直接将state写成静态方法，就不用去super父类了，一样的效果
        **/ 
        state={//状态
                name:'傻逼',
                age:88
            }
        render(){
        let {data} = this.props;//属性。拿到入口传来的数据
        let {name,age}=this.state;
        console.log(this.props);
        return  (<div>
                {data.map(item=><p key={item.id}>这是第{item.name}项</p>)}
        <div>name：{name}<p>age:{age}</p></div>
        </div>)
        }
    }
    export default App;
        /*
        setState() 修改 组件的 state
            1 setState({
                要修改的state
            })
            2 setState(function(){
                return {
                    要修改的state
                }
            })
        state:     
        1. 调用 setState 之后会修改 组件的 state，并且会重新对组件的内容重新渲染 
        2. 同一地方多次调用 setState react 会对 操作进行合并 只渲染一次   
        */
    ```
- react 添加事件 主要两个问题
        1. 事件名称注意大小写
        2. 事件处理函数的this 默认是undefined 
        3. 如果要获取当前元素可以获取 e.target
    ``` JS
    render(){
       let {data} = this.props;//属性
       let {name,age}=this.state;
       console.log(this.props);
       return  (<div>
            {data.map(item=><p key={item.id}>这是第{item.name}项</p>)}
       <div>name：{name}<p>age:{age}</p></div>
       <button
            onClick={(e)=>{
                    this.setState(function(){
                        return {
                            age: ++age
                        }
                    });
                }}
            >又大了一岁</button>
       </div>)
    }
    ```
- `React` 组件间通信
- 在 `React.js` 中，数据是从上自下流动（传递）的，也就是一个父组件可以把它的 state / props 通过 props 传递给它的子组件，但是子组件不能修改 props - React.js 是单向数据流，如果子组件需要修改父组件状态（数据），是通过回调函数方式来完成的。
- 父级向子级通信
    把数据添加子组件的属性中，然后子组件中从props属性中，获取父级传递过来的数据
- 子级向父级通信
    在父级中定义相关的数据操作方法(或其他回调), 把该方法传递给子级，在子级中调用该方法父级传递消息

- 跨组件通信 - `context`
- `React.createContext(defaultValue)`;
- `Context.Provider` 在父组件调用 Provider 传递数据
  
    - `value` 要传递的数据
- 接收数据
    - class.contextType = Context;
    - static contextType = Context;
    - Context.Consumer
    
- 生命周期：http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
    - 挂载阶段
    - `constructor`
    - `static getDerivedStateFromProps(props, state) `
      - **注意 this 问题**
    - `render`
    - `componentDidMount`
- 更新阶段
    - 父组件更新引起组件更新
      - 1.`static getDerivedStateFromProps(props, state)`//挂载时
      - 2.`shouldComponentUpdate()`
      - 3.`componentWillUpdate()`
      - 4.`render()`
      - 5.`getSnapshotBeforeUpdate()`
      - 6.`componentDidUpdate()`能获取上一次操作的数据
    - 组件自身更新
      - 1.`shouldComponentUpdate()`
      - 2.`componentWillUpdate()`
      - 3.`render()`
      - 4.`getSnapshotBeforeUpdate() `
      - 5.`componentDidUpdate()`
- 卸载阶段
  
  - `componentWillUnmount`
  
- `PureComponent` 
    - `PureComponent` 提供了一个具有浅比较的 shouldComponentUpdate 方法,其他和 Component 完全一直
    ``` JS
    //传递组件和参数
    class Btn extends PureComponent {
        render(){
            return <button onClick={()=>{
                this.props.hide();
            }}>关闭</button>
        }
    }

    class App extends PureComponent {
        render(){
            return <div>
                {/* <Alert
                    title="123"
                >
                    <Btn />可以直接传如组件
                </Alert> */}
                {/* <Alert  title="123" Child={Btn} />这样也可以直接传入组件 */}
                <Alert  title="123" cb={(props)=>{//推荐使用函数传参的方式传入一个组件，然后返回该组件，注意收参问题
                    return <Btn {...props} />
                }} />
            </div>
        }
    }

    //接受参数：
    class Alert extends PureComponent {
        state = {
            show: true
        }
        hide=()=>{
            this.setState({
                show: false
            })
        }
        render(){
            let {show} = this.state;
            //let {title,children,Child} = this.props;
            //console.log(Child);
            let {title,cb} = this.props;
            return <div id="alert" style={{
                display: show?"block":"none"
            }}>
                <header className="alert-header">{title}</header>
                {/* children */}//第一种方式接惨
                {/* <Child  hide={this.hide} /> */}第二种方式接惨
                {cb({hide:this.hide})}第三种方式接惨
            </div>
        }
    }
    ```
    
- `dangerouslySetInnerHTML`
    - `dangerouslySetInnerHTML` 在 react 元素内写入 innerHTML
    ``` JS
    //模拟后台拿到的是这种字符串数据
    let inner = `
        <section>
            <header><h1>这是文章标题</h1></header>
            <p>文章内容</p>
            <p>文章内容</p>
            <p>文章内容</p>
            <p>文章内容</p>
        </section>
    `;
    class App extends PureComponent {
        render(){
            return <div
                dangerouslySetInnerHTML={{
                    __html:inner//这里面的字符串就可以原样输出了
                }}
            ></div>
        }
    }
    ```
### ref
- 旧版 - string ref
- 主流 - createRef()
    ``` JS
    import React,{CreateRef} from 'react'
    state={
        ref:createRef()
    }
    this.state.ref.current//获取dom
    // JavaScript
    ```
- **注意：在 组件挂载完成之后及更新之后使用**
### React hooks(钩子)
- React hooks 是React 16.8中的新增功能。它们使您无需编写类即可使用状态和其他React功能，参考：https://reactjs.org/docs/hooks-intro.html
- 函数式组件，本质就是一个常规函数，接收一个参数 `props` 并返回一个 `reactElement`
- 函数式组件中没有**this**和生命周期函数,不能使用 **string** **ref**
- 使用函数式组件时，应该尽量减少在函数中声明子函数，否则，组件每次更新时都会重新创建这个函数
- 常用 `hook`
   - `useState`  
       ``` JS
       import React,{useState} from 'react';
       /*
       useState 状态
           [state,setState] = useState(initState)
               state 当前对应的状态
               setState 修改 state 的方法
       */
       ```
   - `useEffect`相当于类组件的 `componentDidMount、componentDidUpdate` 和 `componentWillUnmount`
   ``` JS
   // 1.useEffect如果要在卸载后执行某个方法：
    useEffect(()=>
        return()=>{
            这里将会执行卸载组件后的方法
        }
    )
   
    //2. 不具体监听某一个值，就代表组件将在挂载的时候执行这里面的方法
    useEffect(()=>
       
    },[])
   
    //3.监听具体的值就代表只有该值更新的时候触发
    import React,{useState,useEffect} from 'react';
    useEffect(cb[,[依赖1,依赖2]]);
    useEffect相当于一个监听事件
    useEffect(()=>{
        console.log(更新了)
    },['监听的哪一个具体的值'])
   
    // 自定义hook
    function useToggle(init){
        const [off,setOff] = useState(init);
        return [off,()=>{
        setOff(!off);
        }];
    }
    const [show,changeShow] = useToggle(true);//定义
    <button onClick={()=>{
          changeShow();
        }}>{show?"卸载":"加载"}</button>//使用
   ```
    - `useRef`
    ``` JS
    import React,{useState,useEffect,useRef} from 'react';
        /* useRef(defaultVal);  */
        //1. 获取真实的DOM
        const div = useRef(null);
        useEffect(()=>{
            console.log(div.current);//在组件更新后获取dom
        });
        <div ref={div}>123</div>
   
        //2. 记录组件更新之前的值
        const odlData = useRef({
            age:20,
            name:'sb'
        })
        useEffect((=>{
            console.log(odlData.current,newData)//获取更新前和更新后的数据
        }))
   
    ```

    - 扩展 `useMemo`在组件加载之前使用。`useCallback`该回调函数只在某一个依赖项改变的时候才会生效

      ```js
      useMemo(()=>{},[依赖项])
      useCallba(()=>{},[依赖项])
      ```
-  Hook 使用规则
    - 只在 React 函数中调用 Hook
        - React 函数组件中
        - React Hook 中
        - 只在最顶层使用 Hook 

### 路由
- SPA:Single Page Application : 单页面应用，整个应用只加载一个页面（入口页面），后续在与用户的交互过程中，通过 DOM 操作在这个单页上动态生成结构和内容
- 目前前端路由主要的模式：
    - 基于 URL Hash 的路由
    - 基于 HTML5 History API 的路由  https://developer.mozilla.org/zh-CN/docs/Web/API/History_API
- **`React Router`**  https://reacttraining.com/react-router/
``` JS
npm i -S react-router-dom//安装到当前目录
react-router-dom 的核心是组件，它提供了一系列的组件，如：
- Router 组件
    - BrowserRouter 组件
    - HashRouter 组件
- Route 组件
- Link 组件 
- NavLink 组件
- Switch 组件
- Redirect 组件

import React from 'react';
import {BrowserRouter,HashRouter,Link,Route} from "react-router-dom";
 /*
    BrowserRouter HTML5 History API 的路由
     / 首页
     /about 关于我们
     /join 加入我们
    HashRouter  Hash 的路由
     #/ 首页
     #/about 关于我们
     #/join 加入我们
  */
<BrowserRouter>
      <div className="App">
          <nav>
          //Link to 属性类似 a 标签中的 href
              <Link to="/">首页</Link>
              <span> | </span>
              <Link to="/about">关于我们</Link>
              <span> | </span>
              <Link to="/join">加入我们</Link>
              <span> | </span>
              <Link to="/join/detail">加入我们的详情</Link>
          </nav>
          <div>
              {/* 
                注意：只定义path 它的匹配规则就是判断 现在的 url 中是否包含了 path 中的定义的路径
                exact 精确匹配
                这几个都可以来渲染方法,他们的优先级依次为：children={()=>}>component={()=>}render={()=>}
                component和render只有当location匹配的时候才会渲染，children反之
                component：要显示的组件
                }
                route 的 render 属性:
                    1. 如果我们想给路由里的组件进行传参那就需要调用组件的 render 方法
                    2. render 方法接收的参数是一个函数，在函数必须有一个返回值，返回值是要我们要渲染的对应组件
                */
              <Route path="/" exact component={Index} />
              <Route path="/join" component={JoinUs} />
              <Route path="/about" exact render={(props)=>{
                return <About {...props} user={user} /> //把父组件的props传给子组件
                }} />
              <Route path="/join/detail" component={JoinDetail} />
          </div>
      </div>
</BrowserRouter>

//Route通常我们会建一个路由组件来单独处理路由
let routeList = [
    {
      title: "首页",
      path: "/",
      exact: true,
      isNav: true,
      render:(props)=>{
        return <Index {...props} />
      } 
    },{
      title: "关于我们",
      path: "/about",
      isNav: true,
      exact: true,
      render:(props)=>{
        return <About {...props} />
      } 
    }
  ];
```
- Switch 组件：
    ``` JS
    // Switch： 包在 Switch  Route 会一项一项去匹配，匹配成功一项之后，就不在匹配其他内容
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/about" exact  component={About}/>
              <Route path="/about/details" component={AboutDetails} />
              <Route path="/join" component={Join} />
              <Route component={View404} />
            </Switch>
    ```
- NavLink 组件：比Link组件要强
``` JS
            <nav className="nav">
              {
                router.filter(item=>item.isNav).map((item,index)=>{
                    return (<NavLink 
                              to={item.isDynamic?item.to:item.path} //(isDynamic自定义的动态路由)如果添加了动态路由的话，在做页面跳转的时候要加一个判断，否则react会把动态路由当作普通的路由来解析)
                              key={index}
                              exact={item.exact}//是否精确匹配路由
                              activeClassName="hover"//定义每个被选中状态的类名
                              activeStyle={{//设置行内样式
                                lineHeight: "30px"
                              }}
                            >{item.title}
                            </NavLink>)
                })
              }
              <div>
          </nav>
```
### 重定向路由
``` JS
//第一种
const [name,setName] = useState("");
const {setUser,history} = props;
  useMemo(()=>{
    if(user){
        history.push("/");
        // 在 js 中去做跳转
        // history.push(跳转路径[, state]);
    }
  },[]);

  //第二种 在路由表中的render方法中做重定向
  Redirect 组件
  {
      title: "登录",
      path: "/login",
      isNav: true,
      exact: false,
      render:(props)=>{
        //console.log(props.user);  
        if(props.user){
            return <Redirect to="/" /> //to要重定向的地址
        }
        return <Login {...props} />
      } 
    }
```
- 动态路由：
``` JS
// 动态路由就在要跳转path后面跟(/:参数)
{
      title: "班级",
      path: "/class/:page",
      isDynamic: true,
      to: "/class/1",
      isNav: true,
      exact: false,
      render:(props)=>{
        return <Class {...props} />
      }
    }
```
- 几个常用的路由hooks
    - useHistory 
        ```js
        //获取全部的路由信息
        length: 50, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
        action: "POP"
        block: ƒ block(prompt)
        createHref: ƒ createHref(location)
        go: ƒ go(n)
        goBack: ƒ goBack()
        goForward: ƒ goForward()
        length: 50
        listen: ƒ listen(listener)
        location: {pathname: "/", search: "", hash: "", state:undefined, key: "7u36h1"}
        push: ƒ push(path, state)
        replace: ƒ replace(path, state)
        __proto__: Object
        ```
    - useLocation
    	```js
    	location: {pathname: "/", search: "", hash: "", state: undefined, key: "7u36h1"}//只能获取单独的location
    	```
    - useParams
    
    - useRouteMatch
### 高阶组件(传入一个组件会返回一个新的组件)
- withRouter 组件
    - 如果一个组件不是路由绑定组件，那么该组件的 props 中是没有路由相关对象的，虽然我们可以通过传参的方式传入，但是如果结构复杂，这样做会特别的繁琐。幸好，我们可以通过 withRouter 方法来注入路由对象
    ``` JS
    import {withRouter} from "react-router-dom";
    let List2 = withRouter(List); 
    //简单实现
    function withRouter(组件) {
        return (props)=>{
            //在加一些其他的东西
            return 组件{...组件}
        }
    }
    // react 高阶组件 传入一个组件返回一个新组件
    ```
    
### `React` redux;React 本身 MVVM 渐进式框架(M(model 数据模型) - V(view 视图) - VM(虚拟模型))
- `npm i redux`
- `Redux` 是一个独立的 JavaScript 状态管理库，与非 `React` 内容之一 ; https://www.redux.org.cn/
- **`redux` 三大原则**
    - 单一数据源: 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
    - State 是只读的: 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
    - 使用纯函数来执行修改

    - createStore(reducer, [preloadedState], enhancer); 
        - reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
        - [preloadedState] (any): 初始时的 state。 在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 combineReducers 创建 - reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 reducer 可理解的内容。
        - enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。
        - 返回值 (Store): 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UI。
        ``` JS
        - getState() // 获取当前 store 存储 state
        - dispatch(action) // 修改 state
        - subscribe(listener) // 监听 state 发生修改
        - replaceReducer(nextReducer) // 替换掉原来的 reducer
        import {createStore} from "redux";
        function reducer(state={
            nub:1,
            name: "123"
        },action){
            switch(action.type){
                case "EDIT"://定义修改的type这里尽量用大写
                    return {
                        ...state,//为了只修改想要修改的状态，不破坏原来其他的数据，这里必须把原来的数据展开回去
                        nub: state.nub + 1
                    }
            }
            return state;
        }
        let store = createStore(reducer);//创建一个仓库来修改状态
        // console.log(store);
        store.subscribe(()=>{
            console.log("发生修改了",store.getState());
        });
        setInterval(()=>{
            store.dispatch({
                type:"EDIT"
            });// 默认情况下 dispatch 是一个同步操作
            // console.log(store.getState());
        },1000);
        ```
- `Redux` 核心几个概念与它们之间的关系
    - `state` 状态(只读,不推荐直接修改 state 中的原数据)
    - `reducer` 纯函数
        ``` JS
        1. 相同的输入永远返回相同的输出
        2. 不修改函数的输入值
        3. 不依赖外部环境状态
        4. 无任何副作用
        function reducer(state={
            num:1//随便一个什么状态
        },action) {
            return state//返回该状态
        }
        ```
    - `store` 状态仓库Store 对象，为了对 state，Reducer，action 进行统一管理和维护，我们需要创建一个 Store 对象    
    - `action` 修改状态
### Redux结合React--->react-redux
- `npm i react-redux -S`
``` JS
// 1.在入口分别引入
import store from "./reducer/index";
import {Provider} from "react-redux";//Provider传递redux
ReactDOM.render(
     <Provider store={store}>//{store}要传递的redux状态仓库 
        <App />
     </Provider>, 
    document.getElementById('root')
);

//创建的状态仓库
import {createStore} from "redux";
//Provider 这个东西会一直向下转递 如果在下面的函数组将想要拿到数据 那么就只需要是connect（回调两个参数分别是 纯函数传递的数据 ，父组件传递的数据）（需要拿到数据的函数组件)

```
- `react-redux`的hook
``` JS
- useSelector(fn)//按需获取仓库里面的数据
const list = useSelector(state=>state.list);

- useDispatch()//获取Dispatch方法
            dispatch({
                type: "ADD",
              });
- useStore()//返回一个store对象
```
- 拆分`reducer`
``` JS
import {combineReducers} from "redux";//combineReducers合并reducer
/*
    原始: reducer
    function reducer(state={
        list: {
            tab: "all",
            page: 1,
            data: []
        },
        article: {
            detail: {},
            message:[]
        }
    },action){
        switch(action.type){

        }
        return state;
    }
*/
// 拆分

// 负责处理 list 的数据
function list(list={ 
    tab: "all",
    page: 1,
    data: []
},action){
    return list;
}

// 负责处理 article 的数据
function article(article={ 
    detail: {},
    message:[]
},action){
    return article;
}
const reducer = combineReducers({//合并两个reducer
    list,
    article
});
export default reducer;
```
- Redux中间件原理
``` JS
修改dispatch来达到异步处理
let dispatch=useDispatch()//获取Dispatch方法
let prevDispatch = dispatch;//保存原来的dispatch方法
dispatch=(action)=>{
    //1.直接修改reducer  判断action传入的是一个对象还是一个方法
    if(typeof aciton =='object'){
        prevDispatch(action)//如果是对象，就直接执行原来的方法

    }else{
        //2.如果传入的是方法，就执行修改过后的方法。异步等等
        action(dispatch)
    }

   useEffect(()=>{
    修改dispatch来达到异步处理
    //   dispatch(function(dispatch){
    //     setTimeout(()=>{
    //         dispatch({type:"ADD"});
    //       },2000);
    //   })
      
    dispatch((dispatch)=>{
          setTimeout(()=>{
            dispatch({type:"ADD"});
          },2000);
      });
  },[]);
}
```
- Redux-thunk中间件
``` JS
必须按照此格式引入
import {createStore,applyMiddleware} from "redux";//applyMiddleware引入中间件的方法
import reducer from "./reducer";//引入自定义的状态组件。
import thunk from "redux-thunk";//引入中间件的模块
const store = createStore(reducer,applyMiddleware(thunk));
export default store;

//用法：
const dispatch = useDispatch();
  useEffect(()=>{
    // dispatch({
    //   type: "ADD"
    // });
    dispatch(function(dispatch,getState){
          // setTimeout(()=>{
          //   dispatch({type: "ADD"});
          // },2000);
          Axios.get(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${tab}&limit=${limit}`).then((res)=>{
              //console.log(res.data);
              dispatch({
                type: "ADD",
                data: res.data.data
              });
          });
    });
  },[]);
```

### antd组件的使用
- `yarn add antd`   `npm i antd`
- **高级配置**：(按需加载 antd 的样式)react-app-rewired (一个对 create-react-app 进行自定义配置的社区解决方案)
- 1.安装 `yarn add react-app-rewired customize-cra`
    - 修改 package.json
    ``` JS
    /* package.json */
        "scripts": {
        "start": "react-scripts start",
        "start": "react-app-rewired start",
        "build": "react-scripts build",
        "build": "react-app-rewired build",
        "test": "react-scripts test",
        "test": "react-app-rewired test",
        }
    ```
- 2.安装 babel-plugin-import
 `yarn add babel-plugin-import`
- 3.新建 config-overrides.js 文件 (用来修改 默认的配置)
``` JS
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    return config;
    };
```
- 4.修改 config-overrides.js 的配置
``` JS
   ` + const { override, fixBabelImports } = require('customize-cra');
    - module.exports = function override(config, env) {
    -   // do stuff with the webpack config...
    -   return config;
    - };
    + module.exports = override(
    +   fixBabelImports('import', {
    +     libraryName: 'antd',
    +     libraryDirectory: 'es',
    +     style: 'css',
    +   }),
    + );`
```
### 定制主题
- 添加 less-loader
`yarn add less less-loader`
- 配置 config-overrides.js
``` JS
  - const { override, fixBabelImports } = require('customize-cra');
    + const { override, fixBabelImports, addLessLoader } = require('customize-cra');
    module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
    -   style: 'css',
    +   style: true,
    }),
    + addLessLoader({
    +   javascriptEnabled: true,
    +   modifyVars: { '@primary-color': '#1DA57A' },
    + }),
    );
```