import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  RadioGroup,
  Radio,
  HStack,
  useToast,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Flex
} from '@chakra-ui/react';
import { FaStar, FaCheck } from 'react-icons/fa';

const Feedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '3',
    feedbackType: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
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
        title: 'Feedback submitted!',
        description: "Thank you for helping us improve RETREND.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 1500);
  };

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
              We Value Your Feedback
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="800px" color="gray.700">
              Your opinions help us improve RETREND. Let us know what you think about our platform and how we can make it even better.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Feedback Form */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          <VStack align="start" spacing={8}>
            <VStack align="start" spacing={4}>
              <Heading as="h2" size="xl">Help Us Improve</Heading>
              <Text color="gray.600">
                At RETREND, we're constantly working to enhance your experience. Your feedback is invaluable in guiding our improvements and ensuring we meet your needs.
              </Text>
            </VStack>
            
            <VStack align="start" spacing={6} width="100%">
              <Heading as="h3" size="md">Why Your Feedback Matters</Heading>
              
              <HStack align="start" spacing={4}>
                <Icon as={FaCheck} color="teal.500" mt={1} />
                <Text color="gray.600">
                  <Text as="span" fontWeight="bold">Product Improvements:</Text> Your suggestions directly influence our platform updates and new features.
                </Text>
              </HStack>
              
              <HStack align="start" spacing={4}>
                <Icon as={FaCheck} color="teal.500" mt={1} />
                <Text color="gray.600">
                  <Text as="span" fontWeight="bold">User Experience:</Text> We want to ensure RETREND is intuitive and enjoyable to use for everyone.
                </Text>
              </HStack>
              
              <HStack align="start" spacing={4}>
                <Icon as={FaCheck} color="teal.500" mt={1} />
                <Text color="gray.600">
                  <Text as="span" fontWeight="bold">Community Building:</Text> Your insights help us build a stronger, more connected marketplace community.
                </Text>
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
                <Heading as="h3" size="lg" textAlign="center">Feedback Submitted!</Heading>
                <Text textAlign="center" color="gray.600">
                  Thank you for taking the time to share your thoughts with us. We appreciate your contribution to making RETREND better.
                </Text>
                <Button 
                  colorScheme="teal" 
                  mt={4} 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      rating: '3',
                      feedbackType: 'general',
                      message: ''
                    });
                  }}
                >
                  Submit Another Feedback
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
                  
                  <FormControl isRequired>
                    <FormLabel>Your Overall Experience</FormLabel>
                    <RadioGroup 
                      value={formData.rating} 
                      onChange={(value) => handleRadioChange('rating', value)}
                    >
                      <HStack spacing={4}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Radio key={rating} value={rating.toString()}>
                            <Icon 
                              as={FaStar} 
                              color={parseInt(formData.rating) >= rating ? "yellow.400" : "gray.300"} 
                            />
                          </Radio>
                        ))}
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Feedback Type</FormLabel>
                    <RadioGroup 
                      value={formData.feedbackType} 
                      onChange={(value) => handleRadioChange('feedbackType', value)}
                    >
                      <HStack spacing={4} flexWrap="wrap">
                        <Radio value="general">General</Radio>
                        <Radio value="bug">Bug Report</Radio>
                        <Radio value="feature">Feature Request</Radio>
                        <Radio value="complaint">Complaint</Radio>
                        <Radio value="praise">Praise</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Your Feedback</FormLabel>
                    <Textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Please share your thoughts, suggestions, or concerns..." 
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
                    loadingText="Submitting..."
                  >
                    Submit Feedback
                  </Button>
                </VStack>
              </form>
            )}
          </Box>
        </SimpleGrid>
      </Container>

      {/* Additional Info */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl">Other Ways to Connect</Heading>
            <Text fontSize="lg" maxW="800px" color="gray.600">
              We're always open to hearing from our users. If you prefer, you can also reach out to us through these channels:
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%" maxW="800px">
              <VStack>
                <Box
                  p={4}
                  borderRadius="full"
                  bg="teal.50"
                  color="teal.500"
                  boxSize="80px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FaStar} boxSize={10} />
                </Box>
                <Heading as="h3" size="md">App Store Reviews</Heading>
                <Text color="gray.600">Rate us on your app store of choice</Text>
              </VStack>
              
              <VStack>
                <Box
                  p={4}
                  borderRadius="full"
                  bg="teal.50"
                  color="teal.500"
                  boxSize="80px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FaCheck} boxSize={10} />
                </Box>
                <Heading as="h3" size="md">Surveys</Heading>
                <Text color="gray.600">Participate in our user surveys</Text>
              </VStack>
              
              <VStack>
                <Box
                  p={4}
                  borderRadius="full"
                  bg="teal.50"
                  color="teal.500"
                  boxSize="80px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FaCheck} boxSize={10} />
                </Box>
                <Heading as="h3" size="md">Social Media</Heading>
                <Text color="gray.600">Connect with us on social platforms</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Feedback;
