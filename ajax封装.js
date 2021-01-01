function ajax(options) {
    let opts = Object.assign({
        method: 'get',
        url: '',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: '',
        success: function() {}
    }, options)

    let xhr = new XMLHttpRequest();

    if (options.method == "get") {
        let data = o2u(opts.data)
        options.url = options.url + "?" + data;
    }

    xhr.open(options.method, options.url, true);
    for (let key in opts.headers) { //组装请求头
        xhr.setRequestHeader(key, opts.headers[key]);
    }

    let sendData; //发送数据到服务器
    switch (opts.headers['content-type']) {
        case 'application/x-www-form-urlencoded':
            sendData = o2u(opts.data);
            break;
        case 'application/json':
            sendData = JSON.stringify(opts.data);
            break;
    }

    //服务的发向客户端的数据
    xhr.onload = function() {
        let resData;
        if (xhr.getResponseHeader("content-type").includes("xml")) {
            resData = xhr.responseXML;
        } else {
            resData = JSON.parse(xhr.responseText);
        }
        options.success(resData);
    }
    if (options.method == "get") {
        xhr.send();
    } else {
        xhr.send(sendData);
    }
}


// obj = {
//     name: 2,
//     age: 20
// }
function o2u(obj) { // htt://localhost/get?name=2&age=23
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    return keys.map((v, k) => {
        return `${v}=${values[k]}`;
    }).join("&");
}