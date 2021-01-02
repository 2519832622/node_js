### vue学习笔记

******************************************

### 指令

-  插值表达式 {{变量}} 有延迟 网速慢的时候会显示插值表达式子

- **v-text **在标签中使用 会填充整个innerhtml

- **v-clock**  不会有延迟 会等数据加载之后渲染到dom

  - 需要配合css使用,会自动检测dom渲染出来没有

    ```vue
    <style>
    [v-cloak] {
      display: none;
    }
    </style>
    ```

- **v-html **为了防止xss攻击 默认不会作为html输出解析 通过这个指令可以将html字符串转换成html结构渲染到页面

- **once**
  
  - 只渲染元素和组件一次，后期的更新不再渲染
- **pre**
  
  - 忽略这个元素和它子元素内容的编译

****

###  逻辑处理

-  **v-show**
  - 根据表达式的值（布尔值），切换元素的显示与隐藏（display 属性）
  - *> 适用于状态切换比较频繁的情况*

- **v-if**
  - 根据表达式的值（布尔值），创建或销毁元素适用于状态切换不频繁的情况*

- **v-else / v-else-if**
  - 与 `v-else` 配合

****

### 循环与列表

- **v-for**

  - 根据数据循环渲染 `v-for` 指令所在的元素及其子元素

  - 可以循环的数据：**Array | Object | number | string | Iterable (2.6 新增)**

    > **<u>v-for</u> 中也可以使用<u>of</u> 语法，在<u>vue</u> 中两者没有什么区别**

- **key**
  
  - 默认情况下，在渲染 `DOM` 过程中使用 <u>原地复用</u> ，这样一般情况下会比较高效，但是对于循环列表，特别是依赖某种状态的列表，会有一些问题，我们可以通过 `:key` 属性，来给每个循环节点添加一个标识

****

### 属性绑定

- **v-bind**
  - 绑定数据（表达式）到指定的属性上，**`<div v-bind:参数="值/表达式"></div>`**，这里的参数就是指定的属性名称
  - 缩写:
    - 有的一些常用指令会有对应的缩写，`v-bind` 对应的缩写为：`:`
  - 样式：
    - 针对样式属性，`v-bind` 值有一些特殊的写法

****

###  单向数据流

- 通过上面的知识点和案例，我们可以看到，当数据更新的时候，页面视图就会更新，但是页面视图中绑定的元素更新的时候，对应的数据是不会更新的

```js
<input type="text" :value="title" />
/*
- 我们称为：
	- 单向数据流 数据 -> 视图
在 vue中，还有一种双向数据流绑定的方式
- v-model
	<input type="text" v-model="title" />
- 数据 `title` 更新，视图中 `input` 的 `value` 就会更新。同时，当 input中的 `value` 更新的时候，数据 `title` 也会更新，这就是我们说的 数据双向绑定 [与 React 中的受控组件类似]
*/
***********************************************************************************************************

/*表单:
    - 针对一般元素，比如 div,span,p,img< 等，采用的是单向绑定：v-bind，只需要把数据绑定到视图中就可以，但是对于表单这种交互性比较强的元素或组件，我们一般可能需求双向绑定，即：用户对视图元素的操作同时更新数据
    - v-model在内部为不同的输入元素使用不同的属性和事件来处理数据
    - text 和 textarea
    - checkbox 和 radio
    - select
*/
***********************************************************************************************************
/*
- `text` 和 `textarea`
- `text` 和 `textarea` 元素使用 `value` 属性和 `input` 事件
*/
<div id="app">
     <input type="text" v-model="v1" />
     <textarea v-model="v2" cols="30" rows="10"></textarea>
</div>
let app = new Vue({
 el: '#app',
 data: {
      v1: 'aaa',
      v2: 'bbb'
 }
});
***********************************************************************************************************

/*
- `checkbox` 和 `radio`**
- `checkbox` 和 `radio` 使用 `checked` 属性和 `change` 事件*/

//单选框绑定一个值
<div id="app">
     <input type="radio" v-model="v3" value="男" /> 男
     <input type="radio" v-model="v3" value="女" /> 女
</div>
let app = new Vue({
 el: '#app',
 data: {
  	v3: '女',
 }
});

//多选框绑定到一个布尔值或数组
<div id="app">
	 <input type="checkbox" v-model="v4" /> 同意
 <hr/>
     <input type="checkbox" v-model="v5" value="足球" /> 足球
     <input type="checkbox" v-model="v5" value="音乐" /> 音乐
</div>
let app = new Vue({
 el: '#app',
 data: {
  v4: true,
  v5: ['足球', '音乐']
 }
});
***********************************************************************************************************

/*
- `select` 字段将 `value` 作为 `prop` 并将 `change` 作为事件*/
//单选绑定到值，多选绑定到数组
<div id="app">
 	<select v-model="v3">
      <option value="男">男</option>
      <option value="女">女</option>
 </select>
 <select v-model="v5" multiple>
      <option value="足球">足球</option>
      <option value="音乐">音乐</option>
 </select>
</div>
```

