import { useState, useEffect, useContext } from "react";
import Image from "./Image";
import "./home_me.css";
import useWindowDimensions from "../../services/service";
import Home from "../images/Home";
import NotificationImg from "../images/notification";
import ListImg from "../images/List";
import StoryImg from "../images/stories";
import DraftImg from "../images/draft";
import { Routes, Route, useMatch } from "react-router";
import HomeContent from "./HomeMe";
import Blog from "../blog/Blog";
import Feed from "../newsfeed/Feed";
import Notification from "../notification/Notification";
import List from "../list/List";
import Story from "../stories/Story";
import Profile from "../profile/Profile";

const HomeMe = (props) => {
  const [seleceted, setSelected] = useState("home");
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    console.log(seleceted);
  }, [seleceted]);

  const handleSelection = (title) => {
    setSelected(title);
  };

  return (
    <div className="home-me-container">
      <div style={{ height: `${height}px` }} className="side-bar">
        <div className="me-logo">
          <Image
            src="/assets/images/rageHook.svg"
            alt="logo"
            width="70px"
            height="70px"
          />
        </div>
        <div className="me-controls">
          <Home handleClick={handleSelection} seleceted={seleceted} />
          <NotificationImg
            handleClick={handleSelection}
            seleceted={seleceted}
          />
          <ListImg handleClick={handleSelection} seleceted={seleceted} />
          <StoryImg handleClick={handleSelection} seleceted={seleceted} />
        </div>
        <div className="me-write">
          <DraftImg handleClick={handleSelection} seleceted={seleceted} />
        </div>
        <Profile />
      </div>
      <div className="me-content">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/me/notification" element={<Notification />} />
          <Route path="/me/lists" element={<List />} />
          <Route path="/me/stoies" element={<Story />} />
        </Routes>
      </div>
      <div className="me-upgrade"></div>
    </div>
  );
};

export default HomeMe;
