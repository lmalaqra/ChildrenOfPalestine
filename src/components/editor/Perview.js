import "./editor.css";
import { useState, useEffect, useRef } from "react";
import Controller from "./components/Controller";

const Perview = (props) => {
  const [article, setarticle] = useState({ title: "", content: "" });
  const ref = useRef();
  useEffect(() => {
    const newArticle = localStorage.getItem("article");
    if (newArticle) {
      setarticle(JSON.parse(newArticle));

      console.log(article);
    }
  }, []);

  return (
    <div>
      <Controller />
      <h1 style={{ fontSize: "1.5em" }}>{article.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: article.content }}
        ref={ref}
        className="articleContent"
      ></div>
    </div>
  );
};
export default Perview;