***********

### 指令修饰符

- 一个指令可以包含的内容包括：
  - 指令名称
  - 指令值
  - 指令参数
  - 指令修饰符

  **`<组件 指令:参数.修饰符1.修饰符2="值" />`**

* **.number**:输入字符串转为有效的数字

- **.trim**输入首尾空格过滤
- **.lazy**:取代 `input` 监听 `change` 事件



****

### 自定义指令和指令的生命周期

```js
/**
         * 全局指令 directive
         *  在整个应用中都可以使用的
         *  名称：
         *      在注册的时候，是不需要使用 v- 前缀的
         *      在使用的时候，需要加上 v- 前缀
         *  指令配置：
         *      生命周期，钩子函数，vue 提供了一系列的钩子函数，不同的函数会在指令不同的阶段执行，从而影响使用该指令的元素
         */
	<div id="app">
        <h1>{{title}}</h1>
        <hr>
        <div v-test>自定义指令</div>
    </div>
/*`Vue.directive('指令名称', {指令配置});全局指令*/
        Vue.directive('test', {
            bind(el, binding) {
                //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
                // el: 该指令所在当前元素
                // binding: 指令的配置细节，参数、修饰符、值等信息
                console.log('bind', el, binding);
            },
            inserted() {
                //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
                console.log('inserted');
            },
            update() {
                //所在组件更新的时候调用
                console.log('update');
            },
            componentUpdated() {
                //所在组件更新完成后调用
                console.log('componentUpdated');
            },
            unbind() {
                //只调用一次，指令与元素解绑时调用
                console.log('unbind');
            }
        });
        new Vue({
            el: '#app',
            data: {
                title: '指令'
            }，
            directives: {
                '指令名称': {指令配置}//局部指令
              }
        });
```

### 案例：自定义拖拽指令

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .box {
            position: absolute;
            left: 100px;
            top: 100px;
            width: 100px;
            height: 100px;
            background: red;
        }
    </style>
</head>
<body>
    <div id="app">
        <button @click="canDrag = !canDrag">Drag : {{canDrag}}</button>
        <div class="box" v-drag.limit="canDrag"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.directive('drag', {
            bind(el, {modifiers,value}) {
                let isDragStart = false;
                let disX = 0;
                let disY = 0;
                el.canDrag = value;
                el.addEventListener('mousedown', e => {
                    if (!el.canDrag) return;
                    disX = e.clientX - el.offsetLeft;
                    disY = e.clientY - el.offsetTop;
                    isDragStart = true;
                    e.preventDefault();
                });
                document.addEventListener('mousemove', e => {
                    if (isDragStart) {
                        let x = e.clientX - disX;
                        let y = e.clientY - disY;
                        if (modifiers.limit) {
                            if (x < 0) {
                                x = 0;
                            }
                            if (y < 0) {
                                y = 0;
                            }
                        }
                        el.style.left = x + 'px';
                        el.style.top = y + 'px';
                    }
                });
                document.addEventListener('mouseup', e => {
                    isDragStart = false;
                });
            },
            componentUpdated(el, {value}) {
                console.log('componentUpdated', value);
                el.canDrag = value;
            }
        });
        let app = new Vue({
            el: '#app',
            data: {
                canDrag: false
            }
        });
    </script>
</body>
</html>
```

