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