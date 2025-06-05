import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import '../styles/MobileSearchSuggestions.css';

const MobileSearchSuggestions = ({ 
  isVisible, 
  onClose, 
  categorySuggestions,
  onCategoryClick
}) => {
  if (!isVisible) return null;

  return (
    <>
      <div className="mobile-search-overlay" onClick={onClose}></div>
      <div className="mobile-search-suggestions">
        <div className="mobile-search-suggestions-header">
          <div className="mobile-search-suggestions-title">
            Categories
          </div>
          <button 
            className="mobile-search-suggestions-close"
            onClick={onClose}
            aria-label="Close suggestions"
          >
            &times;
          </button>
        </div>
        
        <div className="mobile-search-suggestions-content">
          {/* Category suggestions */}
          {categorySuggestions.length > 0 ? (
            <>
              {categorySuggestions.map((category, index) => (
                <div 
                  key={`cat-${index}`}
                  className="mobile-search-suggestion-item"
                  onClick={() => {
                    onCategoryClick(category);
                    onClose();
                  }}
                >
                  <div className="mobile-search-suggestion-icon">
                    <MDBIcon fas icon="tag" />
                  </div>
                  <div className="mobile-search-suggestion-text">{category}</div>
                </div>
              ))}
            </>
          ) : (
            <div className="mobile-search-no-results">
              <p>No categories available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileSearchSuggestions; 