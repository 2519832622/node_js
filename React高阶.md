### ⾼阶组件-HOC
- 定义：⾼阶组件是参数为组件，返回值为新组件的函数。
    ``` JS
    // 基本用法
    import React, {Component} from "react";
    // hoc: 是⼀个函数，接收⼀个组件，返回另外⼀个组件，
    const foo = Cmp => props => {//这⾥⼤写开头的Cmp是指function或者class组件
        return (
            <div className="border">
                <Cmp {...props} />
            </div>
            );
    };
    //不是箭头函数
    const foo =(传入的组件)=>{
        return (参数：props)=>{
            return (返回一个新的组件...)
        }
    }
    
    //基本用法
    function Child(props){
        return <div>我是子组件</div>
    }
    const Two =foo(Child)//链式操作，可以无限嵌套组件，返回新的组件；
    class App extends Component {
        render() {
            return (
                <div>
                    <h1>高阶组件的嵌套</h1>
                    <Two/>//调用声明的嵌套组件
                </div>
            )
        }
    }
    /**装饰器写法：
        ⾼阶组件本身是对装饰器模式的应⽤，⾃然可以利⽤ES7中出现的
        装饰器语法来更优雅的书写代码。**/
    npm install -D @babel/plugin-proposal-decorators
    //配置完成后记得重启下
    const { addDecoratorsLegacy } = require("customizecra");
    module.exports = override(
     ...,
     addDecoratorsLegacy()//配置装饰器
    );
    //如果vscode对装饰器有warning，vscode设置⾥加上
    javascript.implicitProjectConfig.experimentalDecorator
    s": true
    
    // !装饰器只能⽤在class上。 执⾏顺序从下往上
    @foo2
    @foo
    @foo
    上面的装上去类似于我们的嵌套，只不过顺序是重下网上执行的
    ```

- **注意点** 不要在 render ⽅法中使⽤ HOC

****

###  **传送门**  可以实现内容传送功能。

```js
import { createPortal } from "react-dom";//引入createPortal传送门
用在return后面
return createRortal(
    ...具体需要传送的组件.比如弹窗组件
)
```

