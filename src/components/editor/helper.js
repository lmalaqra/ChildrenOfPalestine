export const boldOperation = (op) => {
  const sel = window.getSelection();

  const range = sel.getRangeAt(0);
  const selectedNode = range.startContainer.parentNode;

  console.log();
  switch (op) {
    case "add":
      const fragment = range.cloneContents();
      range.deleteContents();
      console.log(range.toString());
      const newNode = document.createElement("strong");
      newNode.appendChild(fragment);
      range.insertNode(newNode);
      break;

    case "remove":
      const text = selectedNode.textContent;

      console.log(range);
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

  console.log();
  switch (op) {
    case "add":
      const fragment = range.cloneContents();
      range.deleteContents();
      console.log(range.toString());
      const newNode = document.createElement("em");
      newNode.appendChild(fragment);
      range.insertNode(newNode);
      break;

    case "remove":
      const text = selectedNode.textContent;

      console.log(range);
      const myNode = document.createTextNode(text);
      selectedNode.parentNode.replaceChild(myNode, selectedNode);

      break;
    default:
      break;
  }
};
