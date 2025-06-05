import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  Text,
  Divider,
  IconButton,
  CloseButton,
  Image,
  Button,
} from '@chakra-ui/react';
import {
  FaUser,
  FaHeart,
  FaClipboardList,
  FaSignOutAlt,
  FaPlus,
  FaQuestionCircle,
  FaComments,
} from 'react-icons/fa';

// Import the CSS for the sidebar
import '../styles/MobileSidebar.css';

const MobileSidebar = ({ isOpen, onClose, auth, handleLogout, toggleLoginModal }) => {
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Get user data from localStorage
  const name = localStorage.getItem("authname");
  const picture = localStorage.getItem("authpicture");

  return (
    <div className={`mobile-sidebar-overlay ${isOpen ? 'open' : ''}`}>
      <div 
        ref={sidebarRef}
        className={`mobile-sidebar ${isOpen ? 'open' : ''}`}
      >
        <Flex direction="column" h="100%">
          {/* Header with Logo and Close Button */}
          <Flex 
            justify="space-between" 
            align="center" 
            p={4} 
            borderBottom="1px solid" 
            borderColor="gray.200"
          >
            <Link to="/" onClick={onClose}>
              <Image 
                src="/honey (4 x 3 in) (1.8 x 0.9 in).png" 
                alt="RETREND" 
                maxW="120px"
                h="60px"
              />
            </Link>
            <CloseButton onClick={onClose} size="lg" />
          </Flex>

          {/* User Profile Section */}
          {auth ? (
            <Box p={4} borderBottom="1px solid" borderColor="gray.200">
              <Flex align="center">
                <Box 
                  w="50px" 
                  h="50px" 
                  borderRadius="full" 
                  overflow="hidden" 
                  mr={3}
                  bg="gray.200"
                >
                  {picture ? (
                    <Image 
                      src={picture} 
                      alt={name || 'User'} 
                      w="100%" 
                      h="100%" 
                      objectFit="cover"
                    />
                  ) : (
                    <Flex 
                      w="100%" 
                      h="100%" 
                      align="center" 
                      justify="center" 
                      bg="teal.500" 
                      color="white"
                    >
                      <FaUser />
                    </Flex>
                  )}
                </Box>
                <Box>
                  <Text fontWeight="bold">{name || 'User'}</Text>
                  <Link to="/profile" onClick={onClose}>
                    <Text fontSize="sm" color="gray.600" _hover={{ color: "teal.500" }}>View Profile</Text>
                  </Link>
                </Box>
              </Flex>
            </Box>
          ) : (
            <Box p={4} borderBottom="1px solid" borderColor="gray.200">
              <Button 
                onClick={() => {
                  toggleLoginModal();
                  onClose();
                }}
                colorScheme="teal" 
                variant="outline" 
                w="100%"
              >
                Login / Register
              </Button>
            </Box>
          )}

          {/* Navigation Links */}
          <VStack spacing={0} align="stretch" flex="1" overflowY="auto">
            <Link to="/sell" onClick={onClose}>
              <Flex 
                align="center" 
                p={4} 
                _hover={{ bg: "gray.100" }}
                borderBottom="1px solid" 
                borderColor="gray.200"
              >
                <Box mr={3} color="teal.500">
                  <FaPlus />
                </Box>
                <Text>Sell</Text>
              </Flex>
            </Link>

            {auth && (
              <>
                <Link to="/myads" onClick={onClose}>
                  <Flex 
                    align="center" 
                    p={4} 
                    _hover={{ bg: "gray.100" }}
                    borderBottom="1px solid" 
                    borderColor="gray.200"
                  >
                    <Box mr={3} color="teal.500">
                      <FaClipboardList />
                    </Box>
                    <Text>My Ads</Text>
                  </Flex>
                </Link>

                <Link to="/wishlist" onClick={onClose}>
                  <Flex 
                    align="center" 
                    p={4} 
                    _hover={{ bg: "gray.100" }}
                    borderBottom="1px solid" 
                    borderColor="gray.200"
                  >
                    <Box mr={3} color="teal.500">
                      <FaHeart />
                    </Box>
                    <Text>Wishlist</Text>
                  </Flex>
                </Link>

                <Link to="/chat" onClick={onClose}>
                  <Flex 
                    align="center" 
                    p={4} 
                    _hover={{ bg: "gray.100" }}
                    borderBottom="1px solid" 
                    borderColor="gray.200"
                  >
                    <Box mr={3} color="teal.500">
                      <FaComments />
                    </Box>
                    <Text>Chat</Text>
                  </Flex>
                </Link>
              </>
            )}

            <Link to="/help-center" onClick={onClose}>
              <Flex 
                align="center" 
                p={4} 
                _hover={{ bg: "gray.100" }}
                borderBottom="1px solid" 
                borderColor="gray.200"
              >
                <Box mr={3} color="teal.500">
                  <FaQuestionCircle />
                </Box>
                <Text>Help</Text>
              </Flex>
            </Link>
          </VStack>

          {/* Logout Button */}
          {auth && (
            <Box p={4} borderTop="1px solid" borderColor="gray.200">
              <Flex 
                align="center" 
                p={2} 
                _hover={{ bg: "gray.100" }}
                borderRadius="md"
                cursor="pointer"
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
              >
                <Box mr={3} color="red.500">
                  <FaSignOutAlt />
                </Box>
                <Text color="red.500" fontWeight="medium">Logout</Text>
              </Flex>
            </Box>
          )}
        </Flex>
      </div>
    </div>
  );
};

export default MobileSidebar; 