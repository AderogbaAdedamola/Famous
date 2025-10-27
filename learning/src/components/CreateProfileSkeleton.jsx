import React from "react";
import "./styles/CreateProfileSkeleton.css";

const CreateProfileSkeleton = () => {
  return (
    <div className="create-profile-container">
      <main className="create-profile-main">
        <div className="create-profile-form skeleton-form">
          <div className="img-info-container">
            {/* Photo Section */}
            <div className="img-container">
              <div className="skeleton-title shimmer"></div>
              <div className="skeleton-subtext shimmer"></div>
              <div className="your-photo-container shimmer"></div>
              <div className="skeleton-line short shimmer"></div>
              <div className="skeleton-btn shimmer"></div>
              <div className="skeleton-btn shimmer"></div>
            </div>

            {/* Info Section */}
            <div className="info-container">
              <div className="skeleton-label shimmer"></div>
              <div className="skeleton-input shimmer"></div>

              <div className="skeleton-label shimmer"></div>
              <div className="skeleton-input shimmer"></div>

              <div className="skeleton-label shimmer"></div>
              <div className="skeleton-textarea shimmer"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="save-button-container skeleton-footer">
            <div className="skeleton-btn small shimmer"></div>
            <div className="skeleton-btn shimmer"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProfileSkeleton;
