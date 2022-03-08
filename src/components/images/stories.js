import "./images.css";
import { Link } from "react-router-dom";

export default function Story(props) {
  return (
    <div
      title="story"
      onClick={(e) => {
        props.handleClick(e.currentTarget.title);
      }}
      class="img-container"
    >
      <Link to="/me/stories">
        <div class="img-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51">
            <title>stories</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_2-2" data-name="Layer 2">
                <rect
                  x="0.5"
                  y="0.5"
                  width="50"
                  height="50"
                  rx="5.58"
                  fill={props.seleceted === "stories" ? "black" : "white"}
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                />
                <line
                  x1="9.12"
                  y1="10.09"
                  x2="34.77"
                  y2="10.09"
                  fill="none"
                  stroke={props.seleceted === "stories" ? "white" : "black"}
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                />
                <line
                  x1="11.5"
                  y1="23.5"
                  x2="42.5"
                  y2="23.5"
                  fill="none"
                  stroke={props.seleceted === "stories" ? "white" : "black"}
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                />
                <line
                  x1="14.94"
                  y1="35.32"
                  x2="34.77"
                  y2="35.32"
                  fill="none"
                  stroke={props.seleceted === "stories" ? "white" : "black"}
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                />
              </g>
            </g>
          </svg>
        </div>
      </Link>
      <div class="des">
        <h1 className="tag">Stroies</h1>
        <div class="arrw"></div>
      </div>
    </div>
  );
}
