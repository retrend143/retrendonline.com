import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { categories } from "./resources/Catagories";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Grid,
  GridItem,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// Import Material-UI icons
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ChairIcon from '@mui/icons-material/Chair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PetsIcon from '@mui/icons-material/Pets';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WorkIcon from '@mui/icons-material/Work';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// Add new icon imports
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import BusinessIcon from '@mui/icons-material/Business';
import TvIcon from '@mui/icons-material/Tv';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ConstructionIcon from '@mui/icons-material/Construction';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

// Import the CSS files
import "./styles/CategoryGridView.css";
import "./styles/MobileSearchHeader.css";

// Import the MobileSearchHeader component
import MobileSearchHeader from "./components/MobileSearchHeader";

// Map categories to icons
const categoryIcons = {
  'Home': HomeIcon,
  'Cars': DirectionsCarIcon,
  'Properties': ApartmentIcon,
  'Mobiles': SmartphoneIcon,
  'Jobs': WorkIcon,
  'Bikes': TwoWheelerIcon,
  'Electronics & Appliances': TvIcon,
  'Commercial Vehicles & Spares': LocalShippingIcon,
  'Furniture': ChairIcon,
  'Fashion': CheckroomIcon,
  'Books, Sports & Hobbies': SportsSoccerIcon,
  'Pets': PetsIcon,
  'Services': BusinessIcon,
  'Kids': ChildCareIcon,
  'Agriculture': AgricultureIcon,
  'Gaming': SportsEsportsIcon,
  'Music': MusicNoteIcon,
  'Tools & Machinery': ConstructionIcon,
};

// Map categories to image CSS classes
const categoryImageClasses = {
  'Cars': 'category-image-cars',
  'Properties': 'category-image-properties',
  'Mobiles': 'category-image-mobiles',
  'Jobs': 'category-image-jobs',
  'Bikes': 'category-image-bikes',
  'Electronics & Appliances': 'category-image-electronics',
  'Furniture': 'category-image-furniture',
  'Fashion': 'category-image-fashion',
  'Books, Sports & Hobbies': 'category-image-books',
  'Pets': 'category-image-pets',
  'Services': 'category-image-services',
};

