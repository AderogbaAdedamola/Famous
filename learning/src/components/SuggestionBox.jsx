import React, { useEffect, useState } from "react";
import "./styles/SuggestionBox.css";
import profilePlaceholder from "../assets/profile-placeholder.png"; // default avatar
import { fetchProfiles } from "../fetchProfile"; // your existing API

const SuggestionBox = ({ nameQuery, onSelect, isSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nameQuery || nameQuery === "") return;

    const fetchData = async () => {
      setLoading(true);

      const result = await fetchProfiles();
      if (typeof result === "string" && result.startsWith("error")) {
        setSuggestions([]);
      } else {
        // Assuming "otherProfiles" is an array of user objects
        const filtered = result.otherProfiles
          ?.filter((u) =>
            u.name.toLowerCase().includes(nameQuery.toLowerCase())
          )
          .slice(0, 5)
        setSuggestions(filtered || [])
        
      }

      setLoading(false);
    };

    fetchData();
  }, [nameQuery]);

  if (loading) {
    return (
      <div className="suggestion-box">
        {[...Array(3)].map((_, i) => (
          <div className="suggestion-skeleton" key={i}>
            <div className="skeleton-img"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="suggestion-box empty">
        <p>No user found</p>
      </div>
    );
  }

  return (
    <div className="suggestion-box"
        // style={{display: !isSearch && "none"}}
        >
      {suggestions.map((user) => (
        <div
          className="suggestion-item"
          key={user.$id}
          onClick={() =>{
            console.log(user.$id)
            onSelect(user.$id)}}
        >
          <div className="suggestion-image">
            <img
              src={user.image ? user.image : profilePlaceholder}
              alt={user.name}
              //onLoad={(e) => e.target.classList.add("loaded")}
            />
            {!user.image && <div className="img-skeleton"></div>}
          </div>
          <div className="suggestion-info">
            <h4>{user.name}</h4>
            <p>{user.role || "User"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionBox;
