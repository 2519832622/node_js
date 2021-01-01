# Node笔记大全
- 配置一个简单的服务器端
    ```js
    const http = require("http");
    const server = http.createServer((req, res) => {//req请求端。res响应端
        res.write('fucking...');
        res.end();//响应结束
    })
    server.listen(2000);//端口
    ```
### 快捷键
- `ctr +c`停止当前服务
****
### 模块化
- 简单导出模块 
    ```js
    let a = 20;
    // module.exports = {
    //     a
    // }
    // exports 是 module.exports 的引用；
    // module.exports = exports;
    class Bc {
        constructor() {
            this.name = 'zs'
        }
        hobby() {
            console.log('chijiba')
        }
    }
     .a = a;
    exports.Bc = Bc;
    //接收模块
    let a = require('./b.js');
    console.log(a.a)
    let bc = new a.Bc();
    bc.hobby()
    ```
- 系统模块统一管理目录`node_modules\`只需要在最外面的入口文件导入模块的目录就ok了
- 在我们自定义的模块里面有一个描述性的json文件(package.json)
    ```json
    {
    "name": "home",//模块名称
    "version": "1.0",
    "main": "index.js"//入口文件
    }
    ```
*****
### `Npm`常用指令
- `npm`常用指令；
  - `npm init`：引导创建一个`package.json`文件
  - `npm help(npm -h)` ：查看`npm`帮助信息
  - `npm version (npm -v)` : 查看`npm`版本；
  - `npm search`：查找
  - `npm install (npm i)`：安装  默认在当前目录，如果没有node_modules 会创建文件夹；
    - `npm install module_name -S` 或者--save    即    `npm install module_name --save `   写入`dependencies`
    - `npm install module_name -D`  或者 —`save-dev `  即    `npm install module_name --save-dev `写入`devDependencies`
    - `npm install module_name -g` 全局安装(命令行使用)
    - 指定版本安装模块   `npm i module_name` @1.0 通过  "@"符号指定；
  - `npm update(npm -up)`：更新
  - `npm remove` 或者  `npm uninstall`：删除
  - `npm root ` 查看当前包安装的路径  或者通过  `npm root -g `来查看全局安装路径；
### `fs`模块
- `fs`是文件操作模块，所有文件操作都是有同步和异步之分，特点是同步会加上 "Sync" 如：异步读取文件  "`readFile`"，同步读取文件 "`readFileSync`"；
  文件操作
  
  - 文件读取：
    - 异步读取
    ```js
    let fs = require("fs");
    fs.readFile("1.txt",(err,data)=>{
        if(err){
            return console.log(err);
        }
        console.log(data.toString());
    })
    ```
    - 同步读取文件
    ```js
    let fs = require("fs");
    let res = fs.readFileSync("1.txt");
    console.log(res.toString());
    ```
  - 文件写入：
    ```js
    let fs = require("fs");
    //flag配置  "a":追加写入，"w":写入，"r":读取
    fs.writeFile("2.txt","我是要写入的内容",{flag:"w"},err=>{
        if(err){
            return console.log(err);
        }
        console.log("写入成功");   
    })
    ```
  - 文件删除
    ```js
    fs.unlink("2.txt",err=>{
        if(err){
            return console.log(err);
        }
        console.log("删除成功");
    })
    ```
  - 复制文件 先读取文件再写入文件
    ```js
    function mycopy(src,dest){
       fs.writeFileSync(dest,fs.readFileSync(src));
    }
    mycopy("1.txt","4.txt");
    ```
  - 修改文件名，目录也可以通过rename来操作
    ```js
    fs.rename("1.txt","5.txt",function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("修改成功");
        }
    });
    ```
  - 判断文件是否存在
    ```js
    fs.exists("4.txt",function (exists) {
            console.log(exists);
    })
    ```
- 目录操作
    ```js
    //创建目录
     fs.mkdir("11",err=>{
        if(err){
             return console.log(err);
         }
        console.log("创建成功");
     })
     //修改目录
     fs.rename("11", "22", err => {
        if (err) {
            return console.log(err);
        }
        console.log("修改成功");
    })
    //读取目录
    fs.readdir("22",(err,data)=>{
    if(err){
        return console.log(err);
     }
        console.log(data);
    })
    //删除目录(空文件夹/目录)
    fs.rmdir("11",err=>{
        if(err){
            return console.log(err);
        }
        console.log("删除成功");
    })
    //判断文件或者目录是否存在
    fs.exists("index.html",exists=>{
        console.log(exists);
    })
    //获取文件或者目录的详细信息；
    fs.stat("index.html",(err,stat)=>{
        if(err){
            return console.log(err);
        }
        // console.log(stat);
        let res = stat.isFile();// 判断文件是否是文件
        let res = stat.isDirectory();// 是否是一个文件夹；
        console.log(res);
    })
    
    // 删除非空文件夹；
    // 先把目录里的文件删除-->删除空目录；
    // 22
    function removeDir(path){
    let data = fs.readdirSync(path);
        // ["33","1.txt","2.html"];
    for(let i=0;i<data.length;i++){
            // 是文件或者是目录； --->?文件 直接删除？目录继续查找；  
            let url = path + "/" + data[i];
            let stat =  fs.statSync(url);
            if(stat.isDirectory()){
                //目录 继续查找；
                removeDir(url);
            }else{
                // 文件 删除
                fs.unlinkSync(url);
            }
    }
        //  删除空目录
    fs.rmdirSync(path);
    }
    removeDir("22");
    ```
****
### `http`爬虫
 ```js
    const http = require("http");
    const cheerio = require("cheerio"); //引入cheerio模块，相当于一个jquery库，方便操作dom
    const fs = require("fs");
    let webUrl = "http://news.ifeng.com/"; //要爬取的地址。https有可能爬不到
    http.get(webUrl, res => {
        let str = "";
        res.on("data", chunk => {
            str += chunk; //把爬到的数据，写入str
        })
        res.on("end", () => {
            // console.log(str);
            formatData(str); //组装并格式化数据
        })
    });

    function formatData(html) {
        let $ = cheerio.load(html); //加载dom结构
        //    console.log( $(".news-stream-basic-news-list li").length );
        let arr = [];
        $(".news-stream-basic-news-list li").each((k, v) => {
            let obj = { //把数据循环写入数组对象
                    id: k + 1,
                    title: $(v).find("a").text(),
                    imgUrl: "http:" + $(v).find("img").attr("src"),
                    from: $(v).find(".news-stream-newsStream-mr10").text(),
                    newTime: $(v).find("time").text()
                }
                //    console.log(obj);
            arr.push(obj);
        })
        fs.writeFileSync("./data.json", JSON.stringify(arr)); //把数据保存到本地。
    }
 ```
### `Nvm`使用
- 使用`NVM（Node Version Manager）`控制`Node.js`版本
  - `nvm`是mac环境下管理`nodejs`的工具。在windows环境下推荐使用`nvmw`或者nvm-windows；

    - `Nvm-windows`  下载地址 https://github.com/coreybutler/nvm-windows   下载 nvm-setup.zip

  - 安装`NVM`

    - 在安装nvm之前需要一个c++编译器，在mac上可以安装`Xcode`命令工具(已经安装可以忽略)

      `xcode-select --install`

    - 使用 curl安装

      `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

    - 或者使用`wget`来安装

      `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash` 

  ​		

  - `NVM` [github的地址](<https://github.com/creationix/nvm>)可以查看最新版本

  ​		

  - `NVM`常用指令；
    ` nvm --version查看版本` 

    ``nvm install stable //安装最新稳定版nodejs``

     `` nvm install 8.11.1  //安装指定版本``

     ``  nvm install 8.11     //安装 8.11.x系列最新版本``

      `` nvm ls-remote      //列出远程服务器上所有可用的版本``

     `` nvm use 8.11.1    //切换到8.11.1版本``

     ``nvm use 8.11      //切换到8.11.x最新版本``

    ``  nvm use node   //切换到最新版本``

    ``  nvm alias default node //设置默认版本为最新版本``
    
     `` nvm ls   //列出所有已经安装的版本`` 
    
****
### `koa`框架实例
```js
    //非框架用法 
    let http = require('http'); //创建服务器
let cheerio = require('cheerio'); //操作dom的模块 用法跟jq一样
const path = require("path"); //获取请求文件的扩展名
const url = require("url"); //路由模块 配和path一起用
let data = require('./data/data.json');
let main = require('./data/mime.json');
const fs = require('fs') //文件模块 增删查改

let server = http.createServer((req, res) => { //创建一个服务器 req 请求 res 相应

    // res.end('hello world 你好啊');
    let urlObj = url.parse(req.url, true); //获取路由地址 获取参数则需要第二个参数设置为true 
    let p = parseInt(urlObj.query.p) || 1;
    let perPage = 5;
    let newData = JSON.parse(JSON.stringify(data)).splice((p - 1) * perPage, perPage); //json 深拷贝  
    let pageCount = Math.ceil(JSON.parse(JSON.stringify(data)).length / perPage);

    if (urlObj.pathname === '/' || urlObj.pathname === '/index') {
        let str = '';
        newData.forEach((v, k) => {
            str += `<li class="news">
        <a href="javascript:;">
            <img src="${v.imgUrl}" alt="">
        </a>
        <div>
            <h3>
                <a href="/detail?id=${v.id}">${v.title}</a>
            </h3>
            <div class="info">
                <span class="tips"><span>${v.from}</span></span>
                <!-- <span class="line"></span> -->
                <span class="time">| &nbsp;&nbsp;${v.newTime}</span>
            </div>
        </div>
    </li>`
        })
        let pageHmtl = `<a href="/index?p=${p<=1?1:(p-1)}" class="prev">⌜</a>`;
        for (let i = 1; i <= pageCount; i++) {
            pageHmtl += `<a href="/index?p=${i}">${i}</a>`;
        }
        pageHmtl += `<a href="/index?p=${p>=pageCount?pageCount:(p+1)}" class="next">⌝</a>`;
        let index = fs.readFileSync('./views/index.html');
        let $ = cheerio.load(index); //先加载原本的html
        $('.pagination').html(pageHmtl); //才能进行dom操作 修改innerhtml
        $('.news-list').html(str) //修改.news-list 下面的innerhtml 
        res.end($.html()) //最后在把修改过的整个html返回给浏览器

    } else if (urlObj.pathname === '/detail') {
        let id = parseInt(urlObj.query.id) || 1;
        let str = '';
        let detaildata = JSON.parse(JSON.stringify(data)).filter(v => v.id == id)[0];
        str += `<h1 class="title">${detaildata.title}</h1>
        <div class="article-info"> ${detaildata.from} 时间：${detaildata.newTime}</div>
        <p class="content">
        ${detaildata.title}
        <img src="${detaildata.imgUrl}" alt="">
        </p>`;
        let dahtml = fs.readFileSync('./views/detail.html');
        let $ = cheerio.load(dahtml);
        $('.text').html(str);
        res.end($.html());
        // let del = fs.createReadStream('./views/detail.html');
        // del.pipe(res);

    } else {
        if (urlObj.pathname !== "/favicon.ico") {
            // 获取扩展名；
            let ext = path.extname(urlObj.pathname);
            //    console.log("??",ext);
            res.setHeader("Content-Type", main[ext]); //设置请求头的类别 (css就是text/css) 不设置网页识别不了
            // console.log("/views/css" + urlObj.pathname);
            let resData = fs.createReadStream("./views/css" + urlObj.pathname); //创建一个流 分次都这个文件 每次最多64kb
            resData.pipe(res); //多次的结果 重新组装 把完整的返回给浏览器

        }

    }
});
server.listen(3000);

//koa框架 最新写法  
const Koa = require("koa"); //引入koa框架
const Router = require("koa-router"); //路由框架 可以获取域名 还可以获取参数
const views = require("koa-views"); //视图模块 要用那种模板引擎来渲染
const static = require('koa-static'); //接口模块  为了解决请求头不能识别  这个会自动根据文档类型 设置content——type
let app = new Koa();
let router = new Router();
let data = require('./views/data.json');

app.use(views(__dirname + "/views", {
    map: {
        html: "pug"
    }
}));
app.use(static(__dirname + '/static'));
router.get('/', async ctx => {
    ctx.redirect('/index') //重定义域名
})
router.get("/index", async ctx => { // 这里必须用tm的异步  router 自带promise
    // console.log(ctx.query.id);
    let pag = 5;
    let p = parseInt(ctx.query.p) || 1;
    //如果要拿到地址栏传入的参数   通过 ctx.query.参数 则可以拿到
    let pagcont = Math.ceil(data.length / pag);
    let newData = JSON.parse(JSON.stringify(data)).splice((p - 1) * pagcont, pagcont);
    await ctx.render("index.pug", { //render 渲染pug文件 第二个参数可以传参 
        newData,
        pagcont,
        p
    });

});
router.get("/detail", async ctx => {
    let id = ctx.query.id || 1;
    let newD = JSON.parse(JSON.stringify(data)).filter(v => v.id == id)[0];
    await ctx.render("detail.pug", {
        newD
    })

})
app.use(router.routes()); //把koa把路由关联起来
app.listen(3000);
```

*****
### `Koa-body`取post值的模块
```js
    const koaBody = require('koa-body');//引入koa-body模块
    app.use(koaBody({
        multipart: true//配置是否允许文件上传
    }))

    //文件上传
    module.exports = {
        async upload(request) {
            let { title, from } = request.body;//获取客户端传过来的post数据，并解构出来;
            // console.log(request.files.img);
            if (request.files.img.size > 0) {
                if (!fs.existsSync("static/upload")) {
                    fs.mkdirSync("static/upload")
                }
                let imgtmap = request.files.img.path;
                let data = new Date()
                    // let newtime = ;
                fs.writeFileSync("static/upload/" + request.files.img.name, fs.readFileSync(imgtmap));
                let imgurl = "/upload" + request.files.img.name;
                let newtime = data.getTime();
                let [rows] = await connent.promise().query("INSERT INTO data(title,imgurl,`from`,newtime) VALUES (?,?,?,?)", [title, imgurl, from, newtime]);
                return rows;
            }
        }
    }
```
*****
### SSE (server send event) 服务器推送数据；
​	Server-sent events:使用server-sent 事件的方法,服务器可以在任何时刻向我们的web页面推送数据和信息.这些被推送进来的信息可以在这个页面上作为事件+data来处理.
- 服务端设置
  - 设置头部
    `"Content-type","text/event-stream"`
  - 返还数据格式
    ​	`data:`声明数据开始
    ​	`\r\n\r\n`标志数据结尾

- 前端获取
  ```js
  let source = new EventSource("/test");
      source.onopen = function(){
          console.log("连接建立...",this.readyState);
      }
      // console.log(source)
      source.onmessage = function(evnet){
          console.log("数据是：",evnet.data)
      }
      source.error = function(err){
          return console.log('err');
      }
  ```
  - readyState  代表连接状态:
    - 0 `CONNECTING` (`0`) 。
    - 1 `OPEN` (`1`),
    - 2 CLOSED` (`2`)

### `web socket`
- Web Socket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议;
- 创建web socket服务器；
  ```js
  var WebSocketServer = require('ws').Server//创建ws服务器。
  wss = new WebSocketServer({ port: 8181 });
  wss.on('connection', function (ws) {
      console.log('连接成功');//
      ws.on('message', function (message) {
        //监听接收客户端的数据
          console.log(message);
      });
    	setInterval(() => {
          let somedata = {
              name:"张三",
              age:20
          }
          ws.send(JSON.stringify(somedata));//把服务端的数据返回给客户端
      }, 1000);
  });
  ```
- 客户端代码
  - 建立握手
  ```js
  var ws = new WebSocket("ws://localhost:8181");//这个地址要给绝对地址
  ```
  - 打开协议
  ```js
  	ws.onopen = function () {
          console.log("连接成功")
      }
  ```
  - 发送数据到服务端
  ```js
    ws.send("客户端数据");//必须要在客户端触发事件才能发送到服务器
  ```
  -  关闭协议:关闭协议后不能发送数据
  ```js
    ws.close();
  ```
  - 接收消息

    ```js
    ws.onmessage = function(e){
        console.log(e.data);//接受服务端的消息
    }
    ```
### `socket.io`模块
- 服务端
  ```js
  let app = new Koa();
  const server = require('http').createServer(app.callback());//把创建的服务器和koa框架关联起来
  const io = require('socket.io')(server)//创建socketio服务器
  io.on('connection', async(Socket) => {
    console.log('通信了');
    Socket.on('addData', async(data) => {
        console.log(data)//接受客户端的数据
        let newData = await mydata.getData();//从数据库获取的数据
        // Socket.emit('backFn', newData) //此方法只能发送给一个客户端
        Socket.broadcast.emit('backFn', newData) //这个方法会发送广播，处自己以外的客户端都能接收到
        })
    })
  server.listen(3000);
  ```
- 客户端
  ```js
  //必须要引入soketio.js
  let socket = io.connect('/');同源就给相对地址，不同源就要给绝对地址
  //oneFn 这个事件名一定要和服务端的事件名相同，否则监听不了
    socket.emit("oneFn", "我是客户端发向服务端的内容");//发向服务端的数据
     socket.on("backFn", function(data) {//接受服务端的数据
     console.log("接收到服务端的数据 :", data);
     })
  ```

