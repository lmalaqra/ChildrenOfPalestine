import "./images.css";
import { Link } from "react-router-dom";

export default function Home(props) {
  return (
    <div class="img-container">
      <Link to="/">
        <div
          title="home"
          onClick={(e) => {
            props.handleClick(e.currentTarget.title);
          }}
          class="img-icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.72 55.22">
            <title>home</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_2-2" data-name="Layer 2">
                <polyline
                  points="50.37 26.58 24.61 0.72 0.36 26.58"
                  fill="#fff"
                  stroke="#000"
                  stroke-miterlimit="10"
                />
                <path
                  d="M46.86,26.18V51.67c0,1.24-.68,2.25-1.53,2.25H33.48c-.85,0-1.54-1-1.54-2.25V42c0-1.25-.68-2.25-1.53-2.25H20.32c-.85,0-1.53,1-1.53,2.25v9.68c0,1.24-.69,2.25-1.54,2.25H5.4c-.85,0-1.54-1-1.54-2.25V26.14"
                  fill="#fff"
                  stroke={props.seleceted === "home" ? "none" : "black"}
                  stroke-miterlimit="10"
                  stroke-width="1.04"
                />
                <path
                  d="M46.86,36.3V53.69a1.53,1.53,0,0,1-1.53,1.53H33.48a1.54,1.54,0,0,1-1.54-1.53V41.26a1.52,1.52,0,0,0-1.53-1.53H20.32a1.52,1.52,0,0,0-1.53,1.53V53.69a1.54,1.54,0,0,1-1.54,1.53H5.4a1.54,1.54,0,0,1-1.54-1.53V36.27a1.54,1.54,0,0,1,.42-1.05l15-16,4.39-4.67a1.54,1.54,0,0,1,2.21,0l4.69,4.71,15.89,16A1.56,1.56,0,0,1,46.86,36.3Z"
                  fill={props.seleceted === "home" ? "black" : "none"}
                  stroke="none"
                />
              </g>
            </g>
          </svg>
        </div>

        <div class="des">
          <h1 className="tag">Home</h1>
          <div class="arrw"></div>
        </div>
      </Link>
    </div>
  );
}