****

### 事件

- **在 `vue` 中，事件通过指令 `v-on` 进行绑定，`v-on` 缩写 `@`** 

  ```html
  <组件 v-on:事件名称="表达式" />
  <组件 @事件名称="表达式" />
  ```

- **组件的 `methods` 选项**

  - 用来存放组件中使用的函数方法，且存放在 `methods` 中的函数方法可以通过组件实例（this）进行访问

```js
//通过内联方式绑定事件处理函数
<组件 @事件名称="fn" />
<script>
new Vue({
  ...,
  methods: {
  	fn() {
  		//...	
		}
	}
})
****************************************************************************************************************
/*    
- 事件绑定函数中的 `this` 指向组件实例
- 事件绑定函数中的第一个参数默认为 `$event` 对象
*/
<组件 @事件名称="fn('kaikeba', $event)" />
<script>
new Vue({
  ...,
  methods: {
  	fn(name, ev) {
  		//...	
		}
	}
})
/*
- 也可以在事件绑定中直接调用函数（并不会立即执行，也是通过事件触发执行的）
- 事件对象需要手动传入，名称为 `$event`*/
```

- **事件修饰符**

  - 在事件函数中，我们可以通过 `ev.preventDefault()`、`ev.stopPropagation()` 来阻止默认行为，阻止冒泡，但是中 <u>vue</u> 中提供一些更加方便的方式来处理这些问题，这就是事件修饰符

  ```js
  - .stop
  - .prevent
  - .capture
  - .self
  - .once
  - .passive
  ```

- **按键修饰符**

  - **.keyCode**

  ```js
  <组件 @keyup.13="fn" />
  - .enter
  - .down
  - .exact
  ```

  

### **computed**

- 在实际的应用中，我们会有一些原始数据，同时在应用中又会有一些数据是根据某些原始数据派生出来的，针对这样的一种情况，`vue` 定义了一个专门用来处理这种派生数据的选项：`computed`

```js
//html
<div id="app">
  <label><input type="radio" v-model="gender" value="" /> 所有</label>
  <label><input type="radio" v-model="gender" value="男" /> 男</label>
  <label><input type="radio" v-model="gender" value="女" /> 女</label>
  <hr>
  <ul>
    <li v-for="user of showUsers">
      {{user.username}}
    </li>
  </ul>  
</div>

//js
let app = new Vue({
  el: '#app',
  data: {
    gender: '',
    users: [
      {id: 1, username: 'baogege', gender: '男'},
      {id: 2, username: 'mt', gender: '男'},
      {id: 3, username: 'haigege', gender: '男'},
      {id: 4, username: 'zMouse', gender: '男'},
      {id: 5, username: 'reci', gender: '女'},
      {id: 6, username: 'lisi', gender: '女'}
    ]
  },
  computed: {
    showUsers() {
      return this.gender === '' ? [...this.users] : this.users.filter(user=>user.gender===this.gender);
    }
  }
});

```

- 计算属性类似 `get` 和 `set` ，当访问某个计算属性的时候，就会调用 `computed` 中同名的函数，函数的返回值将作为该计算属性的值

- 计算属性的值依赖计算函数中依赖的其它响应式数据

