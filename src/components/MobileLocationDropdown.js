import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';

const MobileLocationDropdown = ({ 
  isOpen, 
  onClose, 
  currentLocation, 
  setCurrentLocation,
  searchQuery,
  setSearchQuery,
  locationSuggestions,
  popularLocations,
  handleSearchInput,
  selectLocation
}) => {
  
  if (!isOpen) return null;
  
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setCurrentLocation('Detecting location...');
      onClose();
      
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
  
  const handleLocationSelect = (suggestion) => {
    const locationName = suggestion.area ? 
      [suggestion.area, suggestion.city, suggestion.state].filter(Boolean).join(', ') :
      [suggestion.city, suggestion.state].filter(Boolean).join(', ');
    
    const locationData = {
      name: locationName,
      address: {
        area: suggestion.area,
        city: suggestion.city,
        state: suggestion.state
      },
      coordinates: suggestion.coordinates
    };
    
    selectLocation(locationName, locationData);
    onClose();
  };
  
  const handlePopularLocationSelect = (loc) => {
    const locationName = `${loc.name}, ${loc.state}`;
    const locationData = {
      name: locationName,
      address: {
        area: null,
        city: loc.name,
        state: loc.state
      },
      coordinates: { lat: null, lng: null }
    };
    
    selectLocation(locationName, locationData);
    onClose();
  };
  
  return (
    <>
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          zIndex: 1090
        }}
        onClick={onClose}
      />
      
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          left: "15px",
          right: "15px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
          maxHeight: "70vh",
          overflowY: "auto",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          zIndex: 1100,
          padding: "15px"
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px"
        }}>
          <h5 style={{ fontWeight: "bold", fontSize: "16px", margin: 0 }}>Select Location</h5>
          <button 
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#333",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              cursor: "pointer",
              padding: 0
            }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        <input
          type="text"
          style={{
            width: "100%",
            padding: "10px 15px",
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            marginBottom: "15px",
            fontSize: "14px"
          }}
          placeholder="Search city, area or locality"
          value={searchQuery}
          onChange={handleSearchInput}
          autoFocus
        />
        
        <div style={{ marginTop: "10px" }}>
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
              cursor: "pointer"
            }}
            onClick={handleCurrentLocation}
          >
            <span style={{ marginRight: "10px", color: "#37bac1" }}>
              <MDBIcon fas icon="location-arrow" />
            </span>
            <div>
              <p style={{ fontWeight: "500", margin: 0 }}>Use current location</p>
            </div>
          </div>
          
          {searchQuery ? (
            locationSuggestions.length > 0 ? (
              <>
                <div style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#666",
                  margin: "10px 0",
                  padding: "5px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px"
                }}>
                  SEARCH RESULTS
                </div>
                {locationSuggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      borderBottom: index < locationSuggestions.length - 1 ? "1px solid rgba(0, 0, 0, 0.05)" : "none",
                      cursor: "pointer"
                    }}
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    <span style={{ marginRight: "10px", color: "#37bac1" }}>
                      <MDBIcon fas icon="map-marker-alt" />
                    </span>
                    <div>
                      <p style={{ fontWeight: "500", margin: 0 }}>{suggestion.area || suggestion.city}</p>
                      <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0 0" }}>{suggestion.city}, {suggestion.state}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "15px", color: "#666" }}>
                No locations found. Try a different search.
              </div>
            )
          ) : (
            <>
              <div style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#666",
                margin: "10px 0",
                padding: "5px",
                backgroundColor: "#f9f9f9",
                borderRadius: "5px"
              }}>
                POPULAR LOCATIONS
              </div>
              {popularLocations.map((loc, index) => (
                <div 
                  key={index} 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    borderBottom: index < popularLocations.length - 1 ? "1px solid rgba(0, 0, 0, 0.05)" : "none",
                    cursor: "pointer"
                  }}
                  onClick={() => handlePopularLocationSelect(loc)}
                >
                  <span style={{ marginRight: "10px", color: "#37bac1" }}>
                    <MDBIcon fas icon="map-marker-alt" />
                  </span>
                  <div>
                    <p style={{ fontWeight: "500", margin: 0 }}>{loc.name}</p>
                    <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0 0" }}>{loc.state}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileLocationDropdown; 