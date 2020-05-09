import TreeData from "./Tree";

import "./styles.css";

console.log(TreeData);

// collapse style : display: none

const createNodeObject = ({ name, type, parentType, domNode }) => {
  return Object.assign({}, { name, type, parentType, domNode });
};

const createElement = node => document.createElement(node);
const createTextElement = data => document.createTextNode(data);

const renderBlobItem = (item, parentNode) => {
  const newElement = createElement("div");
  const blobName = createTextElement(item.name);
  newElement.appendChild(blobName);
  parentNode.domNode.appendChild(newElement);
  const BlobItem = createNodeObject({
    name: item.name,
    type: "child",
    parentType: parentNode.type,
    domNode: parentNode
  });
  return BlobItem;
};

const renderItem = (item, parentNode) => {
  if (item.type === "blob") {
    return renderBlobItem(item, parentNode);
  }
  if (item.type === "tree") {
    return renderTree(item.child, parentNode);
  }
};

const TreeContainer = name => {
  const container = createElement("div");
  const text = createTextElement("root");
  container.appendChild(text);

  const TreeRoot = createNodeObject({
    name: "root",
    type: "tree",
    parentType: null,
    domNode: container
  });

  // TreeRoot.domNode.className = "minimized";

  return TreeRoot;
};

const renderTree = (data, parentNode) => {
  data.forEach(item => renderItem(item, parentNode));
};

const renderApp = () => {
  const container = createElement("div");
  const TreeRootNode = createNodeObject({
    name: "",
    type: "tree",
    parentType: null,
    domNode: container
  });
  renderTree(TreeData, TreeRootNode);
  return TreeRootNode.domNode;
};

document.getElementById("app").appendChild(renderApp());
