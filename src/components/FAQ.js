import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Icon,
  Link as ChakraLink,
  useColorModeValue
} from '@chakra-ui/react';
import { FaSearch, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQCategory = ({ title, faqs }) => {
  const accordionPanelBg = useColorModeValue('gray.50', 'gray.700');
  
  return (
    <Box width="100%">
      <Heading as="h3" size="md" mb={4}>{title}</Heading>
      <Accordion allowToggle width="100%">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} borderWidth="1px" borderRadius="md" mb={4} borderColor="gray.200">
            <h2>
              <AccordionButton py={4} _expanded={{ bg: 'teal.50', color: 'teal.700' }}>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  {faq.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg={accordionPanelBg}>
              {faq.answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generalFaqs = [
    {
      question: "What is RETREND?",
      answer: "RETREND is India's leading platform for buying and selling pre-owned goods. Our marketplace connects sellers with buyers looking for quality second-hand items across various categories including electronics, fashion, home goods, and more."
    },
    {
      question: "How do I create an account on RETREND?",
      answer: "Creating an account is simple! Click on the 'Sign Up' button in the top right corner of the homepage. You can register using your email address or sign up with your Google account for a quicker process."
    },
    {
      question: "Is RETREND available throughout India?",
      answer: "Yes, RETREND is available across India. You can buy and sell items regardless of your location within the country. Our platform helps connect buyers and sellers nationwide."
    },
    {
      question: "Is using RETREND free?",
      answer: "Yes, browsing items, creating an account, and listing basic items on RETREND is completely free. We only charge a small commission when your item sells successfully, and there are optional promotional features available for a fee to increase visibility."
    }
  ];

  const buyingFaqs = [
    {
      question: "How do I search for items on RETREND?",
      answer: "You can search for items using the search bar at the top of the page. Enter keywords related to what you're looking for, or browse through categories by clicking on them from the homepage. You can also filter results by price, location, and other attributes."
    },
    {
      question: "How do I contact a seller about an item?",
      answer: "Each listing has a 'Chat with Seller' button. Click this to start a conversation with the seller directly through our in-app messaging system."
    },
    {
      question: "What payment methods are accepted on RETREND?",
      answer: "RETREND offers secure in-app payments. Buyers can pay using various methods including credit/debit cards, UPI, net banking, and digital wallets. The payment is held securely until the buyer confirms they've received the item as described."
    },
    {
      question: "What happens if I receive an item different from what was described?",
      answer: "If the item doesn't match the description or has undisclosed defects, you can request a return within 2 days of receiving the item through the 'Report an Issue' option in your order details. Our support team will review your case and assist with resolution."
    }
  ];

  const sellingFaqs = [
    {
      question: "How do I list an item for sale?",
      answer: "After logging in, click on the 'Sell' button in the navigation bar. Fill out the item details form with a description, photos, condition, and price. Once you submit, your item will be listed on the marketplace for buyers to see."
    },
    {
      question: "How many photos can I upload for my listing?",
      answer: "You can upload up to 10 photos per listing. We recommend using clear, well-lit photos from multiple angles to give buyers a comprehensive view of your item."
    },
    {
      question: "Is selling on RETREND free?",
      answer: "Yes, listing items on RETREND is completely free. We only charge a small commission when your item sells successfully."
    },
    {
      question: "How can I promote my listings?",
      answer: "You can promote your listings to gain more visibility. Go to your listing and click the 'Promote' button. Promoted items appear at the top of search results with a 'Best One' badge for 30 days."
    }
  ];

  const accountFaqs = [
    {
      question: "How do I change my account information?",
      answer: "You can update your profile information by clicking on your profile icon in the top right corner and selecting 'Profile' from the dropdown menu. Then click the 'Edit Profile' button to make changes to your details."
    },
    {
      question: "Can I have multiple accounts on RETREND?",
      answer: "We recommend having only one account per user to maintain a transparent and trustworthy marketplace. Multiple accounts from the same user may be flagged by our system."
    },
    {
      question: "How do I reset my password?",
      answer: "On the login page, click 'Forgot Password'. Enter your registered email address, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, RETREND takes data privacy seriously. We use industry-standard encryption to protect your personal information and never share your details with third parties without your consent. You can review our Privacy Policy for more details."
    }
  ];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
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
              Frequently Asked Questions
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="800px" color="gray.700">
              Find answers to common questions about using RETREND for buying and selling pre-owned goods.
            </Text>
            <InputGroup size="lg" maxW="600px" mt={4}>
              <Input
                pr="4.5rem"
                placeholder="Search for answers..."
                bg="white"
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

      {/* FAQ Categories */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%">
            <FAQCategory title="General Questions" faqs={generalFaqs} />
            <FAQCategory title="Buying on RETREND" faqs={buyingFaqs} />
            <FAQCategory title="Selling on RETREND" faqs={sellingFaqs} />
            <FAQCategory title="Account & Security" faqs={accountFaqs} />
          </SimpleGrid>
          
          <Box textAlign="center" pt={8}>
            <Heading as="h2" size="lg" mb={4}>Still Have Questions?</Heading>
            <Text fontSize="lg" color="gray.600" mb={6} maxW="800px" mx="auto">
              If you couldn't find the answer you were looking for, our support team is here to help.
            </Text>
            <Button 
              as={Link} 
              to="/contact" 
              colorScheme="teal" 
              size="lg"
              rightIcon={<FaArrowRight />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Contact Support
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQ;
