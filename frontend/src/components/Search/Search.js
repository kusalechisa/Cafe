import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./search.module.css";

Search.defaultProps = {
  searchRoute: "/search/",
  defaultRoute: "/",
  placeholder: "Search Food!",
  imgSrc: "./image.png",
};

export default function Search({
  searchRoute,
  defaultRoute,
  margin,
  placeholder,
  imgSrc,
}) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm ?? "");
  }, [searchTerm]);

  useEffect(() => {
    // Only navigate if term is not empty
    if (term) {
      navigate(searchRoute + term);
    } else {
      navigate(defaultRoute);
    }
  }, [term, navigate, searchRoute, defaultRoute]);

  return (
    <div className={classes.container} style={{ margin }}>
      <div className={classes.imagebg}>
        {imgSrc && (
          <img src={imgSrc} alt="Search Icon" className={classes.searchImage} />
        )}
      </div>

      <div className={classes.searchInputContainer}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
      </div>
    </div>
  );
}
