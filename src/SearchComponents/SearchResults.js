import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CatNavbar from '../CatNavbar';
import { Box, Button, Container, Grid, GridItem, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCards/ProductCard';
import SearchNotFound from '../resources/SearchNotFound';
import NotFound from '../resources/NotFound';
import Loading from '../resources/Loading';
import '../ProductCards/ResponsiveCardStyles.css';

export default function SearchResults() {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('query');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleproducts, setVisibleProducts] = useState(6);
  const hasMoreProductsToLoad = visibleproducts < results.length;

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend-retrend.onrender.com/search?q=${query}`);
        
        // Sort products to prioritize promoted products
        const sortedResults = [...response.data].sort((a, b) => {
          if (a.isPromoted && !b.isPromoted) return -1;
          if (!a.isPromoted && b.isPromoted) return 1;
          return 0;
        });
        
        setResults(sortedResults);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) {
    return <Loading />;
  }

if (results.length === 0) {
    return <SearchNotFound />;
}

  if (error) {
    return <NotFound />;
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
            {results.slice(0, visibleproducts).map((product) => (
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
