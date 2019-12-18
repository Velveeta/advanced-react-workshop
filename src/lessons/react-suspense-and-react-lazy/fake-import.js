const fakeImport = (module, timeout = 3000) => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      default: module,
    });
  }, timeout);
});

export default fakeImport;
