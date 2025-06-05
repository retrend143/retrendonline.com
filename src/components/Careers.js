import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  Badge,
  Button,
  Divider,
  HStack,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { FaBriefcase, FaLaptopCode, FaChartLine, FaHeadset, FaUserFriends } from 'react-icons/fa';

const JobCard = ({ title, department, location, type, description }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Box
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg={cardBg}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      height="100%"
    >
      <Heading as="h3" size="md" mb={2}>{title}</Heading>
      <HStack mb={3}>
        <Badge colorScheme="teal">{department}</Badge>
        <Badge colorScheme="purple">{location}</Badge>
        <Badge colorScheme="blue">{type}</Badge>
      </HStack>
      <Text color="gray.600" mb={4}>{description}</Text>
      <Button colorScheme="teal" size="sm">Apply Now</Button>
    </Box>
  );
};

const CareerBenefit = ({ icon, title, description }) => {
  return (
    <VStack 
      align="center" 
      p={6} 
      borderRadius="lg" 
      boxShadow="md" 
      bg={useColorModeValue('white', 'gray.700')}
      height="100%"
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
      <Heading as="h3" size="md" mb={2} textAlign="center">{title}</Heading>
      <Text textAlign="center" color="gray.600">{description}</Text>
    </VStack>
  );
};

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jobs = [
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for an experienced Full Stack Developer to join our team. You'll be responsible for developing and maintaining our web applications."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Hyderabad",
      type: "Full-time",
      description: "Join our design team to create beautiful, intuitive interfaces for our marketplace platform that millions of users interact with daily."
    },
    {
      title: "Customer Support Specialist",
      department: "Operations",
      location: "Bangalore",
      type: "Full-time",
      description: "Help our users navigate the platform, resolve issues, and ensure they have the best possible experience using RETREND."
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Mumbai",
      type: "Full-time",
      description: "Drive growth through innovative marketing strategies, campaigns, and initiatives to expand our user base across India."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Delhi",
      type: "Full-time",
      description: "Lead product development initiatives, gather requirements, and work with cross-functional teams to deliver new features and improvements."
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      description: "Analyze user behavior, marketplace trends, and business metrics to provide insights that drive strategic decision-making."
    }
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
              Join Our Team
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="800px" color="gray.700">
              At RETREND, we're building the future of sustainable commerce. Join us in our mission to transform how people buy and sell pre-owned goods across India.
            </Text>
            <Button 
              colorScheme="teal" 
              size="lg" 
              mt={4}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              View Open Positions
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Our Culture */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="xl">Our Culture</Heading>
            <Text fontSize="lg" maxW="800px" color="gray.600">
              We're a team of passionate individuals committed to sustainability, innovation, and creating a positive impact. Our culture is built on collaboration, transparency, and continuous learning.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <CareerBenefit 
              icon={FaLaptopCode}
              title="Flexible Work"
              description="Work from home or office with flexible hours that fit your lifestyle and productivity patterns."
            />
            <CareerBenefit 
              icon={FaChartLine}
              title="Growth Opportunities"
              description="Continuous learning, mentorship, and clear paths for career advancement within the company."
            />
            <CareerBenefit 
              icon={FaUserFriends}
              title="Inclusive Environment"
              description="A diverse team where every voice is valued and everyone has the opportunity to make an impact."
            />
          </SimpleGrid>
        </VStack>
      </Container>

      <Divider />

      {/* Open Positions */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="xl">Open Positions</Heading>
            <Text fontSize="lg" maxW="800px" color="gray.600">
              Join our mission to revolutionize second-hand commerce in India. Check out our current openings and find your perfect role.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Application Process */}
      <Box bg="linear-gradient(90deg, #FFFBF5, #C5BAFF 100%)" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="xl">Application Process</Heading>
              <Text fontSize="lg" maxW="800px" color="gray.600">
                We've designed a straightforward application process to help you find your place at RETREND.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
              <VStack align="center">
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
                  <Text fontWeight="bold" fontSize="xl">1</Text>
                </Flex>
                <Heading as="h3" size="md" textAlign="center">Apply Online</Heading>
                <Text textAlign="center" color="gray.600">Submit your application through our careers portal</Text>
              </VStack>
              
              <VStack align="center">
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
                  <Text fontWeight="bold" fontSize="xl">2</Text>
                </Flex>
                <Heading as="h3" size="md" textAlign="center">Initial Screening</Heading>
                <Text textAlign="center" color="gray.600">A quick call to discuss your background and the role</Text>
              </VStack>
              
              <VStack align="center">
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
                  <Text fontWeight="bold" fontSize="xl">3</Text>
                </Flex>
                <Heading as="h3" size="md" textAlign="center">Interviews</Heading>
                <Text textAlign="center" color="gray.600">Meet with team members and showcase your skills</Text>
              </VStack>
              
              <VStack align="center">
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
                  <Text fontWeight="bold" fontSize="xl">4</Text>
                </Flex>
                <Heading as="h3" size="md" textAlign="center">Offer</Heading>
                <Text textAlign="center" color="gray.600">Receive and accept your offer to join our team</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="xl">Don't See a Perfect Fit?</Heading>
          <Text fontSize="lg" maxW="800px" color="gray.600">
            We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to RETREND.
          </Text>
          <Button 
            colorScheme="teal" 
            size="lg"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Contact HR Team
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Careers;
