import React, { useState, useRef, useEffect } from 'react';
import { MDBBtn, MDBIcon, MDBInputGroup } from 'mdb-react-ui-kit';
import { Box, Text, Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileSearchSuggestions from '../components/MobileSearchSuggestions';
import './Searchbar.css'; // Import the Searchbar CSS

// List of categories for suggestions
const categories = [
  'Cars', 'Properties', 'Mobiles', 'Jobs', 'Bikes', 
  'Electronics & Appliances', 'Commercial Vehicles & Spares', 
  'Furniture', 'Fashion', 'Books, Sports & Hobbies', 'Pets'
];

export default function Searchbar() {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const searchRef = useRef(null);
  const searchTimeout = useRef(null);
  const navigate = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767.98);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    if (!isMobile) {
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        try {
          const parsedSearches = JSON.parse(savedSearches);
          if (Array.isArray(parsedSearches)) {
            setRecentSearches(parsedSearches);
          }
        } catch (error) {
          console.error('Error parsing recent searches:', error);
          localStorage.removeItem('recentSearches');
        }
      }
    }
  }, [isMobile]);

  // Handle body scroll when search is focused on mobile
  useEffect(() => {
    if (isMobile && showMobileSuggestions) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, showMobileSuggestions]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    // Clear previous timeout to prevent multiple API calls
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    // Only fetch suggestions if there's input
    if (value.trim()) {
      setIsLoading(true);
      
      // Filter categories based on input
      const matchingCategories = categories.filter(category => 
        category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 3); // Limit to 3 category suggestions
      
      setCategorySuggestions(matchingCategories);
      
      // Only fetch product suggestions for desktop
      if (!isMobile) {
        // Debounce API call to prevent too many requests
        searchTimeout.current = setTimeout(() => {
          fetchSuggestions(value);
        }, 300);
      } else {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setCategorySuggestions([]);
      setIsLoading(false);
    }
  };
  
  const fetchSuggestions = async (query) => {
    // Skip fetching suggestions on mobile
    if (isMobile) {
      setIsLoading(false);
      return;
    }
    
    try {
      // Add mock suggestions for testing if API doesn't return results
      const mockSuggestions = [
        { title: `${query} - Product 1`, _id: 'mock1' },
        { title: `${query} - Product 2`, _id: 'mock2' }
      ];
      
      const response = await axios.get(`https://backend-retrend.onrender.com/search?q=${encodeURIComponent(query)}`);
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        // Limit to 5 suggestions
        setSuggestions(response.data.slice(0, 5));
      } else {
        // Use mock data if no results
        console.log('No suggestions from API, using mock data');
        setSuggestions(mockSuggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // Use mock data on error
      const mockSuggestions = [
        { title: `${query} - Product 1`, _id: 'mock1' },
        { title: `${query} - Product 2`, _id: 'mock2' }
      ];
      setSuggestions(mockSuggestions);
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Save to recent searches in localStorage (only on desktop)
      if (!isMobile) {
        saveRecentSearch(input.trim());
      }
      
      // Close any open suggestions
      setShowMobileSuggestions(false);
      setIsFocused(false);
      
      // Navigate to search results
      navigate(`/results?query=${encodeURIComponent(input)}`);
    }
  };
  
  const saveRecentSearch = (term) => {
    // Skip saving recent searches on mobile
    if (isMobile) return;
    
    // Get existing searches or initialize empty array
    let searches = [];
    try {
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        searches = JSON.parse(savedSearches);
      }
    } catch (error) {
      console.error('Error parsing saved searches:', error);
    }
    
    // Only keep unique searches
    if (!Array.isArray(searches)) searches = [];
    
    // Remove the term if it already exists (to move it to the top)
    searches = searches.filter(item => item.toLowerCase() !== term.toLowerCase());
    
    // Add the new term at the beginning
    searches.unshift(term);
    
    // Keep only the 5 most recent searches
    searches = searches.slice(0, 5);
    
    // Update state and localStorage
    setRecentSearches(searches);
    localStorage.setItem('recentSearches', JSON.stringify(searches));
  };

  // Handle click outside to remove focus effect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
        setShowMobileSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    // Close suggestions
    setShowMobileSuggestions(false);
    setIsFocused(false);
    
    // Navigate to category
    navigate(`/${category}`);
  };

  // Handle product suggestion click
  const handleProductClick = (product) => {
    // Close suggestions
    setIsFocused(false);
    
    if (product._id && product._id !== 'mock1' && product._id !== 'mock2') {
      navigate(`/preview_ad/${product._id}`);
    } else {
      // Use product title as search term
      const searchTerm = product.title || product.name || product.description || '';
      saveRecentSearch(searchTerm);
      navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  // Handle recent search click
  const handleRecentSearchClick = (search) => {
    // Close suggestions
    setIsFocused(false);
    
    navigate(`/results?query=${encodeURIComponent(search)}`);
  };
  
  // Handle focus event
  const handleFocus = () => {
    setIsFocused(true);
    
    // Only show category suggestions on mobile if we have categories
    if (isMobile && categorySuggestions.length > 0) {
      setShowMobileSuggestions(true);
    }
  };
  
  // Close mobile suggestions
  const closeMobileSuggestions = () => {
    setShowMobileSuggestions(false);
  };

  return (
    <div className={`search-container ${isMobile ? 'mobile' : ''}`} ref={searchRef}>
      <form onSubmit={onSubmit} className="search-form">
        <MDBInputGroup className="mb-0 search-input-group">
          <input
            className="form-control"
            placeholder="Search for anything..."
            value={input}
            onChange={handleChange}
            onFocus={handleFocus}
            aria-label="Search"
            style={{ 
              borderRadius: isMobile ? '20px' : '30px 0 0 30px',
              paddingLeft: '15px',
              height: isMobile ? '40px' : '48px',
              fontSize: isMobile ? '14px' : '16px',
            }}
          />
          <MDBBtn
            type="submit"
            color="info"
            className="search-button"
            style={{
              borderRadius: isMobile ? '0 20px 20px 0' : '0 30px 30px 0',
              height: isMobile ? '40px' : '48px',
              minWidth: '48px',
              padding: '0 16px',
            }}
          >
            <MDBIcon fas icon="search" />
          </MDBBtn>
        </MDBInputGroup>
      </form>

      {/* Desktop Suggestions dropdown */}
      {!isMobile && isFocused && (input.trim() || recentSearches.length > 0) && (
        <Box 
          className="search-suggestions"
          position="absolute"
          top="calc(100% + 5px)"
          left="0"
          right="0"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          zIndex={200}
          border="1px solid"
          borderColor="gray.200"
          maxH="400px"
          overflowY="auto"
          width="100%"
        >
          {isLoading ? (
            <Flex justify="center" p={4}>
              <Spinner size="sm" color="blue.500" mr={2} />
              <Text>Searching...</Text>
            </Flex>
          ) : (
            <>
              {/* Category suggestions */}
              {categorySuggestions.length > 0 && (
                <Box p={2}>
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1} px={2}>
                    CATEGORIES
                  </Text>
                  {categorySuggestions.map((category, index) => (
                    <Box 
                      key={`cat-${index}`}
                      p={1.5}
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <Flex align="center">
                        <MDBIcon fas icon="tag" className="me-2" style={{ color: "#718096" }} />
                        <Text fontSize="md">{category}</Text>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Product suggestions */}
              {suggestions.length > 0 && (
                <Box p={2}>
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1} px={2}>
                    SUGGESTIONS
                  </Text>
                  {suggestions.map((suggestion, index) => (
                    <Box 
                      key={`sug-${index}`}
                      p={1.5}
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => handleProductClick(suggestion)}
                    >
                      <Flex align="center">
                        <MDBIcon fas icon="search" className="me-2" style={{ color: "#718096" }} />
                        <Text fontSize="md">{suggestion.title}</Text>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Recent searches */}
              {input.trim() === '' && recentSearches.length > 0 && (
                <Box p={2}>
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1} px={2}>
                    RECENT SEARCHES
                  </Text>
                  {recentSearches.map((search, index) => (
                    <Box 
                      key={`recent-${index}`}
                      p={1.5}
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      <Flex align="center">
                        <MDBIcon fas icon="history" className="me-2" style={{ color: "#718096" }} />
                        <Text fontSize="md">{search}</Text>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              )}

              {/* No results message */}
              {input.trim() && !isLoading && suggestions.length === 0 && categorySuggestions.length === 0 && (
                <Box p={4} textAlign="center">
                  <Text color="gray.500">No results found for "{input}"</Text>
                  <Text fontSize="sm" mt={1}>Try a different search term</Text>
                </Box>
              )}
            </>
          )}
        </Box>
      )}
      
      {/* Mobile Category Suggestions Only */}
      {isMobile && (
        <MobileSearchSuggestions
          isVisible={showMobileSuggestions}
          onClose={closeMobileSuggestions}
          categorySuggestions={categorySuggestions}
          onCategoryClick={handleCategoryClick}
        />
      )}
    </div>
  );
}
