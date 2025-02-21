import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../styles/HomePage.css";
import Layout from "../components/Layout";
import Search from "../components/Search";
import Card from "../components/card";
import PropertyModal from "../components/PropertyModal";
import BaseUrl from "../utils/config";

const HostPage = () => {

  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/properties/check/available`);
        const data = response.data.properties;
        console.log(data);
        const filteredData = data.map((item) => ({
          id: item.id, // Include ID
          title: item.title,
          location: item.location,
          price: item.price,
          imageUrl: item.imageUrls[0], // Take only the first image
          description: item.description.split(".")[0] + ".", // Take everything until the first period
        }));
        setProperties(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("you want to host your property?");

  // Function to handle click and navigate to details page
  const handleCardClick = (id) => {
    navigate(`/card/${id}`);
  };

  return (
    <div>
      <Layout />
      <div className="search">
        <Search />
        <div>
          <button
            className="host-button"
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Property
          </button>
          {isModalOpen && (
            <PropertyModal onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      </div>
      <div className="background">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => handleCardClick(property.id)}
            style={{ cursor: "pointer" }}
          >
            <Card
              title={property.title}
              description={property.description}
              price={property.price}
              location={property.location}
              imageUrl={property.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostPage;
