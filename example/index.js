const add = (arr, a) => {
  return arr.join('-') + a;
};

const worker = new marvelsWorker();

worker.postMessage({
  id: 'add',
  func: add.toString(),
  args: [[1, 2, 3, 4], 'a'],
});

worker.onmessage(function(data) {
  console.log('---data---', data);
});