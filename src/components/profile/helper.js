import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useData = () => {
  const [data, setData] = useState({
    id: "",
    picture: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState({
    error: false,
    message: "",
  });
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    setmounted(true);
    console.log("this is fired");

    const fetchData = async () => {
      try {
        console.log("this is working");
        setIsLoading(true);
        const fetchedData = await axios
          .get("/profile")
          .then((res) => res.data.user)
          .catch((e) => {
            console.log(e);
          });

        setData((prev) => {
          return {
            ...prev,
            id: fetchedData._id,
            email: fetchedData.email,
            picture: fetchedData.picture,
          };
        });

        setIsLoading(false);
      } catch (e) {
        if (e) setisError({ error: true, message: e });
      }
    };

    fetchData();

    return () => {
      setmounted(false);
    };
  }, []);

  return { data: data, isLoading: isLoading, isError: isError };
};
