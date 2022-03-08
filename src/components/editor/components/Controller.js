import "./controller.css";
import { useState, useEffect } from "react";

const Controller = (props) => {
  const [active, setactive] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      setactive(false);
    });
  }, []);
  return (
    <div className="insert-container ">
      <div
        className={`insert-btn controller ${active ? "rotate" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setactive((prev) => !prev);
        }}
      >
        +
      </div>
      <div className="others">
        <div className={`mask ${active ? "expand" : ""}`}>
          <div className={`insert-btn image ${active ? "active" : ""}`}>
            <label className="label">Add An Image</label>
            <input
              onChange={(e) => {
                e.stopPropagation();
                const uploadData = new FormData();
                uploadData.append("file", e.target.files[0], "file");
                props.onImageInsert(uploadData);
              }}
              style={{ visibility: "hidden" }}
              type="file"
              id="image"
            />
            <label className="img-label" htmlFor="image">
              <img
                style={{ width: "100%" }}
                src="/assets/images/image.svg"
                alt="insert "
              ></img>
            </label>
          </div>
          <div className={`insert-btn video ${active ? "active" : ""}`}>
            <label className="label">Add A Video</label>
            <input
              onChange={(e) => {
                e.stopPropagation();
                const uploadData = new FormData();
                uploadData.append("file", e.target.files[0], "file");
                props.onVideoInsert(uploadData);
              }}
              style={{ display: "none" }}
              type="file"
              id="video"
            />
            <label className="img-label" htmlFor="video">
              <img src="/assets/images/video.svg"></img>
            </label>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              props.onTitleInsert();
              setactive((prev) => !prev);
            }}
            className={`insert-btn title ${active ? "active" : ""}`}
          >
            <label className="label"> Add A Title</label>
            <img
              style={{ width: "20px", height: "20px" }}
              src="/assets/images/title.svg"
            ></img>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              props.onSectionInsert();
              setactive((prev) => !prev);
            }}
            className={`insert-btn section ${active ? "active" : ""}`}
          >
            <label className="label">Add A New Section</label>
            <img
              style={{ width: "20px", height: "20px" }}
              src="/assets/images/section.svg"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controller;
