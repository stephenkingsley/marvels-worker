const blobString = `
  function safeParse(str) {
    var result = {};
    try {
      result = JSON.parse(str);
    } catch (err) {
      console.log(err);
      result = null;
    }
    return result;
  }

  function safeStringify(obj) {
    var result = '';
    try {
      result = JSON.stringify(obj);
    } catch (err) {
      console.log(err);
      result = null;
    }
    return result;
  }

  self.onmessage = e => {
    var config = safeParse(e.data);
    if (config) {
      var { func, args, id } = config;
      var argsString = safeStringify(args);
      if (argsString) {
        var result = eval('(' + func + ').apply(' + null + ',' + safeStringify(args) + ')');
        var message = Object.assign({}, { result: result }, { id, })
        self.postMessage(safeStringify(message));
      } else {
        self.postMessage('');
      }
    } else {
        self.postMessage('');
    }
  };
`;

const blob = new Blob([blobString], { type: 'application/javascript' });
export default blob;
