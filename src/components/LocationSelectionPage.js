import React, { useState, useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import '../styles/LocationSelectionPage.css';

const LocationSelectionPage = ({ onClose, onLocationSelected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  
  // Popular locations for quick selection
  const popularLocations = [
    { name: "Delhi", state: "Delhi" },
    { name: "Bangalore", state: "Karnataka" },
    { name: "Hyderabad", state: "Telangana" },
    { name: "Ahmedabad", state: "Gujarat" },
    { name: "Mumbai", state: "Maharashtra" },
    { name: "Chennai", state: "Tamil Nadu" },
    { name: "Kolkata", state: "West Bengal" },
    { name: "Pune", state: "Maharashtra" }
  ];

  // Function to fetch location suggestions
  const fetchLocationSuggestions = async (query) => {
    if (!query.trim()) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5&countrycodes=in`
      );

      const suggestions = response.data.map(location => ({
        area: location.address.suburb || location.address.neighbourhood || location.address.residential,
        city: location.address.city || location.address.town || location.address.municipality,
        state: location.address.state,
        displayName: [
          location.address.suburb || location.address.neighbourhood || location.address.residential,
          location.address.city || location.address.town || location.address.municipality,
          location.address.state
        ].filter(Boolean).join(', '),
        coordinates: {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon)
        }
      }));

      setLocationSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  // Handle location search input
  const handleSearchInput = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    fetchLocationSuggestions(value);
  };

  // Handle location selection
  const selectLocation = (locationName, locationData) => {
    // Store in localStorage
    try {
      localStorage.setItem('userLocation', JSON.stringify(locationData));
      
      // Trigger location changed event
      window.dispatchEvent(new Event('locationChanged'));
      
      // Notify parent component
      if (onLocationSelected) {
        onLocationSelected(locationName, locationData);
      }
      
      // Close the page
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving location to localStorage:', error);
    }
  };

  // Handle current location detection
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      // Show loading state
      onLocationSelected('Detecting location...', null);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          ).then(response => {
            const addressParts = response.data.address;
            
            const address = {
              area: addressParts.suburb || addressParts.neighbourhood || addressParts.residential,
              city: addressParts.city || addressParts.town || addressParts.municipality,
              state: addressParts.state,
              postcode: addressParts.postcode
            };
            
            const locationName = address.area || address.city || address.state || 'India';
            
            const locationData = {
              name: locationName,
              address: address,
              coordinates: { lat: latitude, lng: longitude }
            };
            
            selectLocation(locationName, locationData);
          }).catch(error => {
            selectLocation('India', { name: 'India', coordinates: null });
          });
        },
        (error) => {
          selectLocation('India', { name: 'India', coordinates: null });
        }
      );
    } else {
      selectLocation('India', { name: 'India', coordinates: null });
    }
  };

  // Hide navbar and category section when location page is open
  useEffect(() => {
    // Hide navbar and category section
    const navbar = document.querySelector('.navbar');
    const categorySection = document.querySelector('.category-section');
    const categoryNavbar = document.querySelector('.cat-navbar');
    const footer = document.querySelector('footer');
    const sidebarElements = document.querySelectorAll('.sidebar, .sidebar-container');
    
    // Hide elements
    if (navbar) navbar.style.display = 'none';
    if (categorySection) categorySection.style.display = 'none';
    if (categoryNavbar) categoryNavbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Hide any sidebar elements
    sidebarElements.forEach(el => {
      if (el) el.style.display = 'none';
    });
    
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Show elements again when component unmounts
      if (navbar) navbar.style.display = '';
      if (categorySection) categorySection.style.display = '';
      if (categoryNavbar) categoryNavbar.style.display = '';
      if (footer) footer.style.display = '';
      
      // Show sidebar elements
      sidebarElements.forEach(el => {
        if (el) el.style.display = '';
      });
      
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="location-selection-page">
      <div className="location-selection-header">
        <button 
          className="location-selection-back-btn"
          onClick={onClose}
          aria-label="Go back"
        >
          <MDBIcon fas icon="arrow-left" />
        </button>
        <h1 className="location-selection-title">Select Location</h1>
      </div>
      
      <div className="location-selection-content">
        <div className="location-search-container">
          <MDBIcon fas icon="search" className="location-search-icon" />
          <input
            type="text"
            className="location-search-input"
            placeholder="Search city, area or locality"
            value={searchQuery}
            onChange={handleSearchInput}
            autoFocus
          />
          {searchQuery && (
            <button 
              className="location-search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <MDBIcon fas icon="times" />
            </button>
          )}
        </div>
        
        <div 
          className="location-option current-location"
          onClick={handleCurrentLocation}
        >
          <div className="location-option-icon current">
            <MDBIcon fas icon="location-arrow" />
          </div>
          <div className="location-option-text">
            <p className="location-name">Use current location</p>
            <p className="location-description">Using GPS</p>
          </div>
        </div>
        
        <div className="location-suggestions-container">
          {searchQuery ? (
            locationSuggestions.length > 0 ? (
              <>
                <div className="location-section-title">SEARCH RESULTS</div>
                {locationSuggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="location-option"
                    onClick={() => selectLocation(
                      suggestion.city || suggestion.area || suggestion.displayName,
                      {
                        name: suggestion.city || suggestion.area || suggestion.displayName,
                        address: {
                          area: suggestion.area,
                          city: suggestion.city,
                          state: suggestion.state
                        },
                        coordinates: suggestion.coordinates
                      }
                    )}
                  >
                    <div className="location-option-icon">
                      <MDBIcon fas icon="map-marker-alt" />
                    </div>
                    <div className="location-option-text">
                      <p className="location-name">
                        {suggestion.city || suggestion.area || "Location"}
                      </p>
                      {suggestion.state && (
                        <p className="location-description">{suggestion.state}</p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-results">
                <p>No locations found for "{searchQuery}"</p>
                <p>Try a different search term</p>
              </div>
            )
          ) : (
            <>
              <div className="location-section-title">POPULAR LOCATIONS</div>
              {popularLocations.map((location, index) => (
                <div 
                  key={index} 
                  className="location-option"
                  onClick={() => selectLocation(
                    location.name,
                    {
                      name: location.name,
                      address: {
                        city: location.name,
                        state: location.state
                      },
                      coordinates: null
                    }
                  )}
                >
                  <div className="location-option-icon">
                    <MDBIcon fas icon="map-marker-alt" />
                  </div>
                  <div className="location-option-text">
                    <p className="location-name">{location.name}</p>
                    <p className="location-description">{location.state}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelectionPage; 