- 计算属性的值可以缓存，如果依赖的其它响应式数据没有发生变化，但多次访问该计算属性，得到结果是最近一次变化产生的值（相对于调用方法得到结果在某些时候性能要好一些）

  ```js
  //默认情况下
  computed: {
    now() {
      return Date.now();
    }
    // 等于
    now: {
      get() {
        return Date.now();
      }
    }
  }
  
  **************************************************************************************************
  //- 但是有的时候，这种派生数据既有 `get` 需求，也有 `set` 需求
  <div id="app">
    <label><input type="radio" v-model="gender" value="" /> 所有</label>
    <label><input type="radio" v-model="gender" value="男" /> 男</label>
    <label><input type="radio" v-model="gender" value="女" /> 女</label>
    <hr>
    <ul>
      <li v-for="user of showUsers">
        <input type="checkbox" v-model="user.checked" />
        {{user.username}}
      </li>
    </ul>
    <label><input type="checkbox" v-model="checkAll">全选</label>
  </div>
  
  let app = new Vue({
    el: '#app',
    data: {
      gender: '',
      users: [
        {id: 1, username: 'baogege', gender: '男',checked:false},
        {id: 2, username: 'mt', gender: '男',checked:false},
        {id: 3, username: 'haigege', gender: '男',checked:false},
        {id: 4, username: 'zMouse', gender: '男',checked:false},
        {id: 5, username: 'reci', gender: '女',checked:false},
        {id: 6, username: 'lisi', gender: '女',checked:false}
      ]
    },
    computed: {
      showUsers() {
        return this.gender === '' ? [...this.users] : this.users.filter(user=>user.gender===this.gender);
      },
      checkAll: {
        get() {
          return this.users.every(user=>user.checked);
        },
        set(newValue) {
          this.users = this.users.map(user=>{
            return {
              ...user,
              checked: newValue
            }
          });
        }
      }
    }
  });
  ```

- **watch**

  - 我们需要的派生数据是通过异步的方式处理的，这个时候，计算属性就不太好用了（不能处理异步）。

  ```js
  <div id="app">
    <input type="text" v-model="keyWord">
    <hr>
    <ul>
      <li v-for="user of showUsers">
        {{user.username}}
      </li>
    </ul>
  </div>
  
  let app = new Vue({
    el: '#app',
    data: {
      keyWord: '',
      users: [
        {id: 1, username: 'baogege', gender: '男',checked:false},
        {id: 2, username: 'mt', gender: '男',checked:false},
        {id: 3, username: 'haigege', gender: '男',checked:false},
        {id: 4, username: 'zMouse', gender: '男',checked:false},
        {id: 5, username: 'reci', gender: '女',checked:false},
        {id: 6, username: 'lisi', gender: '女',checked:false}
      ],
      showUsers: []
    },
    watch: {
      keyWord(newVal, oldVal) {
        // 模拟网络请求
        setTimeout(_=>{
          this.showUsers = this.users.filter(user=>user.username.includes(newVal));
        }, 1000);
      }
    }
  });
  *********************************************************************************************************************
  //- 多层监听
  watch: {
    'a.b.c': function() {
      //...
    }
  }
  *********************************************************************************************************************
  //- 默认情况下，`watch` 只对当前指定的值进行一层监听，如果需要对对象进行深度监听
  watch: {
    a: {
      handler() {
        console.log('a deep');
      },
      deep: true
    }
  }
  ```

  ****

### 组件

- **Vue.component()**在 `vue` 中，我们可以通过 `new Vue` 来创建一个组件，不过通常它是作为整个应用的顶层根组件存在的，我们还可以通过另外的方式来注册一个更为通用的组件**Vue.component('组件名称', {组件选项})**
  -  组件名称遵循自定义组件命名规范：全小写、连字符（虽然驼峰式一般也没问题）
  -  组件选项与 `new Vue` 选项配置基本一致（也有一些细节的不同）

- 局部组件`components`:组件内部通过 `components` 选项注册的组件是局部组件，只能在当前 `components` 选项所在的组件内部使用

  ```js
  new Vue({
    ...,
    components: {
    	'组件名称': {组件选项}	
  	}
  })
  ```

  

