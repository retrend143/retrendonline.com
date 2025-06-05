import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Icon,
  useColorModeValue,
  Link as ChakraLink,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { FaSearch, FaShoppingBag, FaCreditCard, FaShippingFast, FaUserCircle, FaQuestionCircle, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HelpCategoryCard = ({ title, icon, description, link }) => {
  return (
    <Box
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg={useColorModeValue('white', 'gray.700')}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      height="100%"
    >
      <Flex mb={4} align="center">
        <Icon as={icon} w={10} h={10} color="teal.500" mr={4} />
        <Heading as="h3" size="md">{title}</Heading>
      </Flex>
      <Text color="gray.600" mb={4}>{description}</Text>
      <ChakraLink 
        as={Link} 
        to={link} 
        color="teal.500" 
        fontWeight="bold"
        display="flex"
        alignItems="center"
      >
        Learn more <Icon as={FaArrowRight} ml={2} />
      </ChakraLink>
    </Box>
  );
};

const FAQSection = () => {
  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={8} textAlign="center">
        <Heading as="h2" size="xl">Frequently Asked Questions</Heading>
        <Text fontSize="lg" maxW="800px" color="gray.600">
          Find answers to the most common questions about buying, selling, and using RETREND.
        </Text>
        <Box maxW="500px" w="100%" textAlign="center">
          <Button 
            as={Link} 
            to="/faq" 
            colorScheme="teal" 
            size="lg"
            width="100%"
            height="60px"
            fontSize="lg"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            View All FAQs
          </Button>
          
          <Text fontSize="sm" color="gray.500" mt={2}>
            Our comprehensive FAQ section covers account management, buying process, selling tips, and more.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

const BuyingGuideSection = () => {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')} py={16}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="start">
          <Heading as="h2" size="xl">Tips for Safe Buying</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%">
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue('white', 'gray.700')}
            >
              <Heading as="h3" size="md" mb={4}>Before You Buy</Heading>
              <List spacing={3}>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Check the seller's ratings and reviews
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Ask questions about the item's condition
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Request additional photos if needed
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Compare prices with similar items
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Verify item authenticity for branded products
                </ListItem>
              </List>
            </Box>
            
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue('white', 'gray.700')}
            >
              <Heading as="h3" size="md" mb={4}>During & After Purchase</Heading>
              <List spacing={3}>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Always pay through RETREND's secure system
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Meet in public places for in-person transactions
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Inspect the item thoroughly upon receipt
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Confirm receipt only after verification
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="teal.500" />
                  Leave honest feedback for the seller
                </ListItem>
              </List>
            </Box>
          </SimpleGrid>
          
          <Text color="gray.600" mt={4}>
            For more detailed guidance, check out our complete <ChakraLink as={Link} to="/buying-guide" color="teal.500" fontWeight="bold">Buyer's Guide</ChakraLink>.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

const HelpCenter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: "Account & Profile",
      icon: FaUserCircle,
      description: "Manage your account settings, profile information, and security preferences.",
      link: "/help/account"
    },
    {
      title: "Buying",
      icon: FaShoppingBag,
      description: "Learn how to search for items, communicate with sellers, and complete purchases safely.",
      link: "/help/buying"
    },
    {
      title: "Selling",
      icon: FaShippingFast,
      description: "Get tips on creating listings, pricing items, and handling shipping and delivery.",
      link: "/help/selling"
    },
    {
      title: "Payments",
      icon: FaCreditCard,
      description: "Understand payment methods, transactions, and how we keep your financial information secure.",
      link: "/help/payments"
    }
  ];

  return (
    <Box bg={useColorModeValue('white', 'gray.900')}>
      {/* Hero Section */}
      <Box bg="linear-gradient(90deg, #FFFBF5, #C5BAFF 100%)" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Flex
              w={20}
              h={20}
              align="center"
              justify="center"
              color="white"
              rounded="full"
              bg="teal.500"
              mb={4}
            >
              <Icon as={FaQuestionCircle} w={10} h={10} />
            </Flex>
            <Heading 
              as="h1" 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
            >
              How Can We Help You?
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="800px" color="gray.700">
              Find answers to frequently asked questions and learn how to make the most of RETREND.
            </Text>
            <InputGroup size="lg" maxW="600px" mt={4}>
              <Input
                pr="4.5rem"
                placeholder="Search for help..."
                bg="white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" colorScheme="teal">
                  <FaSearch />
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
        </Container>
      </Box>

      {/* Help Categories */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <Heading as="h2" size="xl" textAlign="center">Help Categories</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {helpCategories.map((category, index) => (
              <HelpCategoryCard key={index} {...category} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* FAQ Section */}
      <FAQSection />

      {/* Buying Guide Section */}
      <BuyingGuideSection />

      {/* Contact Support */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="xl">Still Need Help?</Heading>
          <Text fontSize="lg" maxW="800px">
            Our support team is always here to assist you with any questions or issues you might have.
          </Text>
          <Button 
            as={Link} 
            to="/contact" 
            colorScheme="teal" 
            size="lg"
            leftIcon={<FaQuestionCircle />}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Contact Support
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default HelpCenter;
