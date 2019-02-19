function Promise(executor) {
  let self = this;
  self.status = "pending";
  self.value = null;
  self.reason = null;
  self.successCallback = [];
  self.errorCallback = [];
  function resolve(value) {
    if (self.status === "pending") {
      self.status = "resolved";
      self.value = value;
      self.successCallback.forEach(fn => fn());
    }
  }

  function reject(reason) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.reason = reason;
      self.errorCallback.forEach(fn => fn());
    }
  }
  executor(resolve, reject);
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  if (self.status === "resolved") {
    onFulfilled(self.value);
  }
  if (self.status === "rejected") {
    onRejected(self.reason);
  }
  if (self.status === "pending") {
    self.successCallback.push(() => {
      onFulfilled(self.value);
    });
    self.errorCallback.push(() => {
      onRejected(self.reason);
    });
  }
};
module.exports = Promise;
