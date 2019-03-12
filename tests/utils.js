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

export const insertCustomElementIntoDom = (
  name,
  attributes = {},
  innerHTML = ''
) => {
  insertTestRoot();
  const x = document.createElement(name);
  Object.keys(attributes).forEach(attrName => {
    x.setAttribute(attrName, attributes[attrName]);
  });

  x.innerHTML = innerHTML;
  testRoot().appendChild(x);
};

let selectorNameIndex = 0;

export const randomSelectorName = () => {
  return `thread-test-element-${selectorNameIndex++}`;
};
