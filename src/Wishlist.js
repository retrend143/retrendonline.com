import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  Grid,
  GridItem,
  Text,
  useToast,
  IconButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import ProductCardProfile from "./ProductCards/ProductCardProfile";
import NotListedAnything from "./resources/NotListedAnything";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./WishlistStyles.css"; // Import the wishlist styles

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleUnwish = async (wishlistItemId, productId) => {
    try {
      // Mark this item as being removed
      setRemovingItems(prev => ({ ...prev, [wishlistItemId]: true }));
      
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please login to perform this action",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
        return;
      }

      // Make API call to remove from wishlist using the correct endpoint
      await axios.delete(`https://backend-retrend.onrender.com/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update local state to remove the item
      setWishlistItems(prevItems => prevItems.filter(item => item._id !== wishlistItemId));
      
      toast({
        title: "Item Removed",
        description: "Successfully removed from your wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Unwish error:", err);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // Clear the removing state for this item
      setRemovingItems(prev => ({ ...prev, [wishlistItemId]: false }));
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please login to view your wishlist",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
          return;
        }

        const response = await axios.get("https://backend-retrend.onrender.com/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data) {
          setWishlistItems(response.data);
        } else {
          setWishlistItems([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
        if (err.response?.status === 401) {
          toast({
            title: "Session Expired",
            description: "Please login again to view your wishlist",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          localStorage.removeItem("authToken");
          navigate("/");
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch wishlist items. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <ReactLoading type="spin" color="#0000FF" height={100} width={100} />
      </div>
    );
  }

  return (
    <Container maxW="container.xl" mt={5} className="wishlist-container">
      <Heading as="h2" size="xl" textAlign="center" mb={5} className="wishlist-title">
        My Wishlist
      </Heading>
      
      {wishlistItems.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <NotListedAnything />
          <Text mt={4}>You haven't added any items to your wishlist yet.</Text>
        </div>
      ) : (
        <Grid 
          templateColumns={{
            base: "repeat(2, 1fr)", // 2 cards per row on mobile
            sm: "repeat(2, 1fr)",   // 2 cards per row on small screens
            md: "repeat(3, 1fr)",   // 3 cards per row on medium screens
            lg: "repeat(4, 1fr)"    // 4 cards per row on large screens
          }} 
          gap={{ base: 2, sm: 3, md: 4, lg: 6 }}
        >
          {wishlistItems
            .filter(item => item.productId)
            .map((item) => (
              <GridItem key={item._id} position="relative" className="wishlist-card-wrapper">
                <Box position="relative" className="wishlist-card">
                  <ProductCardProfile ad={item.productId} />
                  
                  {/* Unwish Button */}
                  <IconButton
                    position="absolute"
                    top="10px"
                    right="10px"
                    size="md"
                    colorScheme="red"
                    variant="solid"
                    borderRadius="full"
                    onClick={() => handleUnwish(item._id, item.productId._id)}
                    isLoading={removingItems[item._id]}
                    zIndex={2}
                    _hover={{ transform: 'scale(1.05)' }}
                    title="Remove from wishlist"
                    icon={<FavoriteIcon />}
                    aria-label="Remove from wishlist"
                    className="wishlist-heart-button"
                  />
                </Box>
              </GridItem>
            ))}
        </Grid>
      )}
    </Container>
  );
} 
