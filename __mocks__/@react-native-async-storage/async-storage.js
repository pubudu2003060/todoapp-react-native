let store = {};
export default {
  getItem: jest.fn(key => Promise.resolve(store[key] || null)),
  setItem: jest.fn((key, value) => {
    store[key] = value.toString();
    return Promise.resolve();
  }),
  removeItem: jest.fn(key => {
    delete store[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    store = {};
    return Promise.resolve();
  }),
  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(store))),
  useAsyncStorage: jest.fn(() => ({
    getItem: jest.fn(key => Promise.resolve(store[key] || null)),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
      return Promise.resolve();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
      return Promise.resolve();
    }),
    mergeItem: jest.fn((key, value) => {
      const oldValue = store[key] ? JSON.parse(store[key]) : {};
      const newValue = JSON.parse(value);
      store[key] = JSON.stringify({...oldValue, ...newValue});
      return Promise.resolve();
    }),
  })),
};
