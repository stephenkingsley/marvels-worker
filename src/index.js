/* eslint space-before-function-paren: 0 */
import workerScript from './worker';

const safeStringify = (obj) => {
  let result = '';
  try {
    result = JSON.stringify(obj);
  } catch (err) {
    console.log(err);
  }
  return result;
};

function newRetailWorker() {
  this.worker = new Worker(URL.createObjectURL(workerScript));
}

newRetailWorker.prototype.postMessage = function(argument) {
  return new Promise((resolve, reject) => {
    const message = safeStringify({
      id: argument.id,
      func: argument.func.toString(),
      args: argument.args,
    });
    if (typeof message === 'string' && message.length > 0) {
      this.worker.postMessage(message);
    } else {
      reject(new Error('config is illegal!'));
    }
  });
};

newRetailWorker.prototype.onmessage = function(cb) {
  this.worker.onmessage = function(event) {
    cb(event);
  };
};

window.marvelsWorker = newRetailWorker;
export default newRetailWorker;
