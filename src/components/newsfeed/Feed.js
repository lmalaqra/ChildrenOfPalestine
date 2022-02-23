import {
  ReactElement,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import axios from "axios";
import { userContext } from "../../userContext";
import { cloudinaryUpload } from "../../services/service";

const Feed = () => {
  const [test, settest] = useState();
  let imgUrl;
  const uploadImage = async (e) => {
    const fd = new FormData();

    fd.append("file", e.target.files[0], "file");

    axios
      .post("/cloudinary-upload", fd)
      .then((res) => settest(res.data.url))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "40vh" }}>
      <input type="file" onChange={uploadImage} />
      <h1>{test}</h1>
      <img src={test} alt="img"></img>
    </div>
  );
};
export default Feed;
