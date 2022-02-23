import "./images.css";
import { Link } from "react-router-dom";

export default function Notification(props) {
  return (
    <div
      title="notification"
      onClick={(e) => {
        console.log(e.currentTarget.title);
        props.handleClick(e.currentTarget.title);
      }}
      class="img-container"
    >
      <Link to="/me/notification">
        <div class="img-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 65.27">
            <title>notification</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_2-2" data-name="Layer 2">
                <path
                  id="_-Icon-Color"
                  data-name="🔹-Icon-Color"
                  d="M25.5,64.77a6.62,6.62,0,0,0,6.6-6.59H18.91A6.6,6.6,0,0,0,25.5,64.77ZM45.28,45V28.51c0-10.11-5.41-18.58-14.83-20.82V5.44a4.95,4.95,0,0,0-9.89,0V7.69C11.1,9.93,5.73,18.36,5.73,28.51V45L1.48,49.25a3.29,3.29,0,0,0,2.3,5.63H47.19a3.3,3.3,0,0,0,2.34-5.63Z"
                  fill={props.seleceted === "notification" ? "black" : "none"}
                  stroke="#000"
                  stroke-miterlimit="10"
                  fill-rule="evenodd"
                />
              </g>
            </g>
          </svg>
        </div>
      </Link>
      <div class="des">
        <h1 className="tag">Notification</h1>
        <div class="arrw"></div>
      </div>
    </div>
  );
}