```js
/*data*/
	- 在非 `new Vue` 的组件中，`data` 必须为函数，函数返回值必须是一个对象，作为组件的最终 `data`
/*props*/
	-组件中内部私有数据存储中组件 `data` 中，通过外部传入的数据，则通过 `props<` 选项接收
**************************************************************************************************************
     <div id="app">
            <kkb-circle :r="n1"></kkb-circle>
            <hr />
            <kkb-circle :r="n2"></kkb-circle>
     </div>
 		let app = new Vue({
            el: '#app',
            data: {
                n1: 10,
                n2: 100
            },
            components: {//局部组件
                'kkb-circle': {
                    props: ['r'],//props接受传递的参数
                    data() {//这里必须返回 一个对象
                        return {pi: 3.14}
                    },
                    template: `<div>r: {{r}} -> {{pi * r * r}}</div>`//模板最终会解析在组件调用的地方
                }
            }
        });
/*
    - 如果传入的 `props` 值为一个表达式，则必须使用 `v-bind`或者：
    - 组件中的 `data` 和 `props` 数据都可以通过组件实例进行直接访问
    - `data` 中的 `key` 与 `props` 中的 `key` 不能冲突
*/
```



- **组件通信**

> ***注意：不要修改* `props` *传入的数据***
>
> **父组件通过 `props` 传入数据到子组件内部，但是子组件内部不要修改外部传入的 `props`，`vue` 提供了一种事件机制通知父级更新，父级中使用子组件的时候监听对应的事件绑定对应的处理函数即可**

```html
    <div id="app">
        <p>父组件：{{quantity}}</p>
        <kkb-child :quantity="initQuantity" @increment="appIncrement"></kkb-child>
        <kkb-child :quantity="initQuantity" @increment="appIncrement"></kkb-child>
    </div>
```

```js
		const child = {//定义子组件
            props: ['quantity'],//接受参数
            data() {//定义该组件内的数据
                return {
                    n: this.quantity
                };
            },
            template: `
                <div>
                    <p>子组件：{{n}}</p>
                    <button @click="increment">按钮</button>
                </div>
            `,//@click="increment"调用在该组件内定义的方法
            methods: {
                increment() {
                    this.n++;
                    this.$emit('increment', this.n);
                    /*
                    - this.$emit('自定义事件名称', 事件数据)
                    - `vue` 为每个组件对象提供了一个内置方法 `$emit` ，它等同于自定义事件中的 `new Event`,`trigger` 等
                    - 事件数据就是中触发事件的同时携带传递的数据 - `event`
                    - 父级在使用该组件的过程中，可以通过 `@事件名称` 来注册绑定事件函数
                    - 事件函数的第一个参数就是事件数据
                    */
                }
            }
        };

        new Vue({
            el: '#app',
            data: {
                quantity: 0,
                initQuantity: 0
            },
            components: {
                'kkb-child': child
            },
            methods: {
                appIncrement(v) {
                    this.quantity++;
                }
            }
        });
```

- **组件双绑的实现**

  - 虽然并不推荐在组件内部修改 `props` ，但是，有的时候确实希望组件内部状态变化的时候改变 `props` ，我们可以通过子组件触发事件，父级监听事件来达到这个目的，不过过程会比较繁琐，`vue` 提供了一些操作来简化这个过程

  - `v-model` 是 `vue` 提供的一个用于实现数据双向绑定的指令，用来简化 `props 到 data`，`data 到 props` 的操作流程

  ```html
      <div id="app">
          <kkb-radio value="javascript" v-model="val"></kkb-radio>
          <kkb-radio value="css" v-model="val"></kkb-radio>
      </div>
  ```

  ```js
  		Vue.component('kkb-radio', {
              props: ['value', 'checkedValue'],
              model: {
                  // 要想实现双绑定的属性，比如 checkedValue
                  prop: 'checkedValue',
                  // 触发 prop 修改的事件
                  event: 'click'
              },
              data() {
                  return {
                  }
              },
              template: `
                  <div
                      :class="{
                          'kkb-radio': true,
                          'checked': value === checkedValue
                      }"
                      @click="check"
                  >
                      {{value}}
                  </div>
              `,
              methods: {
                  check() {
                      // this.checkedValue = this.value
  
                      // 触发一个事件，通过事件去调用父级绑定的函数
                      this.$emit('click', this.value);
                      // 这里click与 model设置的event是一致
                      // 会自动的把 this.value 更新到  model 中 props 指定的 属性上
                  }
              }
          });
          new Vue({
              el: '#app',
              data: {
                  val: 'javascript'
              },
              methods: {
              }
          });
  ```

  - **.sync**___通过 `v-model` 来进行双向绑定，会给状态维护带来一定的问题，因为修改比较隐蔽，同时只能处理一个 `prop` 的绑定，我们还可以通过另外一种方式来达到这个目的

  ```html
      <div id="app">
          <kkb-radio value="javascript" :checked-value.sync="val"></kkb-radio>
          <kkb-radio value="css" :checked-value.sync="val"></kkb-radio>
      </div>
  ```

  ```js
          Vue.component('kkb-radio', {
              props: ['value', 'checkedValue'],
              data() {
                  return {
                  }
              },
              template: `
                  <div
                      :class="{'kkb-radio': true,'checked': value === checkedValue}" @click="check">
                      {{value}}
                  </div>
              `,
              methods: {
                  check() {
                      this.$emit('update:checkedValue', this.value);
                      //这里事件名称要使用 `update` 加上 `prop` 名称 的格式
                  }
              }
          });
  
          new Vue({
              el: '#app',
              data: {
                  val: 'javascript'
              },
              methods: {
              }
          });
  ```

  ****

