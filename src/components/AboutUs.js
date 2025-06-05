import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Image, 
  SimpleGrid, 
  Flex, 
  Stack, 
  Icon, 
  Divider,
  Button
} from '@chakra-ui/react';
import { FaRecycle, FaLeaf, FaHandshake, FaShoppingBag, FaUsers, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box bg="white">
      {/* Hero Section */}
      <Box 
        bg="linear-gradient(90deg, #FFFBF5, #C5BAFF 100%)" 
        py={16} 
        position="relative"
      >
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <Box>
              <Heading 
                as="h1" 
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                mb={4}
              >
                About RETREND
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} mb={6} color="gray.700">
                RETREND is India's leading platform for buying and selling pre-owned goods, 
                committed to promoting sustainability through reuse and extending the lifecycle of products.
              </Text>
              <Button 
                as={Link} 
                to="/sell"
                colorScheme="teal" 
                size="lg" 
                px={8}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Start Selling
              </Button>
            </Box>
            <Flex justify="center" align="center">
              <Image 
                src="/honey (4 x 3 in) (1.8 x 0.9 in).png" 
                alt="RETREND" 
                borderRadius="md"
                shadow="xl"
                maxW="300px"
                maxH="200px"
              />
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxW="container.xl" py={16}>
        <Box textAlign="center" mb={12}>
          <Heading as="h2" size="xl" mb={4}>Our Mission</Heading>
          <Text fontSize="lg" maxW="800px" mx="auto" color="gray.600">
            At RETREND, we're on a mission to create a more sustainable future by encouraging the reuse of products, 
            reducing waste, and providing a trusted platform for buying and selling pre-owned items.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
            <Flex 
              w={16} 
              h={16} 
              align="center" 
              justify="center" 
              color="white" 
              rounded="full" 
              bg="teal.500" 
              mb={4}
            >
              <Icon as={FaRecycle} w={8} h={8} />
            </Flex>
            <Heading as="h3" size="md" mb={3}>Reduce Waste</Heading>
            <Text color="gray.600">
              By giving products a second life, we help reduce the amount of waste that ends up in landfills.
            </Text>
          </Box>

          <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
            <Flex 
              w={16} 
              h={16} 
              align="center" 
              justify="center" 
              color="white" 
              rounded="full" 
              bg="teal.500" 
              mb={4}
            >
              <Icon as={FaHandshake} w={8} h={8} />
            </Flex>
            <Heading as="h3" size="md" mb={3}>Connect People</Heading>
            <Text color="gray.600">
              We connect buyers and sellers in local communities, fostering a sense of community and trust.
            </Text>
          </Box>

          <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
            <Flex 
              w={16} 
              h={16} 
              align="center" 
              justify="center" 
              color="white" 
              rounded="full" 
              bg="teal.500" 
              mb={4}
            >
              <Icon as={FaLeaf} w={8} h={8} />
            </Flex>
            <Heading as="h3" size="md" mb={3}>Promote Sustainability</Heading>
            <Text color="gray.600">
              Every reused item means one less new item that needs to be produced, reducing our environmental footprint.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Why Choose Us Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={12} textAlign="center">Why Choose RETREND</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={8}>
              <Flex align="start">
                <Flex 
                  w={12} 
                  h={12} 
                  align="center" 
                  justify="center" 
                  rounded="full" 
                  bg="purple.100" 
                  mr={4}
                >
                  <Icon as={FaUsers} color="purple.500" w={6} h={6} />
                </Flex>
                <Box>
                  <Heading as="h3" size="md" mb={2}>Trusted Community</Heading>
                  <Text color="gray.600">
                    Join millions of users who trust RETREND for buying and selling pre-owned items safely.
                  </Text>
                </Box>
              </Flex>
              
              <Flex align="start">
                <Flex 
                  w={12} 
                  h={12} 
                  align="center" 
                  justify="center" 
                  rounded="full" 
                  bg="blue.100" 
                  mr={4}
                >
                  <Icon as={FaShoppingBag} color="blue.500" w={6} h={6} />
                </Flex>
                <Box>
                  <Heading as="h3" size="md" mb={2}>Wide Selection</Heading>
                  <Text color="gray.600">
                    Find everything from electronics and vehicles to furniture and clothing, all in one place.
                  </Text>
                </Box>
              </Flex>
              
              <Flex align="start">
                <Flex 
                  w={12} 
                  h={12} 
                  align="center" 
                  justify="center" 
                  rounded="full" 
                  bg="green.100" 
                  mr={4}
                >
                  <Icon as={FaGlobe} color="green.500" w={6} h={6} />
                </Flex>
                <Box>
                  <Heading as="h3" size="md" mb={2}>Local Focus</Heading>
                  <Text color="gray.600">
                    Connect with buyers and sellers in your area for convenient transactions and reduced shipping impact.
                  </Text>
                </Box>
              </Flex>
            </Stack>
            
            <Flex justify="center" align="center">
              <Image 
                src="/about-why-choose.png" 
                alt="RETREND Benefits" 
                fallbackSrc="https://via.placeholder.com/500x400?text=RETREND+Benefits"
                borderRadius="md"
                shadow="lg"
                maxH="400px"
              />
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
          <Flex justify="center">
            <Image 
              src="/about-story.png" 
              alt="Our Story" 
              fallbackSrc="https://via.placeholder.com/500x400?text=Our+Story"
              borderRadius="md"
              shadow="lg"
              maxH="400px"
            />
          </Flex>
          
          <Box>
            <Heading as="h2" size="xl" mb={4}>Our Story</Heading>
            <Text fontSize="lg" mb={4} color="gray.600">
              RETREND was founded in 2023 with a simple idea: to create a platform where people could buy and sell 
              pre-owned items easily and securely, while making a positive impact on the environment.
            </Text>
            <Text fontSize="lg" mb={4} color="gray.600">
              What started as a small community has grown into India's leading marketplace for pre-owned goods, 
              with millions of users across the country.
            </Text>
            <Text fontSize="lg" color="gray.600">
              Today, we continue to innovate and improve our platform, making it easier than ever for people to 
              extend the lifecycle of products and embrace a more sustainable lifestyle.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Join Us CTA Section */}
      <Box bg="teal.500" py={16} color="white">
        <Container maxW="container.xl" textAlign="center">
          <Heading as="h2" size="xl" mb={4}>Join the RETREND Community</Heading>
          <Text fontSize="lg" maxW="800px" mx="auto" mb={8}>
            Whether you're looking to declutter your home, find a great deal, or simply reduce your environmental 
            footprint, RETREND is the place for you. Join millions of users who are already making a difference.
          </Text>
          <Button 
            as={Link} 
            to="/register"
            size="lg" 
            bg="white" 
            color="teal.500" 
            _hover={{
              bg: "gray.100",
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            px={8}
            fontWeight="bold"
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxW="container.xl" py={16}>
        <Box textAlign="center" mb={12}>
          <Heading as="h2" size="xl" mb={4}>Get in Touch</Heading>
          <Text fontSize="lg" maxW="800px" mx="auto" color="gray.600">
            Have questions or feedback? We'd love to hear from you.
          </Text>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign="center">
          <Box p={6}>
            <Heading as="h3" size="md" mb={3}>Email</Heading>
            <Text color="gray.600">support@RETREND.in</Text>
          </Box>
          
          <Box p={6}>
            <Heading as="h3" size="md" mb={3}>Phone</Heading>
            <Text color="gray.600">+91 123 456 7890</Text>
          </Box>
          
          <Box p={6}>
            <Heading as="h3" size="md" mb={3}>Address</Heading>
            <Text color="gray.600">123 Tech Park, Bangalore, India</Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AboutUs;
