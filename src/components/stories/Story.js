import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router";
import Editor from "../editor/Editor";

export default function Story(props) {
  const navigate = useNavigate();
  const articleId = useRef();

  const onUnload = (e) => {
    e.preventDefault();
    window.alert("sup");
    e.returnValue = "";
  };
  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);
    console.log("what");
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  });
  useEffect(() => {
    if (articleId.current) {
      axios.interceptors.request.use((config) => {
        config.params = { articleId: JSON.parse(articleId.current) };
        return config;
      });
      return;
    }
    const axiosIgnoreInterceptor = axios.create();
    axiosIgnoreInterceptor
      .get("/articles")
      .then((res) => res.data)
      .then((result) => {
        articleId.current = result.articleId;
        axios.interceptors.request.use((config) => {
          config.params = { articleId: result.articleId };
          return config;
        });
      })
      .catch((e) => {
        navigate("/");
      });

    return () => {
      articleId.current = "";
      axios
        .delete("/articles/void")
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    };
  });

  return (
    <div style={{ padding: "2% 1%" }}>
      <h1 style={{ marginBottom: "120px" }}>Stories</h1>

      <Editor
        onChange={(value) => {
          props.onChange(value);
        }}
      />
    </div>
  );
}
