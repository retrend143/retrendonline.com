import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categories } from "./resources/Catagories";
import NotFound from "./resources/NotFound";
import axios from "axios";
import { Box, Button, Container, Grid, GridItem, Flex } from "@chakra-ui/react";
import ProductCard from "./ProductCards/ProductCard";
import SearchNotFound from "./resources/SearchNotFound";
import CatNavbar from "./CatNavbar";
import Loading from "./resources/Loading";
import "./ProductCards/ResponsiveCardStyles.css";

export default function CatagoryView() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleproducts, setVisibleProducts] = useState(6);
  const hasMoreProductsToLoad = visibleproducts < products.length;

  const isValidCategory = categories.some(
    (cat) => cat.title.toLowerCase() === category.toLowerCase()
  );
  const isValidItem = categories.some((cat) => cat.items.includes(category));

  useEffect(() => {
    if (!isValidCategory && !isValidItem) {
      return;
    }

    const getProductsbyCategory = async () => {
      try {
        const response = await axios.get(`https://backend-retrend.onrender.com/getProductsbyCategory/${category}`);
        
        // Sort products to prioritize promoted products
        const sortedProducts = [...response.data].sort((a, b) => {
          if (a.isPromoted && !b.isPromoted) return -1;
          if (!a.isPromoted && b.isPromoted) return 1;
          return 0;
        });
        
        setProducts(sortedProducts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    getProductsbyCategory();
  }, [category, isValidCategory, isValidItem]);

  if (!isValidCategory && !isValidItem) {
    return <NotFound />;
  }

  if (products.length === 0) {
    return <SearchNotFound />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <CatNavbar />
      <Container maxW="container.xl" px={{ base: 2, sm: 3, md: 4, lg: 6 }}>
        <Box position="relative" minH="500px">
          <Grid 
            templateColumns={{ 
              base: "repeat(2, 1fr)", // 2 cards per row on very small screens
              sm: "repeat(2, 1fr)", // 2 cards per row on small screens (up to 768px)
              md: "repeat(3, 1fr)", // 3 cards per row on medium screens (768px+)
              lg: "repeat(4, 1fr)", // 4 cards per row on large screens (992px+)
              xl: "repeat(5, 1fr)" // 5 cards per row on extra large screens (1200px+)
            }}
            gap={{ base: 2, sm: 2, md: 3, lg: 3, xl: 3 }}
            autoFlow="row dense"
            justifyItems="stretch"
            maxW="container.xl"
            mb={6}
            className="product-grid"
          >
            {products.slice(0, visibleproducts).map((product) => (
              <GridItem 
                key={product._id}
                w="100%"
                className="product-grid-item"
              >
                <Link to={`/preview_ad/${product._id}`} style={{ display: 'block', height: '100%' }} className="product-card-container">
                  <ProductCard product={product} />
                </Link>
              </GridItem>
            ))}
          </Grid>
        
        {hasMoreProductsToLoad && (
          <Flex justifyContent="center" w="100%" mt={6} mb={4} position="relative">
            <Button
              bgGradient="linear(to-r, teal.400, cyan.600)"
              color="white"
              px={8}
              py={6}
              fontSize="md"
              _hover={{
                bgGradient: "linear(to-r, teal.600, cyan.800)",
              }}
              _active={{
                bgGradient: "linear(to-r, teal.800, cyan.900)",
              }}
              onClick={() => {
                setVisibleProducts((prev) => prev + 10);
              }}
            >
              Load More
            </Button>
          </Flex>
        )}
        </Box>
      </Container>
    </Box>
  );
}
