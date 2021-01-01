# 常用方法
```js
	let winHight = document.documentElement.clientHeight; //文档可视区域的高度
    let offsetHight = document.documentElement.offsetHeight; //自身的高度
    let chaHigth = offsetHight - winHight;
    let scrollTop1 = document.documentElement.scrollTo; //获取滚动的高度
```
-  `Object.keys(obj)`拿到对象里面的每一个属性名
- `new Date().toLocaleTimeString()`//返回本地时间字符串
1. `getComputedStyle('文本节点',null)[要查询样式的名字]`获取css样式
2. `window.requerstAnimationFrame(要执行的函数)`用来执行动画，跟setInterval一样，但是性能更高；
3. `try catch`捕捉并抛出错误，不影响程序执行
    ```js
    let c = 5;
    try{
        console.log(a)
    }catch(err){
        console.log(err)
    }
    console.log(c)//5
    ```
4. 获取标签属性
    -  `el.attributes`获取元素的属性集合，是个伪数组，如id
    - 设置属性 `.setAttribute("属性","值")`
    - 获取属性 `.getAttribute("属性")`
5. `toFixed()` 方法可把 Number 四舍五入为指定小数位数的数字
6. 常用的`console`对象方法
    ``` JS
    console.log('hello');//打印结果
    console.info('信息');//输出信息
    console.error('错误');//输出错误
    console.warn('警告');//输出警告
    console.dir(obj)//查看对象的信息
    ```
### 字符串方法常用方法
1. `toUpperCase()`把一个字符串全部变为大写
    ```JavaScript
        let s ='hello';
        s.toUpperCase()//返回HELLO
    ```
2. `toLowerCase()`把一个字符串全部变为小写
3. `indexOf()`返回字符串中检索指定字符串第一次出现的位置（ 索引）
    ```javaScript
        let str1 = "c,aonimaaaaaa     "
        console.log(str1.indexOf('m'));//返回6
    ```
4. `lastindex()` 返回字符串中检索指定字符串最后一次出现的位置
5. `charAt()`返回指定索引位置的字符串
    ```javascript
        let str = '123456';
        console.log(str.charAt(2))//返回3
    ```
6. `concat()`链接两个或多个字符串，返回链接后的字符串,对原来的字符串没有改变
    ```javascript 
    let str='my';
    let str1='lazy';
    let str2=str.concat(str1);
    console.log(str2);//"mylazy"
    ```
7. `substr(x,y)`从索引x开始，截取y个字符，返回截取的字符，对原字符串没有改变
    ```javascript
        let str ='abc';
        console.log(str.substr(1,1))//b
    ```
8. `substring(x,y)`从索引x开始，截取y个字符,不包括y，返回截取的字符，对原字符串没有改变
    ```javascript
        let str ='12333';
        str.substring(0，3)//从索引0-3,不包括3
        str.substring(3)//从索引3开始到结束
    ```
9. `slice(x,y)`从索引x开始，截取y个字符,不包括y，返回截取的字符，对原字符串没有改变
    ```javascript
    let str = 'abcde'
    let bc = str.slice(1,3);
    console.log(bc);//'bc'
    ```
10. `split()`用指定字符分割字符串，返回一个数组，对原字符串没有改变
    ```javascript
    let str = 'abcde'
    let a = str.split('');
    console.log(a);  //["a", "b", "c", "d", "e"]
    ```
11. `replace('a',1)`替换指定字符，返回替换后的字符串，对原有字符串有改变(第一个参数可以是正则表达式) 只能替换一次 ，配合正则式修饰符g使用
    ```javascript
    let str='aaaaee';
    let reg=/a/g;
    console.log(str.replace(reg,1));   //"1111ee"
    ```
12. `match()`可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配，把找到的字符串通过数组返回
    ```javascript
    let str = 'aaaa3ebbd33';
    let  reg = /a/g;
    console.log(str.match(reg));  //["a", "a", "a", "a"]
    ```
13. `trim()`移除字符串首尾空白
    ```javascript 
    let str ='  123, 5   ';
    console.log(str.trim())//移除首位空白123,5
    ```

***
### 数组常用方法整理
1. `concat()`拼接数组，不修改原数组
    ```javascript
    let arr = [2,3,5];
    let arr2 = arr.concat(9,13]);
    console.log(arr2);　//[2, 3, 5, 9, 13]
    console.log(arr); 　// [2, 3, 5](原数组未被修改)
    ```
2. `join()`数组转为字符串，通过join括号的内容拼接，默认为(，)不改变原数组
    ```javascript
    let arr = [1,2,3];
    console.log(arr.join()); 　　　　// 1,2,3
    console.log(arr.join("~")); 　　// 1~2~3
    console.log(arr); 　　　　　　　// [1, 2, 3]（原数组不变）
    ```
3. `sort()`把数组内的元素从小到大排序
    ```javascript
    let arr1 = ["4", "1", "3", "2"];
    console.log(arr1.sort()); 　　　　// ["1", "2", "3", "4"]
    ```
4. `reverse()`反转数组项的顺序。
    ```javascript
    let arr = [1, 4, 5, 3];
    console.log(arr.reverse()); 　　　　//[3, 5, 4, 1]
    console.log(arr); 　　　　　　　　　//[3, 5, 4, 1](原数组改变)
    ```
