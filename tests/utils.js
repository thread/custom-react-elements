const testId = '__custom_react_elements_karma__tests__';

const testRoot = () => document.getElementById(testId);

const insertTestRoot = () => {
  clearDom();
  const testDiv = document.createElement('div');
  testDiv.id = testId;
  document.body.appendChild(testDiv);
};

const clearDom = () => {
  const testElem = testRoot();
  if (testElem) {
    testElem.parentNode.removeChild(testElem);
  }
};

export const insertCustomElementIntoDom = name => {
  insertTestRoot();
  const x = document.createElement(name);
  testRoot().appendChild(x);
};
