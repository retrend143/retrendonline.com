import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Stack,
  Button,
  useColorModeValue,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import CatNavbar from "./CatNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardProfile from "./ProductCards/ProductCardProfile";
import NotListedAnything from "./resources/NotListedAnything";
import Loading from "./resources/Loading";
import "./ProductCards/ResponsiveCardStyles.css";

export default function SearchProfile() {
  const { useremail } = useParams();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const bgcolor1 = useColorModeValue("white", "gray.800");
  const bgcolor2 = useColorModeValue("#151f21", "gray.900");
  const [products, setProducts] = useState([]);
  const [visibleproducts, setVisibleProducts] = useState(6);
  const hasMoreProductsToLoad = visibleproducts < products.length;

  if (useremail === localStorage.getItem("authemail")) {
    window.location.href = "/profile";
  }
  useEffect(() => {
    axios
      .get(`https://backend-retrend.onrender.com/profilesearch?useremail=${useremail}`)
      .then((response) => {
        setProfileData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    const getProducts = async () => {
      try {
        const response = await axios.get(
          `https://backend-retrend.onrender.com/getProductsbyemail?useremail=${useremail}`
        );
        
        // Sort products to prioritize promoted products
        const sortedProducts = [...response.data].sort((a, b) => {
          if (a.isPromoted && !b.isPromoted) return -1;
          if (!a.isPromoted && b.isPromoted) return 1;
          return 0;
        });
        
        setProducts(sortedProducts);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const name = profileData.name;
  const picture = profileData.picture;

  return (
    <div>
      <CatNavbar />
      <div className="mt-3 mb-3" py={6}>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box
            maxW={"270px"}
            w={"full"}
            className="mx-4 card"
            bg={bgcolor1}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Image
              h={"120px"}
              w={"full"}
              src={
                "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              }
              objectFit={"cover"}
            />
            <Flex justify={"center"} mt={-12}>
              <Avatar
                size={"xl"}
                src={picture}
                alt={"Author"}
                css={{
                  border: "2px solid white",
                }}
              />
            </Flex>

            <Box p={6}>
              <Stack spacing={0} align={"center"} mb={5}>
                <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                  {name}
                </Heading>
                {/* <Text color={'gray.500'}>Frontend Developer</Text> */}
              </Stack>

              {/* <Stack direction={'row'} justify={'center'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}>23k</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    Followers
                  </Text>
                </Stack>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}>23k</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    Followers
                  </Text>
                </Stack>
              </Stack> */}

              <Button
                w={"full"}
                mt={8}
                bg={bgcolor2}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Share Profile
              </Button>
            </Box>
          </Box>
          <Box w={"full"}>
            {products.length === 0 ? (
              <NotListedAnything />
            ) : (
              <>
                <Box className="container" p={5}>
                  <Heading size="lg" mb={4}>
                  Products of {name}
                  </Heading>
                  <Box position="relative" minH="auto">
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
                      {products
                        .filter(ad => ad) // Filter out any null products
                        .slice(0, visibleproducts)
                        .map((ad) => (
                          <GridItem key={ad._id} w="100%" className="product-grid-item">
                            <Box style={{ display: 'block', height: '100%' }} className="product-card-container">
                              <ProductCardProfile ad={ad} />
                            </Box>
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
                </Box>
              </>
            )}
          </Box>
        </Flex>
      </div>
    </div>
  );
}