5. `slice(x,y)`截取区间内的数组项，组成新的数组，可以接受一个或两个参数
    ```javascript
    let arr = [1,3,5,7,9,11];
    let arr2 = arr.slice(1);
    let arr3 = arr.slice(1,4);
    console.log(arr2); 　　　　 //[3, 5, 7, 9, 11]
    console.log(arr3); 　　　 //[3, 5, 7]
    console.log(arr); 　　　//[1, 3, 5, 7, 9, 11](原数组没变)
    ```
6. `splice()`删除，插入
    - 删除：(2个参数，要删除的第一项位置和药删除的项数)
        ```javascript
        let arr= ["a", "b", "c", "d"];
        arr.splice(0, 1);        // 删除 arr中的第一个元素
        ```
    - 插入:(向指定位置插入任意数量的项，提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项)
        ```javascript
        let arr = ["a", "b", "c", "d"];
        arr.splice(2, 0, "e", "f");
        console.log(arr)  // ["a", "b", "e", "f", "c", "d"
        ```
7. `push()`可以接收任意数量的参数， 把它们逐个添加到数组末尾， 并返回修改后数组的长度。
    ```javascript
    let arr = ["a", "b", "c"];
    let b = arr.push("x", "y");
    console.log(b); // 5 (长度）
    console.log(arr); // ["a", "b", "c", "x", "y"]
    ```
8. `pop()`数组末尾移除最后一项， 减少数组的 length 值， 然后返回移除的项。
    ```javascript
    let arr = ["a", "b", "c"];
    let b= arr.pop();
    console.log(b); 　　　 // c
    console.log(arr); 　// ["a", "b"]
    ```
9. `shift()`删除原数组第一项，并返回删除元素的值。
    ```javascript
    let arr = ["a", "d", "c"];
    let b = arr.shift();
    console.log(b); 　　　　　// a
    console.log(arr); 　　  // ["d", "c"]
    ```
10. `unshift()`将参数添加到原数组开头，并返回数组的长度
    ```javascript
    let arr = ["a", "d", "c"];
    let b = arr.unshift("x", "y");
    console.log(b); 　　　　　　　　// 5
    console.log(arr); 　　　　　　//["x", "y", "a", "d", "c"]
    ```
11. `indexOf()和 lastIndexOf() 查找`
    - `indexOf()`：接收两个参数：要查找的项和起点位置。从数组的开头开始向后查找。
    - `lastIndexOf()`：接收两个参数：要查找的项和起点位置，从数组的末尾开始向前查找。
        
        ```javascript
        let arr = [1,3,5,7,7,5,3,1];
        console.log(arr.indexOf(5)); 　　　　　　//2
        console.log(arr.lastIndexOf(5)); 　　　 //5
        console.log(arr.indexOf(5,2)); 　　　　 //2
        console.log(arr.lastIndexOf(5,4)); 　　//2
        ```
12. `forEach()循环`
- `forEach()`：对数组进行遍历循环，对数组中的每一项运行给定函数。参数分别为：遍历的数组内容；第对应的数组索引，数组本身。参数都是function类型，默认有传参
    
    ```javascript
    var arr = [1, 2, 3];
    arr.forEach(function(v,k){
    console.log(v,k);
    /**依次输出
     *1 0 
     *2 1
     *3 2
     **
    });
    ```
13. `map()`对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
    ```javascript
    let arr = [1, 2, 3, 4, 5];
        let arr2 = arr.map(function (item) {
            return item + item;
        });
        console.log(arr2); 
        不太明白这个东西
    ```
14. `filter()`“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。
    ```javascript
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let arr2 = arr.filter(function (x, index) {
            return x>9 || index >3 ;   
    });
    console.log(arr2); 　　　　　　　　//[5, 6, 7, 8, 9, 10]
    ```
15. `every()`判断数组中每一项都是否满足条件，所有项都满足条件，才会返回true。
    ```javascript
    let arr = [1, 2, 3, 4, 5];
	  let arr2 = arr.every(function(x) {
	    return x < 10;
      }); 
		console.log(arr2); 　　　　　　　　//true
		
	let arr3 = arr.every(function(x) {
	    return x < 3;
	}); 
    console.log(arr3); 　　　　　　　　// false
    ```
16. `some()`判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。
    ```javascript
    let arr = [1, 2, 3, 4, 5];
	let arr2 = arr.some(function(x) {
	    return x < 3;
	}); 
	console.log(arr2); 　　　　　　　　//true
	
	let arr3 = arr.some(function(x) {
	    return x < 1;
    });
    console.log(arr3); 　　　　　　　　// false
    ```
17. `find` 检索数组中的每一项，如果有则返回该项，没有则返回undefined
    ```js
    let arr=[1,2,3,4,5];
    let arr2=arr.find((v)=>{
        return v>3;
    })
    console.log(arr2)//4只返回查的第一项。
    ```
18. `for(数组的值或者对象的属性 in  数组或者对象)`
    ```js
    let obj={
        name:'张三',
        age:20,
    }
    for(let i in obj){
        console.log(i,obj[i])//i=name,age  obj[i]=张三,20
    }
    ```