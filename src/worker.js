const blobString = `
  self.onmessage = e => {
    const config = JSON.parse(e.data);
    const { func, args, id } = config;
    const result = eval('(' + func + ').apply(' + null + ',' + JSON.stringify(args) + ')');
    const message = Object.assign({}, { result: result }, { id, })
    self.postMessage(JSON.stringify(message));
  };
`;

const blob = new Blob([blobString], { type: 'application/javascript' });
export default blob;
