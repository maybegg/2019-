// promise 是一个类(解决异步问题的)
// new Promise 时 需要传递一个executor 执行器(函数)
// promise 承诺 默认的状态是pending 等待态 调用resolve 表示成功了 调用reject 表示失败
// 我们可以从等待态

let Promise = require("./promise.js");
let fs = require("fs");
let p = new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject("情人节过了");
  }, 1000);
});
p.then(
  value => {
    console.log("success", value);
  },
  reason => {
    console.log("reason", reason);
  }
);

p.then(
  value => {
    console.log("success", value);
  },
  reason => {
    console.log("reason", reason);
  }
);

function readFile(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, "utf8", function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./name.txt")
  .then(data => {
    console.log("data", data);
    return 100;
  })
  .then(data => {
    console.log(data);
  });
