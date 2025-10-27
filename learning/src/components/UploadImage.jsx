import React, { useState } from "react";
//import axios from "axios";

const CloudinaryUpload = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(selected.type)) {
      setError("Only image files (JPG, PNG, WEBP) are allowed!");
      setFile(null);
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("File must be less than 5MB!");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  };

  const uploadImage = async () => {
    if (!file) {
      setError("Please select a valid image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // set in Cloudinary
    formData.append("cloud_name", "YOUR_CLOUD_NAME");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(percent);
          },
        }
      );
      setUrl(res.data.secure_url);
      setProgress(100);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Upload Image (Max 5MB)</h2>

      <label
        style={{
          background: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          display: "inline-block",
        }}
      >
        Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {file && <p>Selected: {file.name}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={uploadImage}
        style={{
          background: "#28a745",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Upload
      </button>

      <h3>Progress: {progress}%</h3>

      {url && (
        <div>
          <p>Uploaded Image:</p>
          <img src={url} alt="uploaded" width="200" style={{ borderRadius: "10px" }} />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
