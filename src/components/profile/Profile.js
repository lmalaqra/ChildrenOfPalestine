import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { useData } from "./helper";
import "./profile.css";

const Profile = (props) => {
  const { data, isLoading, isError } = useData();

  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile-img">
          <div
            style={{
              backgroundImage: `url(${data.picture})`,
              width: "30px",
              height: "30px",
              borderRadius: "15px",
              backgroundPosition: "center top",
              backgroundSize: "cover ",
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Profile;
