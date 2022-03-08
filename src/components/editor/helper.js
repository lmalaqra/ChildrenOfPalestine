const createSpace = () => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  console.log(range.endContainer);
  // spanElement.insertAdjacentHTML('afterend', "&nbsp;");
};

export const boldOperation = (op) => {
  const sel = window.getSelection();

  let range = sel.getRangeAt(0);
  const selectedNode = range.startContainer.parentNode;

  switch (op) {
    case "add":
      const fragment = range.cloneContents();
      range.deleteContents();
      const newNode = document.createElement("strong");
      newNode.appendChild(fragment);
      range.insertNode(newNode);
      range = range.cloneRange();
      createSpace();
      break;

    case "remove":
      const text = selectedNode.textContent;

      const myNode = document.createTextNode(text);
      selectedNode.parentNode.replaceChild(myNode, selectedNode);

      break;
    default:
      break;
  }
};

export const italicOperation = (op) => {
  const sel = window.getSelection();

  const range = sel.getRangeAt(0);
  const selectedNode = range.startContainer.parentNode;

  switch (op) {
    case "add":
      const fragment = range.cloneContents();
      range.deleteContents();
      const newNode = document.createElement("em");
      newNode.appendChild(fragment);
      range.insertNode(newNode);
      break;

    case "remove":
      const text = selectedNode.textContent;

      const myNode = document.createTextNode(text);
      selectedNode.parentNode.replaceChild(myNode, selectedNode);

      break;
    default:
      break;
  }
};

export const linkOperation = (link, range) => {
  const selectedNode = range.startContainer.parentNode;

  const fragment = range.cloneContents();
  range.deleteContents();

  const newNode = document.createElement("a");
  newNode.href = link;
  newNode.appendChild(fragment);
  const divNode = document.createElement("div");
  divNode.contentEditable = "false";
  divNode.appendChild(newNode);
  divNode.style.display = "inline";
  range.insertNode(divNode);
};

export const removeLink = () => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);

  const selectedNode = range.startContainer.parentNode;

  const text = selectedNode.textContent;

  const myNode = document.createTextNode(text);
  selectedNode.parentNode.replaceChild(myNode, selectedNode);
};

export const quoteOperation = (op) => {
  const sel = window.getSelection();

  const range = sel.getRangeAt(0);
  const selectedNode = range.startContainer.parentNode;

  switch (op) {
    case "add":
      const fragment = range.cloneContents();
      range.deleteContents();
      const newNode = document.createElement("h3");
      const quoteNode = document.createElement("q");
      quoteNode.appendChild(fragment);
      newNode.classList.add("quote");
      newNode.appendChild(quoteNode);
      range.insertNode(newNode);
      break;

    case "remove":
      const text = selectedNode.textContent;

      const myNode = document.createTextNode(text);
      selectedNode.parentNode.parentNode.replaceChild(
        myNode,
        selectedNode.parentNode
      );

      break;
    default:
      break;
  }
};

export const insertNewLine = () => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const newNode = document.createElement("br");
  range.insertNode(newNode);
  range.setStart(newNode);
};

export const insertNewTitle = (div) => {
  const newTitle = document.createElement("h3");
  const text = document.createTextNode("new title");
  newTitle.appendChild(text);
  div.appendChild(newTitle);
};

export const changeSelection = (node) => {
  const sel = window.getSelection();
  if (sel) {
    const range = sel.getRangeAt(0);
    range.selectNode(node);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  if (!sel) {
    const range = document.createRange();
    range.selectNode(node);
  }
};
