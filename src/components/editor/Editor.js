import React, { useState, useEffect, useRef, createElement } from "react";
import "./editor.css";
import { boldOperation, italicOperation } from "./helper";
import axios from "axios";

const Editor = (props) => {
  const [model, setModel] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisable, setisVisable] = useState(false);
  const [isBold, setisBold] = useState(false);
  const [isItalic, setisItalic] = useState(false);
  const ref = useRef();

  useEffect(() => {
    window.addEventListener("click", () => {
      setisVisable(false);
    });
  });

  const getCaretPosition = async (e) => {
    e.stopPropagation();

    let sel, range;
    if (window.getSelection) {
      sel = window.getSelection();

      range = sel.getRangeAt(0);
      if (range.collapsed) return;
      setisVisable(true);
      setisBold(false);
      setisItalic(false);

      const selectedNode = range.startContainer.parentNode;

      console.log();
      if (
        (selectedNode.nodeName === "STRONG" ||
          selectedNode.nodeName === "EM") &&
        (selectedNode.parentNode.nodeName === "STRONG" ||
          selectedNode.parentNode.nodeName === "EM")
      ) {
        setisBold(true);
        setisItalic(true);
      } else if (selectedNode.nodeName === "STRONG") {
        setisBold(true);
      } else if (selectedNode.nodeName === "EM") {
        setisItalic(true);
      }

      //remove effect from node

      // const selectedNode = range.startContainer.parentNode;
      // const siblingNOde = selectedNode.nextSibling;
      // const text = selectedNode.textContent;

      // console.log(range);
      // const newNode = document.createTextNode(text);
      // selectedNode.parentNode.replaceChild(newNode, selectedNode);
      //insert an effect to text
      // const fragment = range.cloneContents();
      // range.deleteContents();
      // console.log(range.toString());
      // const newNode = document.createElement("strong");
      // newNode.appendChild(fragment);
      // range.insertNode(newNode);
    }
    // else if (document.selection && document.selection.createRange) {
    //   range = document.selection.createRange();
    //   if (range.parentElement() == ref.current) {
    //     var tempEl = React.createElement("span");
    //     ref.current.insertBefore(tempEl, ref.current.firstChild);
    //     var tempRange = range.duplicate();
    //     tempRange.moveToElementText(tempEl);
    //     tempRange.setEndPoint("EndToEnd", range);
    //     caretPos = tempRange.text.length;
    //   }
    // }
  };
  function modlules() {}
  const operateOnDiv = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { title } = e.currentTarget;
    console.log(e.currentTarget);
    if (title === "bold") {
      if (isBold) {
        boldOperation("remove");
      } else if (!isBold) {
        boldOperation("add");
      }
      setisBold((prev) => !prev);
    } else {
      if (isItalic) {
        italicOperation("remove");
      } else if (!isItalic) {
        italicOperation("add");
      }
      setisItalic((prev) => !prev);
    }
  };
  const insertImage = async (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");
    const res = await axios.post("cloudinary-upload", uploadData);
    const newImg = document.createElement("img");
    newImg.src = res.data.url;
    newImg.style.width = "100%";
    ref.current.appendChild(newImg);

    console.log(res.data);
  };

  return (
    <div>
      <label style={{ cursor: "pointer" }} for="image">
        {" "}
        <img
          style={{ width: "30px" }}
          src="/assets/images/image.svg"
          alt="img"
        />
      </label>
      <input
        type="file"
        name="image"
        id="image"
        style={{ visibility: "hidden" }}
        onChange={insertImage}
      />
      <div
        style={{
          display: isVisable ? "flex" : "none",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        className="grid controllers"
      >
        <button title="bold" onClick={operateOnDiv} className="con-btn">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 202 202"
            width="15px"
          >
            <path
              fill={isBold ? "green" : "white"}
              d="M148.004,94.812c18.332-8.126,28.671-23.362,28.671-42.752c0-17.261-6.954-31.206-20.11-40.328
	C145.653,4.166,130.438,0,113.721,0H16.957v34h17v134h-17v34h90.905c14.819,0,35.992-2.245,52.705-12.94
	c16.241-10.393,24.476-26.161,24.476-46.868C185.043,118.342,171.057,100.763,148.004,94.812z M103.12,80H73.957V34h26.096
	c25.961,0,36.551,6.34,36.551,21.884C136.604,75.816,118.396,80,103.12,80z M73.957,115h30.838c28.537,0,40.177,7.436,40.177,25.663
	c0,18.14-13.987,27.337-41.572,27.337H73.957V115z"
            />
          </svg>
        </button>
        <button title="italic" onClick={operateOnDiv} className="con-btn">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill={isItalic ? "green" : "white"}
          >
            <path d="M9.001 13.593l-.097.325H4l.123-.325c.492-.012.817-.053.976-.123.257-.1.448-.238.57-.413.194-.276.394-.768.599-1.477l2.074-7.19c.176-.597.263-1.048.263-1.353a.643.643 0 0 0-.114-.387.683.683 0 0 0-.351-.237c-.153-.059-.454-.088-.906-.088L7.34 2h4.605l-.096.325c-.375-.006-.654.035-.835.123a1.358 1.358 0 0 0-.607.501c-.134.217-.31.697-.527 1.442l-2.066 7.19c-.187.661-.28 1.083-.28 1.265 0 .146.034.272.105.378.076.1.193.178.351.237.164.053.501.097 1.011.132z" />
          </svg>
        </button>
        <div className="tail"></div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          setPosition({ top: e.pageY - 70, left: e.pageX - 90 });
        }}
        onSelect={getCaretPosition}
        onKeyUp={(e) => {
          e.preventDefault();
          console.log(e.key);
        }}
        ref={ref}
        contentEditable="true"
      >
        <h3>this is an h3 element &nbsp; </h3>
        <p>
          {" "}
          this is a paragraph containg some elements &nbsp;
          <strong>this is a bold elemnt &nbsp;</strong>
          <em>this is italic element &nbsp;</em>
          <strong>
            <em>this is both italic and bold element &nbsp;</em>
          </strong>
          the paragraph element ends here
        </p>{" "}
      </div>
    </div>
  );
};

export default Editor;
