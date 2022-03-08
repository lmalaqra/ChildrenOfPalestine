import { useState, useEffect, useRef } from "react";
import axios from "axios";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const dimensions = useRef(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      dimensions.current = getWindowDimensions();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions.current;
}

export const cloudinaryUpload = async (fileToUpload) => {
  const data = await axios
    .post("/cloudinary-upload", fileToUpload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  console.log(data);

  return data;
};
