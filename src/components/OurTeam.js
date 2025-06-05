import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  VStack,
  Image,
  useColorModeValue,
  HStack,
  Icon,
  Divider
} from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa';
import { Link as ChakraLink } from '@chakra-ui/react';

const TeamMember = ({ name, role, bio, image, linkedinUrl }) => {
  return (
    <VStack
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg={useColorModeValue('white', 'gray.700')}
      spacing={6}
      align="center"
      height="100%"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Box
        position="relative"
        width="200px"
        height="200px"
        borderRadius="full"
        overflow="hidden"
        border="4px solid"
        borderColor="teal.500"
        boxShadow="lg"
      >
        <Image
          src={image}
          alt={name}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      
      <VStack spacing={1}>
        <Heading as="h3" size="md">{name}</Heading>
        <Text color="teal.500" fontWeight="bold">{role}</Text>
      </VStack>
      
      <Text textAlign="center" color="gray.600">{bio}</Text>
      
      {linkedinUrl && (
        <HStack spacing={4} pt={2}>
          <ChakraLink href={linkedinUrl} isExternal>
            <Icon as={FaLinkedin} w={6} h={6} color="blue.500" _hover={{ color: "blue.600" }} />
          </ChakraLink>
        </HStack>
      )}
    </VStack>
  );
};

const LeadershipSection = () => {
  const teamMembers = [
    {
      name: "Rabbani",
      role: "Chief Executive Officer",
      bio: "Rabbani is a brilliant engineering student with exceptional leadership skills. As the co-founder of RETREND, he brings innovative ideas and technical expertise to revolutionize the second-hand marketplace in India.",
      image: "/team-images/rabbani.jpg",
      linkedinUrl: "https://in.linkedin.com/in/mohammad-rabbani-pasha-08272b23a"
    },
    {
      name: "Vamshi",
      role: "Chief Technology Officer",
      bio: "Vamshi is a talented engineering student with a passion for cutting-edge technology. His expertise in software architecture and development drives RETREND's technological innovation and platform evolution.",
      image: "/team-images/vamshi.jpeg"
    }
  ];

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Heading as="h2" size="xl">Leadership Team</Heading>
          <Text fontSize="lg" maxW="800px" color="gray.600">
            Meet the visionaries guiding RETREND toward a more sustainable future.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

const DepartmentSection = () => {
  const departments = [
    {
      name: "Engineering Team",
      members: [
        {
          name: "Muskaan",
          role: "Lead Frontend Developer",
          bio: "Muskaan crafts beautiful, responsive interfaces that make our platform a joy to use, specializing in creating seamless user experiences.",
          image: "/team-images/muskaan.jpg",
          linkedinUrl: "https://www.linkedin.com/in/muskaan-fathima-630501357"
        },
        {
          name: "Abhi",
          role: "Backend Developer",
          bio: "Abhi builds robust systems that power our marketplace and ensure seamless transactions, with expertise in scalable architecture.",
          image: "/team-images/abhi.jpeg"
        },
        {
          name: "Vikhyath",
          role: "DevOps Engineer",
          bio: "Vikhyath ensures our platform is always up and running smoothly for our users, implementing CI/CD pipelines and monitoring systems.",
          image: "/team-images/vikhyath.jpeg",
          linkedinUrl: "https://www.linkedin.com/in/vikhyath-nimmlapudi-7baa0626b"
        }
      ]
    },
    {
      name: "Design Team",
      members: [
        {
          name: "Bhanu",
          role: "Lead UX Designer",
          bio: "bhanu ensures our user experience is intuitive and delightful across all touchpoints, with a keen eye for detail and user-centered design approach.",
          image: "/team-images/arun.jpg"
        },
        {
          name: "Arun",
          role: "UI Designer",
          bio: "arun creates beautiful interfaces that blend aesthetics with functionality, bringing creativity and innovation to every design element.",
          image: "/team-images/banu.jpeg"
        }
      ]
    },
    {
      name: "Marketing Team",
      members: [
        {
          name: "Karthik",
          role: "Marketing Director",
          bio: "Karthik leads our marketing efforts to spread the word about sustainable commerce, developing strategies that connect with our target audience.",
          image: "/team-images/karthik.jpg"
        }
      ]
    }
  ];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} py={16}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="xl">Our Departments</Heading>
            <Text fontSize="lg" maxW="800px" color="gray.600">
              The talented teams working together to make RETREND India's leading platform for second-hand goods.
            </Text>
          </VStack>

          {departments.map((department, index) => (
            <VStack key={index} spacing={8} width="100%">
              <Heading as="h3" size="lg" textAlign="center">
                {department.name}
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="100%">
                {department.members.map((member, idx) => (
                  <TeamMember key={idx} {...member} />
                ))}
              </SimpleGrid>
              
              {index < departments.length - 1 && (
                <Divider mt={8} borderColor="gray.300" />
              )}
            </VStack>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

const OurTeam = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box bg={useColorModeValue('white', 'gray.900')}>
      {/* Hero Section */}
      <Box bg="linear-gradient(90deg, #FFFBF5, #C5BAFF 100%)" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading 
              as="h1" 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
            >
              Meet Our Team
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="800px" color="gray.700">
              The passionate individuals behind RETREND working together to revolutionize second-hand commerce in India.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Leadership Section */}
      <LeadershipSection />

      {/* Department Section */}
      <DepartmentSection />

      {/* Join Our Team */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="xl">Want to Join Our Team?</Heading>
          <Text fontSize="lg" maxW="800px" color="gray.600">
            We're always looking for talented individuals who are passionate about sustainability and innovation.
          </Text>
          <Box
            as="a"
            href="/careers"
            px={8}
            py={4}
            bg="teal.500"
            color="white"
            fontWeight="bold"
            borderRadius="md"
            _hover={{ bg: "teal.600", transform: "translateY(-2px)", boxShadow: "lg" }}
            transition="all 0.3s"
          >
            View Open Positions
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default OurTeam;
