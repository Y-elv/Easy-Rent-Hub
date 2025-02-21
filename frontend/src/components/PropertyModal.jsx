import React, { useState } from "react";
import "../styles/propertyModal.css";
import { Upload, Button, Spin, Flex } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BaseUrl from "../utils/config";

const PropertyModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [offers, setOffers] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("you want to host your property?", {
    title,
    description,
    price,
    location,
    bedrooms,
    offers,
    imageFiles,
  });

  // Extract hostId from token
  let hostId = "";
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64));
      if (decodedPayload?.id) hostId = decodedPayload.id;
      console.log("hostId from property modal:", hostId);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Handle file upload
  const handleUpload = ({ fileList }) => {
    console.log("Selected files:", fileList); // Debugging: Log selected files
    setImageFiles(fileList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("hostId", hostId);
    formData.append("propertyAvailable", true);
    formData.append("bedrooms", bedrooms);
    offers.forEach((offer) => formData.append("offers", offer));

    console.log("Images before appending to FormData:", imageFiles);

    // Append images to FormData
    imageFiles.forEach((file, index) => {
      formData.append("images", file.originFileObj);
      console.log(`Appending Image ${index + 1}:`, file.originFileObj);
    });

    // Log FormData contents
    console.log("Final FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

   try {
     console.log("i reached in here -> FormData:", formData);
     console.log("token", token);

     
       const response = await axios.post(`${BaseUrl}/properties`, formData, {
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "multipart/form-data",
       },
     });

     toast.success("Property created successfully!");
     console.log("Property created successfully:", response.data);
     onClose();
   } catch (error) {
     console.error("Error creating property:", error);
     toast.error("Failed to create property.");
   }


    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Creating Property</h2>
        {loading ? (
          <Flex justify="center" align="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <label>Bedrooms:</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              required
            />

            <label>Offers (comma separated):</label>
            <input
              type="text"
              value={offers.join(", ")}
              onChange={(e) =>
                setOffers(e.target.value.split(",").map((o) => o.trim()))
              }
            />

            <label>Upload Images:</label>
            <Upload
              listType="picture"
              multiple
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

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

export default PropertyModal;
