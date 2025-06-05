import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  List,
  ListItem,
  Link as ChakraLink,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaShoppingBag, 
  FaTags, 
  FaUserCircle, 
  FaQuestionCircle, 
  FaInfoCircle, 
  FaPhone, 
  FaBook,
  FaBriefcase,
  FaUsers,
  FaLock,
  FaFileAlt
} from 'react-icons/fa';

const SitemapSection = ({ title, icon, links }) => {
  return (
    <Box>
      <HStack mb={4}>
        <Icon as={icon} color="teal.500" boxSize={6} />
        <Heading as="h3" size="md">{title}</Heading>
      </HStack>
      <List spacing={2}>
        {links.map((link, index) => (
          <ListItem key={index}>
            <ChakraLink 
              as={Link} 
              to={link.path} 
              color="gray.600" 
              _hover={{ color: 'teal.500', textDecoration: 'none' }}
              display="block"
              py={1}
            >
              {link.name}
            </ChakraLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const Sitemap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Featured Products', path: '/featured' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Popular Items', path: '/popular' }
  ];

  const userLinks = [
    { name: 'Sign In', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'My Account', path: '/profile' },
    { name: 'My Wishlist', path: '/wishlist' },
    { name: 'My Ads', path: '/my-ads' },
    { name: 'Messages', path: '/messages' }
  ];

  const sellingLinks = [
    { name: 'Sell an Item', path: '/sell' },
    { name: 'Seller Dashboard', path: '/seller-dashboard' },
    { name: 'Promote Products', path: '/promote' },
    { name: 'Seller Guidelines', path: '/seller-guidelines' }
  ];

  const helpLinks = [
    { name: 'Help Center', path: '/help-center' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Support', path: '/contact' },
    { name: 'Feedback', path: '/feedback' }
  ];

  const infoLinks = [
    { name: 'About RetreND', path: '/about-us' },
    { name: 'Our Team', path: '/our-team' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' }
  ];

  const legalLinks = [
    { name: 'Terms & Conditions', path: '/terms-and-conditions' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
    { name: 'Prohibited Items', path: '/prohibited-items' },
    { name: 'Copyright Policy', path: '/copyright-policy' }
  ];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Hero Section */}
      <Box bg="linear-gradient(90deg, #FFFBF5, #C5BAFF 100%)" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center">
            <Heading 
              as="h1" 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
            >
              Sitemap
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="800px" color="gray.700">
              Find all the pages on RETREND organized in a simple structure to help you navigate our platform easily.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Sitemap Content */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
          <SitemapSection title="Main Navigation" icon={FaHome} links={mainLinks} />
          <SitemapSection title="User Account" icon={FaUserCircle} links={userLinks} />
          <SitemapSection title="Selling" icon={FaTags} links={sellingLinks} />
          <SitemapSection title="Help & Support" icon={FaQuestionCircle} links={helpLinks} />
          <SitemapSection title="About Us" icon={FaInfoCircle} links={infoLinks} />
          <SitemapSection title="Legal Information" icon={FaFileAlt} links={legalLinks} />
        </SimpleGrid>
      </Container>

      {/* Category Sitemap */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="start">
            <Heading as="h2" size="xl">Product Categories</Heading>
            
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8} width="100%">
              <Box>
                <Heading as="h3" size="md" mb={4}>Electronics</Heading>
                <List spacing={2}>
                  <ListItem><ChakraLink as={Link} to="/category/smartphones" color="gray.600">Smartphones</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/laptops" color="gray.600">Laptops & Computers</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/tablets" color="gray.600">Tablets</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/cameras" color="gray.600">Cameras</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/audio" color="gray.600">Audio Equipment</ChakraLink></ListItem>
                </List>
              </Box>
              
              <Box>
                <Heading as="h3" size="md" mb={4}>Fashion</Heading>
                <List spacing={2}>
                  <ListItem><ChakraLink as={Link} to="/category/men-clothing" color="gray.600">Men's Clothing</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/women-clothing" color="gray.600">Women's Clothing</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/footwear" color="gray.600">Footwear</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/accessories" color="gray.600">Accessories</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/watches" color="gray.600">Watches</ChakraLink></ListItem>
                </List>
              </Box>
              
              <Box>
                <Heading as="h3" size="md" mb={4}>Home & Furniture</Heading>
                <List spacing={2}>
                  <ListItem><ChakraLink as={Link} to="/category/furniture" color="gray.600">Furniture</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/appliances" color="gray.600">Home Appliances</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/kitchenware" color="gray.600">Kitchenware</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/decor" color="gray.600">Home Decor</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/garden" color="gray.600">Garden & Outdoor</ChakraLink></ListItem>
                </List>
              </Box>
              
              <Box>
                <Heading as="h3" size="md" mb={4}>Sports & Hobbies</Heading>
                <List spacing={2}>
                  <ListItem><ChakraLink as={Link} to="/category/sports-equipment" color="gray.600">Sports Equipment</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/books" color="gray.600">Books</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/musical-instruments" color="gray.600">Musical Instruments</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/collectibles" color="gray.600">Collectibles</ChakraLink></ListItem>
                  <ListItem><ChakraLink as={Link} to="/category/art" color="gray.600">Art & Crafts</ChakraLink></ListItem>
                </List>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Sitemap;
