import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Searchbar from '../SearchComponents/Searchbar';
import LocationSelectionPage from './LocationSelectionPage';
import '../styles/MobileSearchHeader.css';

const MobileSearchHeader = ({ currentLocation, setIsSearching, categoryViewMode, toggleCategoryView }) => {
  // State for location selection
  const [isLocationPageOpen, setIsLocationPageOpen] = useState(false);
  const [location, setLocation] = useState(currentLocation || 'India');
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Update location when it changes in localStorage
  useEffect(() => {
    const handleLocationChange = () => {
      try {
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation) {
          const locationData = JSON.parse(savedLocation);
          if (locationData && locationData.name) {
            setLocation(locationData.name);
          }
        }
      } catch (error) {
        console.error('Error loading location from localStorage:', error);
      }
    };
    
    // Set initial location
    handleLocationChange();
    
    // Listen for location changes
    window.addEventListener('locationChanged', handleLocationChange);
    
    return () => {
      window.removeEventListener('locationChanged', handleLocationChange);
    };
  }, []);

  // Handle location button click
  const handleLocationButtonClick = () => {
    setIsLocationPageOpen(true);
  };

  // Handle location selection
  const handleLocationSelected = (locationName) => {
    setLocation(locationName);
    setIsLocationPageOpen(false);
  };

  // Handle back button click
  const handleBackButtonClick = () => {
    setIsLocationPageOpen(false);
    navigate('/');
  };

  return (
    <div className="mobile-search-header">
      {/* Location Button */}
      <div style={{ position: "relative", width: "100%" }}>
        <button
          className="mobile-location-button"
          onClick={handleLocationButtonClick}
        >
          <MDBIcon fas icon="map-marker-alt" />
          <span className="location-text">{location}</span>
          <MDBIcon fas icon="chevron-down" style={{ fontSize: '12px', color: '#718096' }} />
        </button>
      </div>
      
      {/* Search Container */}
      <div className="mobile-search-container" ref={searchContainerRef}>
        <Searchbar />
      </div>
      
      {/* Location Selection Page - Full screen modal */}
      {isLocationPageOpen && (
        <LocationSelectionPage 
          onClose={handleBackButtonClick}
          onLocationSelected={handleLocationSelected}
        />
      )}
    </div>
  );
};

export default MobileSearchHeader; 