import React, { useState, useEffect, useRef } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  IconButton,
  Flex,
  Box,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  List,
  ListItem,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { ChatIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

import Modallogin from "./Modallogin";
import Searchbar from "./SearchComponents/Searchbar";
import MobileSidebar from "./components/MobileSidebar";
import MobileLocationButton from "./components/MobileLocationButton";
import MobileLocationDropdown from "./components/MobileLocationDropdown";
import "./NavbarStyles.css"; // Import custom navbar styles
import "./styles/MobileSidebar.css"; // Import mobile sidebar styles

export default function Navbar({ auth, setAuth }) {
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  // for register and login
  const [staticModal, setStaticModal] = useState(false);
  const toggleShow = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("Toggle login modal");
    setStaticModal(!staticModal);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('India');
  const [coordinates, setCoordinates] = useState(null);

  // Add new state variables for location search
  const [searchQuery, setSearchQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // Modify the location dropdown to include popular locations
  const popularLocations = [
    { name: "Kolkata", state: "West Bengal" },
    { name: "Mumbai", state: "Maharashtra" },
    { name: "Chennai", state: "Tamil Nadu" },
    { name: "Pune", state: "Maharashtra" }
  ];

  // Add global style to disable hover effects but preserve sell button appearance
  useEffect(() => {
    // Create a style element to disable hover effects but keep sell button styles
    const style = document.createElement('style');
    style.innerHTML = `
      .mdb-navbar * {
        pointer-events: auto !important;
      }
      .mdb-navbar button,
      .mdb-navbar a,
      .mdb-navbar .btn,
      .mdb-navbar [class*="Button"],
      .mdb-navbar [class*="button"],
      .mdb-navbar [role="button"],
      .mdb-navbar [class*="icon"] {
        opacity: 1 !important;
        transition: none !important;
      }
      .mdb-navbar button:hover,
      .mdb-navbar a:hover,
      .mdb-navbar .btn:hover,
      .mdb-navbar [class*="Button"]:hover,
      .mdb-navbar [class*="button"]:hover,
      .mdb-navbar [role="button"]:hover,
      .mdb-navbar [class*="icon"]:hover {
        background: initial !important;
        background-color: initial !important;
        color: initial !important;
        opacity: 1 !important;
        filter: none !important;
        text-decoration: none !important;
      }
      /* Preserve sell button styles on hover with higher specificity */
      .navbar-right-elements .navbar-action-button .sell-button,
      .navbar-right-elements .navbar-action-button .sell-button:hover,
      .navbar-right-elements .navbar-action-button .sell-button:active,
      .navbar-right-elements .navbar-action-button .sell-button:focus {
        background-color: #37bac1 !important;
        color: white !important;
        opacity: 1 !important;
        border: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Initialize location from localStorage on component mount
  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        const locationData = JSON.parse(savedLocation);
        if (locationData && locationData.name) {
          setCurrentLocation(locationData.name);
          console.log('Initialized location from localStorage:', locationData.name);
        } else {
          // If no name is found in the saved location data, set default
          setCurrentLocation('India');
          localStorage.setItem('userLocation', JSON.stringify({ 
            name: 'India', 
            coordinates: null 
          }));
        }
      } else {
        // If no location data in localStorage, set default
        setCurrentLocation('India');
        localStorage.setItem('userLocation', JSON.stringify({ 
          name: 'India', 
          coordinates: null 
        }));
      }
      
      // Force refresh products after location is initialized
      getProducts();
    } catch (error) {
      console.error('Error loading location from localStorage:', error);
      // Reset to default if there's an error
      setCurrentLocation('India');
      localStorage.setItem('userLocation', JSON.stringify({ 
        name: 'India', 
        coordinates: null 
      }));
      
      // Force refresh products after location is initialized
      getProducts();
    }
  }, []);

  // Add event listener for location changes
  useEffect(() => {
    const handleLocationChange = () => {
      console.log('Location changed event detected');
      getProducts();
    };
    
    window.addEventListener('locationChanged', handleLocationChange);
    
    return () => {
      window.removeEventListener('locationChanged', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (!auth) return;
      
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://backend-retrend.onrender.com/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlistItems(response.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    
    fetchWishlistCount();
  }, [auth]);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      if (!auth) return;
      
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://backend-retrend.onrender.com/unreadMessages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUnreadMessages(response.data.count || 0);
      } catch (err) {
        console.error("Error fetching unread messages:", err);
      }
    };
    
    fetchUnreadMessages();
    
    const intervalId = setInterval(fetchUnreadMessages, 30000);
    
    return () => clearInterval(intervalId);
  }, [auth]);

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authemail");
    localStorage.removeItem("authname");
    localStorage.removeItem("authpicture");
    localStorage.removeItem("authphone");

    window.location.href = "/";
    setAuth(false);
  }
  const name = localStorage.getItem("authname");
  const picture = localStorage.getItem("authpicture");

  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const addressParts = response.data.address;
      
      // Create a more detailed address object
      const address = {
        area: addressParts.suburb || addressParts.neighbourhood || addressParts.residential,
        city: addressParts.city || addressParts.town || addressParts.municipality,
        state: addressParts.state,
        postcode: addressParts.postcode
      };

      // Set display name as area name if available, otherwise city
      const displayName = address.area || address.city || address.state || 'India';
      
      // Update state immediately
      setCurrentLocation(displayName);

      // Store complete location data
      const locationData = { 
        name: displayName,
        address: address,
        coordinates: { lat, lng } 
      };
      
      try {
        localStorage.setItem('userLocation', JSON.stringify(locationData));
        
        // Log for debugging
        console.log('Geolocation set:', displayName);
        console.log('Location data stored:', locationData);

        // Trigger product refresh
        window.dispatchEvent(new Event('locationChanged'));
        
        // Force UI update
        setTimeout(() => {
          setCurrentLocation(displayName);
        }, 100);
      } catch (error) {
        console.error('Error saving location to localStorage:', error);
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
      // Set default location on error
      setCurrentLocation('India');
      localStorage.setItem('userLocation', JSON.stringify({ 
        name: 'India', 
        coordinates: null 
      }));
    }
  };

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
    setIsSearching(true);
    fetchLocationSuggestions(value);
  };

  // Handle location suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    // Create a display name that includes city and state
    const displayName = suggestion.area ? 
      [suggestion.area, suggestion.city, suggestion.state].filter(Boolean).join(', ') :
      [suggestion.city, suggestion.state].filter(Boolean).join(', ');

    console.log("Setting location to:", displayName);
    
    // Update state immediately
    setCurrentLocation(displayName);
    setSearchQuery('');
    setIsSearching(false);
    setLocationSuggestions([]);

    // Store location data in localStorage
    const locationData = {
      name: displayName,
      address: {
        area: suggestion.area,
        city: suggestion.city,
        state: suggestion.state
      },
      coordinates: suggestion.coordinates
    };
    
    try {
      localStorage.setItem('userLocation', JSON.stringify(locationData));
      
      // Trigger location changed event to refresh products
      window.dispatchEvent(new Event('locationChanged'));
      
      // Log for debugging
      console.log('Location selected:', displayName);
      console.log('Location data stored:', locationData);
    } catch (error) {
      console.error('Error saving location to localStorage:', error);
    }
    
    // Force UI update
    setTimeout(() => {
      setCurrentLocation(displayName);
    }, 100);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getProducts = async () => {
    try {
      const savedLocation = localStorage.getItem('userLocation');
      const locationData = savedLocation ? JSON.parse(savedLocation) : null;
      
      const response = await axios.get("https://backend-retrend.onrender.com/getProducts", {
        params: {
          location: locationData?.name || 'India'
        }
      });
      
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Update the location button style to match the search box's rounded shape
  const LocationButton = () => (
    <Button
      onClick={() => {
        setIsSearching(prevState => !prevState);
        setSearchQuery('');
      }}
      leftIcon={<MDBIcon fas icon="map-marker-alt" />}
      bg="white"
      color="black"

      borderRadius="full"
      width="250px"
      display="flex"
      justifyContent="flex-start"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
      py="2"
    >
      {currentLocation}
    </Button>
  );

  // Add mobile responsiveness adjustments
  useEffect(() => {
    const handleResize = () => {
      // Use standard Bootstrap breakpoints
      const isMobile = window.innerWidth <= 767.98; // Mobile breakpoint (up to md)
      const isSmallMobile = window.innerWidth <= 575.98; // Small mobile breakpoint (up to sm)
      
      // Add a class to the body to help with mobile-specific styling
      if (isMobile) {
        document.body.classList.add('is-mobile');
        if (isSmallMobile) {
          document.body.classList.add('is-small-mobile');
        } else {
          document.body.classList.remove('is-small-mobile');
        }
      } else {
        document.body.classList.remove('is-mobile');
        document.body.classList.remove('is-small-mobile');
      }
      
      // Automatically collapse navbar on mobile after clicking a link
      if (isMobile) {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            setShowNavNoTogglerSecond(false);
          });
        });
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('is-mobile');
      document.body.classList.remove('is-small-mobile');
    };
  }, []);

  // Add a direct handler for selecting a location that will work on mobile
  const selectLocation = (locationName, locationData) => {
    console.log("Direct location selection:", locationName, locationData);
    
    // Update state immediately
    setCurrentLocation(locationName);
    setIsLocationDropdownOpen(false);
    
    // Store in localStorage
    try {
      localStorage.setItem('userLocation', JSON.stringify(locationData));
      
      // Trigger location changed event
      window.dispatchEvent(new Event('locationChanged'));
      
      // Force UI update and refresh products
      setTimeout(() => {
        setCurrentLocation(locationName);
        getProducts();
      }, 100);
    } catch (error) {
      console.error('Error saving location to localStorage:', error);
    }
  };

  // Handle mobile location dropdown visibility
  useEffect(() => {
    if (isSearching) {
      // Prevent body scrolling when dropdown is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restore body scrolling when dropdown is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isSearching]);

  return (
    <div className="mdb-navbar">
      <MDBNavbar
        expand="lg"
        className="mdb-navbar no-hover"
        style={{ 
          background: "linear-gradient(90deg, #FFFBF5, #C5BAFF 100%)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}
      >
        <MDBContainer fluid style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <div className="d-flex align-items-center">
            {/* Custom Hamburger Menu for Mobile */}
            <IconButton
              icon={<HamburgerIcon />}
              variant="ghost"
              aria-label="Open menu"
              display={{ base: "flex", lg: "none" }}
              onClick={toggleSidebar}
              className="hamburger-menu-btn"
              mr={2}
            />
            
            <Link to="/" className="d-flex align-items-center">
              <img 
                src="/honey (4 x 3 in) (1.8 x 0.9 in).png" 
                alt="RETREND" 
                className="logo" 
                style={{width:"140px",height:"80px"}}
              />
            </Link>
          </div>
          
          <div className="d-none d-lg-flex align-items-center justify-content-end flex-grow-1" style={{ gap: "20px", paddingRight: "40px", paddingLeft: "40px" }}>
            <div className="position-relative location-button-container" ref={searchRef} style={{ zIndex: 1001, position: "relative", marginLeft: "40px" }}>
              <Box position="relative" width="250px">
                <LocationButton />
              </Box>
              {isSearching && (
                <Box
                  position="absolute"
                  top="100%"
                  left="0"
                  right="0"
                  bg="white"
                  boxShadow="lg"
                  borderRadius="md"
                  zIndex={1000}
                  border="1px solid"
                  borderColor="gray.200"
                  mt={2}
                >
                  <Input
                    placeholder="Search city, area or locality"
                    value={searchQuery}
                    onChange={handleSearchInput}
                    border="none"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    borderRadius="0"
                    p={4}
                    autoFocus
                  />
                  
                  <Box maxH="400px" overflowY="auto">
                    <List>
                      <ListItem
                        p={3}
                        cursor="pointer"
                        
                        onClick={() => {
                          console.log("Using current location");
                          if (navigator.geolocation) {
                            // Show loading state
                            setCurrentLocation('Detecting location...');
                            
                            // Close the dropdown immediately to show feedback
                            setIsLocationDropdownOpen(false);
                            
                            navigator.geolocation.getCurrentPosition(
                              (position) => {
                                const { latitude, longitude } = position.coords;
                                console.log("Got coordinates:", latitude, longitude);
                                
                                // Use the coordinates directly
                                axios.get(
                                  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                                ).then(response => {
                                  const addressParts = response.data.address;
                                  
                                  // Create a more detailed address object
                                  const address = {
                                    area: addressParts.suburb || addressParts.neighbourhood || addressParts.residential,
                                    city: addressParts.city || addressParts.town || addressParts.municipality,
                                    state: addressParts.state,
                                    postcode: addressParts.postcode
                                  };
                                  
                                  // Set display name as area name if available, otherwise city
                                  const locationName = address.area || address.city || address.state || 'India';
                                  
                                  // Create location data
                                  const locationData = {
                                    name: locationName,
                                    address: address,
                                    coordinates: { lat: latitude, lng: longitude }
                                  };
                                  
                                  // Use direct selection
                                  selectLocation(locationName, locationData);
                                  
                                }).catch(error => {
                                  console.error('Error fetching location name:', error);
                                  selectLocation('India', { 
                                    name: 'India', 
                                    coordinates: null 
                                  });
                                });
                              },
                              (error) => {
                                console.error('Error getting location:', error);
                                selectLocation('India', { 
                                  name: 'India', 
                                  coordinates: null 
                                });
                              },
                              { 
                                enableHighAccuracy: true, 
                                timeout: 10000, 
                                maximumAge: 0 
                              }
                            );
                          } else {
                            console.log("Geolocation not supported");
                            selectLocation('India', { 
                              name: 'India', 
                              coordinates: null 
                            });
                          }
                        }}
                      >
                        <Flex align="center" color="gray.700">
                          <MDBIcon fas icon="location-arrow" className="me-2" />
                          <Text fontWeight="500">Use current location</Text>
                        </Flex>
                      </ListItem>

                      {searchQuery ? (
                        // Show search results
                        locationSuggestions.map((suggestion, index) => (
                          <ListItem
                            key={index}
                            p={3}
                            cursor="pointer"
                            bg={currentLocation === suggestion.displayName ? "gray.50" : "white"}
                            
                            onClick={() => {
                              // Create location name
                              const locationName = suggestion.area ? 
                                [suggestion.area, suggestion.city, suggestion.state].filter(Boolean).join(', ') :
                                [suggestion.city, suggestion.state].filter(Boolean).join(', ');
                              
                              // Create location data
                              const locationData = {
                                name: locationName,
                                address: {
                                  area: suggestion.area,
                                  city: suggestion.city,
                                  state: suggestion.state
                                },
                                coordinates: suggestion.coordinates
                              };
                              
                              // Use direct selection
                              selectLocation(locationName, locationData);
                            }}
                          >
                            <Flex align="center">
                              <MDBIcon fas icon="map-marker-alt" className="me-2" />
                              <Box>
                                <Text fontWeight="500">{suggestion.area || suggestion.city}</Text>
                                <Text fontSize="sm" color="gray.500">
                                  {suggestion.city}, {suggestion.state}
                                </Text>
                              </Box>
                            </Flex>
                          </ListItem>
                        ))
                      ) : (
                        <>
                          <Text p={2} fontSize="sm" color="gray.500" fontWeight="bold" bg="gray.50">
                            POPULAR LOCATIONS
                          </Text>
                          {popularLocations.map((loc, index) => (
                            <ListItem
                              key={index}
                              p={3}
                              cursor="pointer"
                              className={`location-item ${currentLocation === `${loc.name}, ${loc.state}` ? "location-selected" : ""}`}
                              borderBottom="1px solid"
                              borderColor="gray.100"
                              onClick={() => {
                                // Create location data
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
                                
                                // Use direct selection
                                selectLocation(locationName, locationData);
                              }}
                            >
                              <Flex align="center">
                                <MDBIcon fas icon="map-marker-alt" className="me-2" />
                                <Box>
                                  <Text fontWeight="500">{loc.name}</Text>
                                  <Text fontSize="sm" color="gray.500">{loc.state}</Text>
                                </Box>
                              </Flex>
                            </ListItem>
                          ))}
                        </>
                      )}
                    </List>
                  </Box>
                </Box>
              )}
            </div>
            
            <div className="search-container-wrapper">
              <Searchbar />
            </div>
          </div>
          
          {/* Hide the default navbar toggler when our custom sidebar is active */}
          <MDBNavbarToggler
            type="button"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
            className="d-lg-none navbar-toggler-custom-hidden"
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className="d-flex align-items-center justify-content-end flex-column flex-lg-row" style={{ gap: "24px" }}>
              {/* Mobile-only location dropdown */}
              <div className="d-lg-none d-block w-100 mb-3">
                <div className="mobile-search-header" style={{ position: "relative", width: "100%" }}>
                  <button
                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                    className="mobile-location-button"
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
                  
                  {isLocationDropdownOpen && (
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
                          zIndex: 990
                        }}
                        onClick={() => setIsLocationDropdownOpen(false)}
                      ></div>
                      
                      <div className="location-dropdown-container">
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "15px"
                        }}>
                          <h5 style={{ fontWeight: "bold", fontSize: "16px", margin: 0 }}>Select Location</h5>
                          <button 
                            onClick={() => setIsLocationDropdownOpen(false)}
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
                            onClick={() => {
                              if (navigator.geolocation) {
                                setCurrentLocation('Detecting location...');
                                setIsLocationDropdownOpen(false);
                                
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
                                      getProducts();
                                      
                                    }).catch(error => {
                                      selectLocation('India', { name: 'India', coordinates: null });
                                      getProducts();
                                    });
                                  },
                                  (error) => {
                                    selectLocation('India', { name: 'India', coordinates: null });
                                    getProducts();
                                  }
                                );
                              } else {
                                selectLocation('India', { name: 'India', coordinates: null });
                                getProducts();
                              }
                            }}
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
                                    onClick={() => {
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
                                      setIsLocationDropdownOpen(false);
                                      getProducts();
                                    }}
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
                                  onClick={() => {
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
                                    setIsLocationDropdownOpen(false);
                                    getProducts();
                                  }}
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
                  )}
                </div>
                <div className="search-container-wrapper d-flex align-items-center justify-content-center">
                  <Searchbar />
                </div>
              </div>
              
              {/* Mobile-only search */}
              <div className="d-lg-none d-block w-100 mb-3">
                <Searchbar />
              </div>
              
              {auth ? (
                <div className="navbar-right-elements d-flex align-items-center flex-wrap justify-content-center justify-content-lg-end" style={{ gap: "10px", marginRight: "15px" }}>
                  <MDBNavbarItem className="d-flex align-items-center navbar-action-button">
                    <Link to="/sell">
                      <button
                        className="sell-button"
                        style={{ 
                          borderRadius: "20px", 
                          padding: "10px 24px",
                          backgroundColor: "#37bac1",
                          border: "none",
                          color: "white",
                          fontWeight: "600",
                          transition: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <MDBIcon fas icon="plus" className="me-2" />
                        <span className="d-none d-sm-inline">SELL</span>
                      </button>
                    </Link>
                  </MDBNavbarItem>
                  
                  {/* Chat Button - Only visible on desktop */}
                  <MDBNavbarItem className="d-none d-lg-flex align-items-center navbar-action-button">
                    <Link to="/chat" style={{ position: 'relative' }}>
                      <IconButton
                        aria-label="Chat"
                        icon={<ChatIcon />}
                        variant="ghost"
                        colorScheme="blue"
                        fontSize="20px"
                        position="relative"
                      >
                        {unreadMessages > 0 && (
                          <Box
                            position="absolute"
                            top="-5px"
                            right="-5px"
                            bg="red.500"
                            color="white"
                            borderRadius="full"
                            w="18px"
                            h="18px"
                            fontSize="10px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {unreadMessages}
                          </Box>
                        )}
                      </IconButton>
                      <div className="tooltip">Chat</div>
                    </Link>
                  </MDBNavbarItem>
                  
                  {/* Wishlist Button - Only visible on desktop */}
                  <MDBNavbarItem className="d-none d-lg-flex align-items-center navbar-action-button">
                    <Link to="/wishlist" style={{ position: 'relative' }}>
                      <IconButton
                        aria-label="Wishlist"
                        icon={<FavoriteTwoToneIcon />}
                        variant="ghost"
                        colorScheme="pink"
                        fontSize="24px"
                        position="relative"
                      >
                        {wishlistItems.length > 0 && (
                          <Box
                            position="absolute"
                            top="-5px"
                            right="-5px"
                            bg="red.500"
                            color="white"
                            borderRadius="full"
                            w="18px"
                            h="18px"
                            fontSize="10px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {wishlistItems.length}
                          </Box>
                        )}
                      </IconButton>
                      <div className="tooltip">Wishlist</div>
                    </Link>
                  </MDBNavbarItem>
                  
                  {/* User Profile - Only visible on desktop */}
                  <MDBNavbarItem className="d-none d-lg-flex align-items-center">
                    <div className="profile-menu-container" style={{ position: 'relative' }}>
                      <Tooltip label="Profile Menu" placement="bottom" hasArrow>
                        <button
                          onClick={() => {
                            const profileMenu = document.getElementById('profile-dropdown');
                            if (profileMenu) {
                              profileMenu.style.display = profileMenu.style.display === 'none' ? 'block' : 'none';
                            }
                          }}
                          style={{
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            borderRadius: "50%",
                            minWidth: "auto",
                            height: "auto"
                          }}
                          className="avatar-container"
                        >
                          <Avatar size="sm" src={picture} />
                        </button>
                      </Tooltip>
                      <div 
                        id="profile-dropdown"
                        style={{
                          display: 'none',
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          borderRadius: '4px',
                          padding: '8px 0',
                          zIndex: 10000,
                          minWidth: '200px',
                          marginTop: '8px'
                        }}
                      >
                        <div style={{ padding: '8px 16px', textAlign: 'center' }}>
                          <p>{name}</p>
                        </div>
                        <hr style={{ margin: '8px 0' }} />
                        <Link to="/profile" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AccountBoxIcon style={{ marginRight: '8px' }} /> Profile
                          </div>
                        </Link>
                        <Link to="/myads" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <MDBIcon fas icon="clipboard-list" style={{ marginRight: '8px' }} /> My Ads
                          </div>
                        </Link>
                        <Link to="/wishlist" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FavoriteTwoToneIcon style={{ marginRight: '8px' }} /> Wishlist
                          </div>
                        </Link>
                        <div 
                          onClick={handleLogout}
                          style={{ display: 'block', padding: '8px 16px', cursor: 'pointer' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <LogoutIcon style={{ marginRight: '8px' }} /> Logout
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDBNavbarItem>
                </div>
              ) : (
                <div className="navbar-right-elements d-flex align-items-center flex-wrap justify-content-center justify-content-lg-end" style={{ gap: "15px", marginRight: "15px" }}>
                  <MDBNavbarItem className="d-none d-lg-flex align-items-center">
                    <MDBNavbarLink>
                      <button
                        onClick={(e) => toggleShow(e)}
                        style={{ 
                          borderRadius: "20px", 
                          padding: "8px 20px",
                          border: "1px solid teal",
                          backgroundColor: "transparent",
                          color: "teal",
                          cursor: "pointer",
                          zIndex: "5"
                        }}
                      >
                        Login
                      </button>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </div>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      
      {/* Mobile Sidebar Component */}
      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
        auth={auth} 
        handleLogout={handleLogout}
        toggleLoginModal={toggleShow}
      />
      
      {staticModal && <Modallogin show={staticModal} onHide={toggleShow} />}
    </div>
  );
}