### **插槽**·slot

- 默认情况下，组件模板解析后会替换整个组件内容，如果我们想在组件引用被包含的内容，可以通过 `vue` 提供的内置组件 `slot` 来获取

```html
<div id="app">
  <kkb-dialog title="标题">
    <p>这是内容</p>
  </kkb-dialog>
</div>
```

```js
const Dialog = {
  props: ['title'],
  template: `
    <div class="dialog">
    	<i class="dialog_close_btn"></i>
    	<div class="dialog_header">
    		<span class="dialog_title">{{title}}</span>
    	</div>
    	<div class="dialog_content">
    		<slot></slot>//默认插槽
    	</div>
    </div>
	`
};

new Vue({
  el: '#app',
  components: {
    'kkb-dialog': Dialog
  }
});
```

- **具名插槽**

```html
<div id="app">
  <kkb-dialog>
    <template v-slot:title>
      <h1>这是标题</h1>
    </template>

    <template v-slot:default>
      <p>这是内容</p>
    </template>
  </kkb-dialog>
</div>
```

```js
//使用内置组件 `template` 与 `v-slot` 指令进行配置，用来命名插槽，在组件模板中，通过 `<slot name="插槽名字">` 来使用
const Dialog = {
  props: ['title'],
  template: `
    <div class="dialog">
    	<i class="dialog_close_btn"></i>
    	<div class="dialog_header">
    		<slot name="title"></slot>//带有名字的插槽
    	</div>
    	<div class="dialog_content">
    		<slot></slot>//默认插槽
    	</div>
    </div>
	`
};

new Vue({
  el: '#app',
  components: {
    'kkb-dialog': Dialog
  }
});
```

- **作用域插槽**
  - 组件内部与组件包含的内容属于不同的作用域（被包含的内容是组件父级下的作用域）

```html
<div id="app">
  <kkb-dialog>
    <template v-slot:title>
      <h1>用户列表 - {{title}}</h1>
    </template>

    <template v-slot:default="data">
      <p>用户的姓名: {{data.user.username}}</p>
    </template>
  </kkb-dialog>
</div>
```

```js
const Dialog = {
  props: ['title'],
  data() {
    return {
      users: [
        {id: 1, username: 'baogege', gender: '男',checked:false},
        {id: 2, username: 'mt', gender: '男',checked:false},
        {id: 3, username: 'haigege', gender: '男',checked:false},
        {id: 4, username: 'zMouse', gender: '男',checked:false},
        {id: 5, username: 'reci', gender: '女',checked:false},
        {id: 6, username: 'lisi', gender: '女',checked:false}
      ]
    }
  },
  template: `
    <div class="dialog">
    	<i class="dialog_close_btn"></i>
    	<div class="dialog_header">
    		<slot name="title"></slot>
    	</div>
    	<div class="dialog_content">
    		<slot v-for="user of users" :user="user"></slot>
    	</div>
    </div>
	`
};

new Vue({
  el: '#app',
  data: {
    title: '这里是标题'
  },
  components: {
    'kkb-dialog': Dialog
  }
});
```