export default function CatNavbar() {
  const [isMobileMenuScreen] = useMediaQuery("(max-width: 480px)"); // Renamed for clarity, may control an alternative menu visibility
  const [isMobileLayout] = useMediaQuery("(max-width: 767px)"); // For category list horizontal scroll layout
  const [categoryViewMode, setCategoryViewMode] = useState('grid'); // Changed from 'carousel' to 'grid' as default
  const [isSearching, setIsSearching] = useState(false); // For location search dropdown
  const [currentLocation, setCurrentLocation] = useState('India'); // Current location

  // Get location from localStorage on mount
  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        const locationData = JSON.parse(savedLocation);
        if (locationData && locationData.name) {
          setCurrentLocation(locationData.name);
        }
      }
    } catch (error) {
      console.error('Error loading location from localStorage:', error);
    }
  }, []);

  const toggleCategoryView = () => {
    setCategoryViewMode(prevMode => prevMode === 'carousel' ? 'grid' : 'carousel');
  };
  
  // Use effect to remove any badges that might get added dynamically
  useEffect(() => {
    // Function to remove badges from category navbar
    const removeBadges = () => {
      // First approach: target direct children
      const catNavLinks = document.querySelectorAll('.cat-nav-link, [data-category-nav="true"], a[href*="Properties"], a[href*="Mobiles"], a[href*="Jobs"], a[href*="Bikes"]');
      
      catNavLinks.forEach(link => {
        // Find any badges that might have been added and remove them
        const badges = link.querySelectorAll('.best-one-badge, .mobile-badge, .good-for-best-one-badge, .badge, [class*="badge"], span[class*="BEST"], span[class*="ONE"]');
        badges.forEach(badge => {
          badge.remove();
        });
        
        // Also check for text nodes that contain "BEST ONE" and remove them
        Array.from(link.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes('BEST ONE'))
          .forEach(node => node.remove());
        
        // Check for any element containing "BEST ONE" text
        Array.from(link.querySelectorAll('*'))
          .filter(el => el.textContent.includes('BEST ONE') || el.textContent.includes('BEST') || el.textContent.includes('ONE'))
          .forEach(el => {
            // If it's a badge or similar element, remove it
            if (el.className.includes('badge') || el.className.includes('BEST') || el.className.includes('ONE')) {
              el.remove();
            }
          });
      });
      
      // Second approach: target all badges within the navbar with more general selectors
      const catNavbar = document.querySelector('.cat-navbar');
      if (catNavbar) {
        // Remove all badges
        const allBadges = catNavbar.querySelectorAll('.best-one-badge, .mobile-badge, .good-for-best-one-badge, [class*="badge"], span[class*="BEST"], span[class*="ONE"]');
        allBadges.forEach(badge => {
          badge.remove();
        });
        
        // Third approach: target specific category links from the screenshot
        ['Mobiles', 'Properties', 'Jobs', 'Bikes', 'Electronics', 'Furniture', 'Fashion', 'Books', 'Pets', 'Services'].forEach(category => {
          const categoryLinks = catNavbar.querySelectorAll(`a[href*="${category}"]`);
          categoryLinks.forEach(link => {
            // Remove badges and BEST ONE text
            const badges = link.querySelectorAll('.best-one-badge, .mobile-badge, .good-for-best-one-badge, .badge, [class*="badge"], span[class*="BEST"], span[class*="ONE"]');
            badges.forEach(badge => badge.remove());
            
            // Also make sure there's no extra spacing
            const span = link.querySelector('span');
            if (span) {
              span.style.marginRight = '0';
              
              // Clean up any text nodes in the span that might contain BEST ONE
              Array.from(span.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE && (node.textContent.includes('BEST') || node.textContent.includes('ONE')))
                .forEach(node => node.remove());
            }
          });
        });
        
        // Fourth approach: look for any green badges that might be BEST ONE badges
        const greenElements = catNavbar.querySelectorAll('[style*="green"], [style*="38A169"], [style*="#38A169"]');
        greenElements.forEach(el => {
          if (el.textContent.includes('BEST') || el.textContent.includes('ONE')) {
            el.remove();
          }
        });
      }
    };
    
    // Run badge removal immediately
    removeBadges();
    
    // Run it several times with delays to catch lazy-loaded content
    const timeoutIds = [
      setTimeout(removeBadges, 500),
      setTimeout(removeBadges, 1000),
      setTimeout(removeBadges, 2000)
    ];
    
    // Set up a mutation observer to catch dynamically added badges
    const observer = new MutationObserver(removeBadges);
    
    // Target the whole category navbar
    const catNavbar = document.querySelector('.cat-navbar');
    if (catNavbar) {
      observer.observe(catNavbar, { 
        childList: true, 
        subtree: true,
        attributes: true,
        characterData: true,
        attributeFilter: ['class', 'style']
      });
    }
    
    // Also observe the document body for any changes that might add badges
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Clean up
    return () => {
      if (observer) {
        observer.disconnect();
      }
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  // Render OLX-style Grid View
  const renderOlxGridView = () => {
    return (
      <div className="olx-grid-view">
        {categories.map((category, index) => {
          const imageClass = categoryImageClasses[category.title] || 'category-image-default';
          const IconComponent = categoryIcons[category.title];
          
          return (
            <Link 
              key={index}
              to={`/${category.title}`}
              className="olx-category-item"
              data-category-nav="true"
            >
              <div className="olx-category-icon">
                {/* Use image class if available, otherwise use icon */}
                {imageClass ? (
                  <div className={imageClass}></div>
                ) : IconComponent ? (
                  <IconComponent />
                ) : (
                  <div className="category-image-default"></div>
                )}
              </div>
              <div className="olx-category-name">{category.title}</div>
            </Link>
          );
        })}
      </div>
    );
  };

  // Render Carousel View
  const renderCarouselView = () => {
    return (
      <div className="category-scroll-container">
        {categories.map((category, index) => {
          const imageClass = categoryImageClasses[category.title] || 'category-image-default';
          const IconComponent = categoryIcons[category.title];
          
          return (
            <Link 
              key={index}
              to={`/${category.title}`}
              className="olx-category-item scroll-category-item"
              data-category-nav="true"
            >
              <div className="olx-category-icon">
                {/* Use image class if available, otherwise use icon */}
                {imageClass ? (
                  <div className={imageClass}></div>
                ) : IconComponent ? (
                  <IconComponent />
                ) : (
                  <div className="category-image-default"></div>
                )}
              </div>
              <div className="olx-category-name">{category.title}</div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Search Header - Only visible on mobile */}
      <MobileSearchHeader 
        currentLocation={currentLocation}
        setIsSearching={setIsSearching}
        categoryViewMode={categoryViewMode}
        toggleCategoryView={toggleCategoryView}
      />
      
      <Navbar bg="light" expand="md" className="mt-1 cat-navbar" variant="light" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <Flex justify="space-between" align="center" w="100%" px={3}>
          <Box mr={2} flexShrink={0}>
            {!isMobileMenuScreen && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Menu"
                  icon={<HamburgerIcon />}
                  colorScheme="blue"
                  variant="outline"
                />
                <MenuList maxW="80vw" maxH="80vh" overflowY="auto" boxShadow="lg" p={2}>
                  <Grid
                    templateColumns={[
                      "repeat(2, 1fr)",
                      "repeat(3, 1fr)",
                      "repeat(4, 1fr)",
                      "repeat(5, 1fr)",
                    ]}
                    gap={4}
                  >
                    {categories.map((category, index) => (
                      <GridItem key={index}>
                        <Box 
                          p={3} 
                          fontWeight="bold" 
                          borderBottom="2px solid" 
                          borderColor="blue.200"
                          color="blue.700"
                          display="flex"
                          alignItems="center"
                        >
                          {categoryIcons[category.title] && React.createElement(categoryIcons[category.title], { 
                            style: { marginRight: '8px' },
                            fontSize: "small",
                            color: "primary"
                          })}
                          <Text fontSize="sm">{category.title}</Text>
                        </Box>
                        <VStack align="stretch" mt={2} spacing={1}>
                          {category.items.map((subCategory, subIndex) => {
                            return (
                              <Link 
                                key={`${index}-${subIndex}`} 
                                to={`/${subCategory}`} // Using the original URL format
                                style={{ textDecoration: 'none' }}
                              >
                                <MenuItem 
                                  _hover={{ bg: 'blue.50', color: 'blue.600' }}
                                  fontSize="xs"
                                  py={1}
                                >
                                  {subCategory}
                                </MenuItem>
                              </Link>
                            );
                          })}
                        </VStack>
                        {index !== categories.length - 1 && <Divider my={2} />}
                      </GridItem>
                    ))}
                  </Grid>
                </MenuList>
              </Menu>
            )}
          </Box>

          {/* Container for Toggle Button and Category List */}
          <Flex direction="column" flexGrow={1} w="100%">
            
            {/* Mobile View: Render either Grid or Carousel based on state */}
            {isMobileLayout && (
              <>
                {categoryViewMode === 'grid' ? renderOlxGridView() : renderCarouselView()}
                
                {/* View Toggle Button */}
                <div className="mobile-view-toggle">
                  <Button
                    onClick={toggleCategoryView}
                    variant="link"
                    colorScheme="blue"
                    leftIcon={categoryViewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
                    fontWeight="normal"
                    fontSize="sm"
                    my={2}
                    py={2}
                    alignSelf="center"
                    w="100%"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {categoryViewMode === 'grid' ? 'Switch to Carousel View' : 'Switch to Grid View'}
                  </Button>
                </div>
              </>
            )}
            
            {/* Desktop View: Always show the original category buttons */}
            {!isMobileLayout && (
              <Flex 
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                className="category-buttons-container"
                w="100%"
              >
                {categories.map((category, index) => {
                  // Get the icon component
                  const IconComponent = categoryIcons[category.title];
                  
                  return (
                    <Box 
                      key={index} 
                      mx={1}
                      my={1}
                      className="category-link-container cat-nav-item"
                    >
                      <Link 
                        to={`/${category.title}`} 
                        style={{ textDecoration: 'none' }}
                        className="category-link cat-nav-link"
                        data-category-nav="true"
                      >
                        <Button 
                          variant="ghost"
                          size="sm"
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontWeight="medium"
                          color="gray.700"
                          className="cat-button"
                          transition="all 0.2s"
                          boxShadow="sm"
                          _hover={{ bg: 'blue.100', transform: 'translateY(-2px)', transition: 'all 0.2s', textDecoration: 'none' }}
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          {IconComponent && <IconComponent style={{ 
                            fontSize: '1.2rem',
                            marginRight: '8px',
                            color: 'inherit'
                          }} />}
                          <Text display="inline" fontSize="sm" textAlign="left">
                            {category.title}
                          </Text>
                        </Button>
                      </Link>
                    </Box>
                  );
                })}
              </Flex>
            )}
          </Flex> {/* Closes the Flex wrapper for category list and new toggle button */}
        </Flex>
      </Navbar>
    </>
  );
}