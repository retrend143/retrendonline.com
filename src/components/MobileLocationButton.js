import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';

const MobileLocationButton = ({ currentLocation, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "20px",
        padding: "8px 16px",
        fontSize: "14px",
        color: "#4a5568",
        width: "280px",
        maxWidth: "90%",
        margin: "0 auto",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "relative",
        zIndex: "1000"
      }}
    >
      <MDBIcon fas icon="map-marker-alt" style={{ color: "#37bac1", minWidth: "16px" }} />
      <span style={{ 
        maxWidth: "200px", 
        overflow: "hidden", 
        textOverflow: "ellipsis",
        fontWeight: currentLocation === 'India' ? "normal" : "500",
        flex: 1,
        textAlign: "left"
      }}>
        {currentLocation}
      </span>
      <MDBIcon fas icon="chevron-down" style={{ fontSize: "12px", color: "#718096", minWidth: "12px" }} />
    </button>
  );
};

export default MobileLocationButton; 