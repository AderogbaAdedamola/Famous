import React from "react";
import "./styles/SingleUserProfileSkeleton.css";

const SingleUserProfileSkeleton = () => {
  return (
    <div className="skeleton-profile-container">
      <div className="skeleton-banner shimmer"></div>

      <div className="skeleton-profile-info">
        <div className="skeleton-avatar shimmer"></div>

        <div className="skeleton-text-group">
          <div className="skeleton-text name shimmer"></div>
          <div className="skeleton-text role shimmer"></div>
          <div className="skeleton-text email shimmer"></div>
        </div>
      </div>

      <div className="skeleton-bio">
        <div className="skeleton-text bio-line shimmer"></div>
        <div className="skeleton-text bio-line shimmer"></div>
        <div className="skeleton-text bio-line shimmer"></div>
      </div>
    </div>
  );
};

export default SingleUserProfileSkeleton;
