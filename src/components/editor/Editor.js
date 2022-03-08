import React, { useState, useEffect, useRef, createElement } from "react";
import "./editor.css";
import {
  boldOperation,
  italicOperation,
  linkOperation,
  quoteOperation,
  removeLink,
  insertNewLine,
  insertNewTitle,
} from "./helper";
import axios from "axios";
import Spinner from "../loader/spinner";
import { Routes, Route, link } from "react-router";
import Perview from "./Perview";
import { Link } from "react-router-dom";
import Controller from "./components/Controller";

const Editor = (props) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisable, setisVisable] = useState(false);
  const [isLink, setisLink] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [articleContent, setarticleContent] = useState("");
  const [isBold, setisBold] = useState(false);
  const [isItalic, setisItalic] = useState(false);
  const [isQuote, setisQuote] = useState(false);
  const [link, setLink] = useState("");
  const [linkIsVisable, setLinkIsVisabale] = useState(false);
  const [title, setTitle] = useState("");
  const ref = useRef();
  const ref2 = useRef();
  const inputRef = useRef();
  const [pressedKey, setPressedKey] = useState([" "]);

  let linkPromise;
  useEffect(() => {
    window.addEventListener("click", () => {
      setisVisable(false);
      setLinkIsVisabale(false);
    });

    const observer = new MutationObserver(async (mutationsList, observer) => {
      // Use traditional 'for loops' for IE 11

      const addedNodes = mutationsList[mutationsList.length - 1].addedNodes;
      const addedNode = addedNodes[addedNodes.length - 1];

      if (addedNode) addedNode.scrollIntoView();
      setIsSaving(true);
      axios
        .patch("/articles", { title: title, content: ref.current.innerHTML })
        .then((res) => setIsSaving(false))
        .catch((e) => console.log(e));
    });
    if (!ref.current) return;
    observer.observe(ref.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    return () => {
      observer.disconnect();
    };
  });

  async function myPromise() {
    return new Promise((resolve, reject) => {
      ref2.current.addEventListener("click", async (e) => {
        resolve(inputRef.current.value);
      });
    });
  }

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
      setisLink(false);
      setisQuote(false);

      const selectedNode = range.startContainer.parentNode;
      console.log(selectedNode, selectedNode.parentNode);

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
      if (selectedNode.nodeName === "A") {
        setisLink(true);
      }
      if (selectedNode.nodeName === "Q") setisQuote(true);

      const res = await myPromise();
      console.log(res, range);
      linkOperation(res, range);
      setisLink((prev) => !prev);
    }
  };
  function modlules() {}
  const operateOnDiv = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { title } = e.currentTarget;

    if (title === "bold") {
      if (isBold) {
        boldOperation("remove");
      } else if (!isBold) {
        boldOperation("add");
      }
      setisBold((prev) => !prev);
    } else if (title === "italic") {
      if (isItalic) {
        italicOperation("remove");
      } else if (!isItalic) {
        italicOperation("add");
      }

      setisItalic((prev) => !prev);
    }
  };
  const insertImage = async (uploadData) => {
    try {
      setIsSaving(true);

      const res = await axios.post("/cloudinary-upload", uploadData);
      setIsSaving(false);
      const newFigure = document.createElement("figure");
      const newImg = document.createElement("img");
      const captionNode = document.createElement("figcaption");
      const caption = document.createTextNode("Caption");
      const content = document.createTextNode("new paragraph");

      const paragraph = document.createElement("p");
      captionNode.appendChild(caption);
      paragraph.appendChild(content);

      newImg.classList.add("div-img");
      newImg.src = res.data.url;
      newFigure.appendChild(newImg);
      newFigure.appendChild(captionNode);
      ref.current.appendChild(newFigure);
      ref.current.appendChild(paragraph);
    } catch (e) {
      setIsSaving(false);
      console.log(e);
    }
  };
  const insertVideo = async (uploadData) => {
    const res = await axios.post("/cloudinary-upload-video", uploadData);
    const video = document.createElement("video");
    video.autoplay = "autoplay";
    video.muted = "muted";
    const src = document.createElement("source");
    src.src = res.data.url;
    src.type = "video/mp4";
    video.appendChild(src);
    ref.current.appendChild(video);
    console.log(res);
  };

  const insertSection = () => {
    const seperator = document.createElement("div");
    seperator.classList.add("s-con");
    const dot = document.createElement("div");
    dot.classList.add("dot");
    seperator.appendChild(dot);
    seperator.appendChild(dot.cloneNode(true));
    seperator.appendChild(dot.cloneNode(true));
    ref.current.appendChild(seperator);
    insertNewTitle(ref.current);
  };

  return (
    <div className="editor-container">
      {isSaving ? <Spinner state={"Saving..."} /> : ""}

      <Controller
        onVideoInsert={insertVideo}
        onTitleInsert={() => {
          insertNewTitle(ref.current);
        }}
        onSectionInsert={insertSection}
        onImageInsert={insertImage}
      />
      <Link
        to="/me/stories/article-perview"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          localStorage.setItem(
            "article",
            JSON.stringify({ title: title, content: ref.current.innerHTML })
          );
        }}
      >
        perview article
      </Link>
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

        <div
          title="link"
          onClick={(e) => {
            e.stopPropagation();

            if (isLink) {
              removeLink();
              setisLink((prev) => !prev);
            } else {
              setLinkIsVisabale(true);
            }
          }}
          className="con-btn link-btn"
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="15px"
            height="15px"
            viewBox="0 0 442.246 442.246"
            fill={isLink ? "green" : "white"}
          >
            <g>
              <g>
                <path
                  d="M409.657,32.474c-43.146-43.146-113.832-43.146-156.978,0l-84.763,84.762c29.07-8.262,60.589-6.12,88.129,6.732
			l44.063-44.064c17.136-17.136,44.982-17.136,62.118,0c17.136,17.136,17.136,44.982,0,62.118l-55.386,55.386l-36.414,36.414
			c-17.136,17.136-44.982,17.136-62.119,0l-47.43,47.43c11.016,11.017,23.868,19.278,37.332,24.48
			c36.415,14.382,78.643,8.874,110.467-16.219c3.06-2.447,6.426-5.201,9.18-8.262l57.222-57.222l34.578-34.578
			C453.109,146.306,453.109,75.926,409.657,32.474z"
                />
                <path
                  d="M184.135,320.114l-42.228,42.228c-17.136,17.137-44.982,17.137-62.118,0c-17.136-17.136-17.136-44.981,0-62.118
			l91.8-91.799c17.136-17.136,44.982-17.136,62.119,0l47.43-47.43c-11.016-11.016-23.868-19.278-37.332-24.48
			c-38.25-15.3-83.232-8.262-115.362,20.502c-1.53,1.224-3.06,2.754-4.284,3.978l-91.8,91.799
			c-43.146,43.146-43.146,113.832,0,156.979c43.146,43.146,113.832,43.146,156.978,0l82.927-83.845
			C230.035,335.719,220.243,334.496,184.135,320.114z"
                />
              </g>
            </g>
          </svg>{" "}
          <div
            style={{ visibility: linkIsVisable ? "visible" : "hidden" }}
            className="link-box"
            title="link"
          >
            <input
              type="text"
              ref={inputRef}
              value={link}
              className="link-input"
              placeholder="enter the link"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLinkIsVisabale(false);
              }}
              style={{ color: "red" }}
              className="con-btn"
            >
              {" "}
              &#10006;{" "}
            </button>
            <button
              ref={ref2}
              style={{ color: "green" }}
              title="link"
              className="con-btn"
            >
              {" "}
              &#10003;
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            if (isQuote) {
              quoteOperation("remove");
              setisQuote(false);
            } else {
              quoteOperation("add");
              setisQuote(true);
            }
          }}
          className="con-btn"
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 57 57"
            width="30px"
            height="30px"
            stroke={isQuote ? "green" : "white"}
          >
            <g>
              <circle cx="18.5" cy="31.5" r="5.5" />
              <path
                d="M18.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S22.084,38,18.5,38z
		 M18.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S20.981,27,18.5,27z"
              />
            </g>
            <g>
              <circle cx="35.5" cy="31.5" r="5.5" />
              <path
                d="M35.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S39.084,38,35.5,38z
		 M35.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S37.981,27,35.5,27z"
              />
            </g>
            <path
              d="M13,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1
	c-6.617,0-12,5.383-12,12C14,31.553,13.553,32,13,32z"
            />
            <path
              d="M30,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1
	c-6.617,0-12,5.383-12,12C31,31.553,30.553,32,30,32z"
            />
          </svg>
        </button>
        <div className="tail"></div>
      </div>

      <input
        type="text"
        value={title}
        name="title"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        onInput={(e) => {
          if (isVisable) setisVisable(false);
          props.onChange({
            title: title,
            content: e.target.innerHTML,
          });
        }}
        onMouseUp={(e) => {
          setPosition({ top: e.pageY - 150 - 185, left: e.pageX - 220 });
        }}
        onSelect={getCaretPosition}
        onKeyUp={(e) => {
          if (!pressedKey) return;
          if (pressedKey.includes(e.key)) {
            setPressedKey((prev) => prev.filter((el) => el !== e.key));
          }
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Shift") {
            setPressedKey((prev) => Array.from(new Set([...prev, e.key])));
            if (pressedKey.includes("Enter") && pressedKey.includes("Shift")) {
              insertNewLine();
              e.preventDefault();

              console.log("you pressed shift and enter");
            }
          }
        }}
        ref={ref}
        className="content-div"
        contentEditable="true"
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
};

export default Editor;