****

###  props 验证

- 组件的 `props` 就是组件的参数，为了确保传入的数据在可控的合理范围内，我们需要对传入的 `props` 的值类型进行必要的验证

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

>- **一个非 `prop` 特性是指传向一个组件，但是该组件并没有相应 `prop` 定义的特性，这些 `props` 会被自动添加到组件的根元素上**
>
>- **默认情况下，非`prop` 特性的属性会覆盖组件根元素上同名的内容，但是针对 `style` 和 `class` 有特殊的处理，它们会合并（同名样式还是会覆盖）**
>
>- **禁用特性继承:如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 `inheritAttrs: false`，我们可以通过组件的 `this.$attrs` 来获取这些属性**
>- **`inheritAttrs: false` *选项\*不会\*影响* `style` *和* `class` *的绑定***



### 生命周期

- 组件生命周期指的是组件从创建到销毁的过程，在这个过程中的一些不同的阶段，`vue` 会调用指定的一些组件方法

  - 基本生命周期函数有下面几个阶段：

    \- 创建阶段

    \- 挂载阶段

    \- 更新阶段

    \- 卸载阶段

  > **每一个阶段都对应着 <u>之前</u> 和 <u>之后</u> 两个函数**

- **创建阶段** 初始化阶段，应用不多

  - **beforeCreate()**

  - **created()**

  > **在实例创建完成后被立即调用，该阶段完成了对 `data` 中的数据的 `observer`，该阶段可以处理一些异步任务**

- **挂载阶段** 在挂载开始之前被调用，应用不多

  - **beforeMount()**
  - **mounted()**

  > **该阶段执行完了模板解析，以及挂载。同时组件根组件元素被赋给了 `$el` 属性，该阶段可以通过 <u>DOM</u> 操作来对组件内部元素进行处理了**

- **更新阶段**

  - **beforeUpdate()**

    > **数据更新时调用，但是还没有对视图进行重新渲染，这个时候，可以获取视图更新之前的状态**

  - **updated()**

    > **由于数据的变更导致的视图重新渲染，可以通过 <u>DOM</u> 操作来获取视图的最新状态**

- **卸载阶段**

  - **beforeDestroy()**  

    > **实例销毁之前调用，移除一些不必要的冗余数据，比如定时器**

  - **destroyed()**   

    > **Vue 实例销毁后调用**

- **捕获组件的错误**

  - **errorCaptured()**

  > **当捕获一个来自子孙组件的错误时被调用，此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。**

****

### **ref 与 $refs**

- 如果我们希望获取组件节点，进行 <u>DOM</u> 相关操作，可以通过 `ref` 和 `$refs` 来完成

> **`ref`给元素或组件添加 `ref` 属性，则该元素或组件实例对象将被添加到当前组件实例对象的 `$refs` 属性下面**
>
> **`$refs`该属性的是一个对象，存储了通过 `ref` 绑定的元素对象或者组件实例对象**

```html
    <div id="app">
        <h1>{{title}}</h1>
        <button @click="getBoxHeight">获取 box 的高度</button>
        <button @click="getKKBComponent">获取自定义组件实例及内部方法</button>
        <hr>
        <div ref="box">
            这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>
        </div>
        <hr>
        <kkb-component ref="kkb" :t="title"></kkb-component>
    </div>
```

```js
        const kkbComponent = {
            props: ['t'],
            data() {
                return {
                    isShow: true
                }
            },
            template: `
                <div v-if="isShow">
                    <h1>kkbComponent - {{t}}</h1>
                </div>
            `,
            methods: {
                hide() {
                    this.isShow = false;
                }
            }
        }
        
        let app = new Vue({
            el: '#app',
            data: {
                title: '这是标题'
            },
            components: {
                'kkb-component': kkbComponent
            },
            mounted() {
                console.log(this.$refs.kkb);
            },
            methods: {
                getBoxHeight() {
                    console.log( this.$refs.box.clientHeight );
                },
                getKKBComponent() {
                    this.$refs.kkb.hide();
                }
            }
        });
```



