import React, { useState } from "react";
import "../styles/updateModal.css";
import { Upload, Button, Spin, Flex, Image } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BaseUrl from "../utils/config";

const UpdateModal = ({ onClose, property, id }) => {
  // State initialization
  const [title, setTitle] = useState(property?.title || "");
  const [description, setDescription] = useState(property?.description || "");
  const [price, setPrice] = useState(property?.price || "");
  const [location, setLocation] = useState(property?.location || "");
  const [bedrooms, setBedrooms] = useState(property?.bedrooms || "");
  const [offers, setOffers] = useState(property?.offers || []);
  const [loading, setLoading] = useState(false);

  // Ensure existing images from API are set in state
  const [imageUrls, setImageUrls] = useState(property?.imageUrls || []);

  const token = localStorage.getItem("token");

  // Handle image upload
  const handleUpload = ({ fileList }) => {
    console.log("Selected files from updated property:", fileList);

    // Convert fileList to image URLs or file objects
    const newImages = fileList.map((file) =>
      file.originFileObj ? file.originFileObj : file.url
    );

    // Append new images without removing old ones
    setImageUrls([...imageUrls, ...newImages]);

    console.log("Updated imageUrls state:", [...imageUrls, ...newImages]);
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("propertyAvailable", true);
    formData.append("bedrooms", bedrooms);

    offers.forEach((offer) => formData.append("offers", offer));

    // Debugging: Log images before appending
    console.log("Images before appending to FormData:", imageUrls);

    // Append images
    imageUrls.forEach((file, index) => {
      console.log(`Appending Image ${index + 1}:`, file);
      if (typeof file === "string") {
        formData.append("images", file); // Existing Cloudinary URL
      } else {
        formData.append("images", file); // New uploaded file
      }
    });

    // Log FormData contents
    console.log("Final FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.put(
        `${BaseUrl}/properties/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Property Updated successfully!");
      console.log("Property Updated successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error Updating property:", error);
      toast.error("Failed to Update property.");
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Updating Property</h2>

        {loading ? (
          <Flex justify="center" align="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Description */}
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Price */}
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            {/* Location */}
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            {/* Bedrooms */}
            <label>Bedrooms:</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              required
            />

            {/* Offers */}
            <label>Offers (comma separated):</label>
            <input
              type="text"
              value={offers.join(", ")}
              onChange={(e) =>
                setOffers(e.target.value.split(",").map((o) => o.trim()))
              }
            />

            {/* Image Upload */}
            <label>Upload Images:</label>
            <Upload
              listType="picture"
              multiple
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

            {/* Display Selected Images */}
            <div className="image-preview-container">
              {imageUrls.map((img, index) => (
                <div key={index} className="image-preview">
                  <Image
                    src={
                      typeof img === "string" ? img : URL.createObjectURL(img)
                    }
                    alt={`Preview ${index + 1}`}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  <CloseCircleOutlined
                    className="delete-icon"
                    onClick={() => handleDeleteImage(index)}
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <button type="submit" className="confirm-btn">
              Confirm
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateModal;
