import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
  Icon,
  Flex,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';

const ContactCard = ({ icon, title, content, action, actionText }) => {
  return (
    <Box
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg={useColorModeValue('white', 'gray.700')}
      height="100%"
      display="flex"
      flexDirection="column"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
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
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Heading as="h3" size="md" mb={3}>{title}</Heading>
      <Text color="gray.600" mb={4} flex="1">{content}</Text>
      {action && (
        <Button 
          as="a" 
          href={action} 
          variant="outline" 
          colorScheme="teal" 
          leftIcon={<FaPaperPlane />}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: 'Message sent!',
        description: "We've received your message and will get back to you soon.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      content: "For general inquiries and support, reach out to us via email. We typically respond within 24 hours.",
      action: "mailto:support@retrend.in",
      actionText: "support@retrend.in"
    },
    {
      icon: FaEnvelope,
      title: "Email Support",
      content: "For urgent matters, our customer support team is available Monday to Friday, 9 AM to 6 PM IST.",
      action: "mailto:support@retrend.in",
      actionText: "Email Support"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      content: "Our headquarters is located in Hyderabad. Please schedule an appointment before visiting.",
      action: "https://maps.google.com",
      actionText: "Get Directions"
    }
  ];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Hero Section */}
      <Box bg="linear-gradient(90deg, #FFFBF5, #C5BAFF 100%)" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading 
              as="h1" 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
            >
              Contact Us
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="800px" color="gray.700">
              Have questions or feedback? We'd love to hear from you. Our team is here to help with any inquiries about RETREND.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Contact Methods */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {contactMethods.map((method, index) => (
            <ContactCard key={index} {...method} />
          ))}
        </SimpleGrid>
      </Container>

      {/* Contact Form */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
            <VStack align="start" spacing={8}>
              <VStack align="start" spacing={4}>
                <Heading as="h2" size="xl">Get in Touch</Heading>
                <Text color="gray.600">
                  Fill out the form, and our team will get back to you as soon as possible. We value your feedback and are committed to providing the best experience on RETREND.
                </Text>
              </VStack>
              
              <VStack align="start" spacing={4} width="100%">
                <Heading as="h3" size="md">Our Commitment</Heading>
                <Text color="gray.600">
                  At RETREND, we're dedicated to:
                </Text>
                <HStack align="start" spacing={4}>
                  <Icon as={FaCheck} color="teal.500" mt={1} />
                  <Text color="gray.600">Responding to all inquiries within 24 hours</Text>
                </HStack>
                <HStack align="start" spacing={4}>
                  <Icon as={FaCheck} color="teal.500" mt={1} />
                  <Text color="gray.600">Providing clear and helpful information</Text>
                </HStack>
                <HStack align="start" spacing={4}>
                  <Icon as={FaCheck} color="teal.500" mt={1} />
                  <Text color="gray.600">Taking your feedback seriously to improve our platform</Text>
                </HStack>
              </VStack>
            </VStack>
            
            <Box
              p={8}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue('white', 'gray.700')}
            >
              {isSubmitted ? (
                <VStack spacing={6} py={10} align="center">
                  <Flex 
                    w={20} 
                    h={20} 
                    align="center" 
                    justify="center" 
                    color="white" 
                    rounded="full" 
                    bg="green.500" 
                    mb={4}
                  >
                    <Icon as={FaCheck} w={10} h={10} />
                  </Flex>
                  <Heading as="h3" size="lg" textAlign="center">Message Sent!</Heading>
                  <Text textAlign="center" color="gray.600">
                    Thank you for reaching out. We've received your message and will get back to you as soon as possible.
                  </Text>
                  <Button 
                    colorScheme="teal" 
                    mt={4} 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: ''
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </VStack>
              ) : (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Your name" 
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Your email address" 
                      />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <Input 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="Your phone number" 
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Subject</FormLabel>
                      <Select 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange}
                        placeholder="Select a subject"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>
                      <Textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder="How can we help you?" 
                        rows={5}
                      />
                    </FormControl>
                    
                    <Button 
                      type="submit" 
                      colorScheme="teal" 
                      size="lg" 
                      width="100%" 
                      mt={4}
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              )}
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="xl">Frequently Asked Questions</Heading>
          <Text fontSize="lg" maxW="800px" color="gray.600">
            Need immediate answers? Check out our FAQ section for common questions about RETREND.
          </Text>
          <Button 
            as="a" 
            href="/faq" 
            colorScheme="teal" 
            size="lg"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            View FAQs
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact;
