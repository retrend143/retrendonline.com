import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Tag,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Divider,
  Avatar
} from '@chakra-ui/react';
import { FaSearch, FaCalendarAlt, FaUser, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogCard = ({ title, excerpt, image, date, author, category, comments, id }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg={useColorModeValue('white', 'gray.700')}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      height="100%"
    >
      <Image src={image} alt={title} width="100%" height="200px" objectFit="cover" />
      <Box p={6}>
        <HStack mb={3}>
          <Tag size="sm" colorScheme="teal">{category}</Tag>
        </HStack>
        <Heading as="h3" size="md" mb={2} noOfLines={2}>
          <Link to={`/blog/${id}`}>{title}</Link>
        </Heading>
        <Text color="gray.600" mb={4} noOfLines={3}>{excerpt}</Text>
        <Divider my={4} />
        <Flex justify="space-between" align="center">
          <HStack>
            <Avatar size="sm" name={author} src="" />
            <Text fontSize="sm" color="gray.500">{author}</Text>
          </HStack>
          <HStack spacing={4}>
            <HStack>
              <FaCalendarAlt size={12} color="gray" />
              <Text fontSize="xs" color="gray.500">{date}</Text>
            </HStack>
            <HStack>
              <FaComment size={12} color="gray" />
              <Text fontSize="xs" color="gray.500">{comments} comments</Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

const FeaturedPost = ({ title, excerpt, image, date, author, category, id }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg={useColorModeValue('white', 'gray.700')}
      height="100%"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Image 
          src={image} 
          alt={title} 
          height={{ base: "200px", md: "100%" }} 
          width="100%" 
          objectFit="cover" 
        />
        <Box p={6}>
          <HStack mb={3}>
            <Tag size="sm" colorScheme="red">Featured</Tag>
            <Tag size="sm" colorScheme="teal">{category}</Tag>
          </HStack>
          <Heading as="h2" size="lg" mb={4}>
            <Link to={`/blog/${id}`}>{title}</Link>
          </Heading>
          <Text color="gray.600" mb={4} noOfLines={4}>{excerpt}</Text>
          <Divider my={4} />
          <Flex justify="space-between" align="center">
            <HStack>
              <Avatar size="sm" name={author} src="" />
              <Text fontSize="sm" color="gray.500">{author}</Text>
            </HStack>
            <HStack>
              <FaCalendarAlt size={14} color="gray" />
              <Text fontSize="sm" color="gray.500">{date}</Text>
            </HStack>
          </Flex>
          <Button 
            mt={6} 
            colorScheme="teal" 
            as={Link} 
            to={`/blog/${id}`}
          >
            Read More
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  // Mock blog data
  const featuredPost = {
    id: "sustainable-shopping",
    title: "10 Tips for Sustainable Shopping in 2025",
    excerpt: "Discover how to make environmentally-conscious shopping decisions that reduce waste and support a circular economy. Learn practical tips for finding quality second-hand items that last longer.",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHN1c3RhaW5hYmxlJTIwc2hvcHBpbmd8ZW58MHx8fHwxNjg0NzQ5MjI5fDA&ixlib=rb-4.0.3&q=80&w=1080",
    date: "May 15, 2025",
    author: "Priya Sharma",
    category: "Sustainability",
    comments: 24
  };

  const blogPosts = [
    {
      id: "vintage-trends",
      title: "Vintage Fashion Trends Making a Comeback in 2025",
      excerpt: "From bell-bottoms to platform shoes, discover which vintage fashion trends are returning to the spotlight this year and how to style them in a modern way.",
      image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8dmludGFnZSUyMGZhc2hpb258ZW58MHx8fHwxNjg0NzQ5MzA1fDA&ixlib=rb-4.0.3&q=80&w=1080",
      date: "May 12, 2025",
      author: "Arjun Mehta",
      category: "Fashion",
      comments: 18
    },
    {
      id: "upcycling-guide",
      title: "The Ultimate Guide to Upcycling Your Old Furniture",
      excerpt: "Turn your outdated furniture pieces into stunning statement items with these creative upcycling techniques that anyone can master, even on a tight budget.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHVwY3ljbGluZ3xlbnwwfHx8fDE2ODQ3NDkzNTl8MA&ixlib=rb-4.0.3&q=80&w=1080",
      date: "May 8, 2025",
      author: "Rahul Desai",
      category: "DIY",
      comments: 31
    },
    {
      id: "seller-success",
      title: "Success Stories: How These Sellers Made ₹50,000+ on RETREND",
      excerpt: "Meet the everyday people who turned their decluttering journey into a profitable side hustle on RETREND, and learn their strategies for successful selling.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHNlbGxpbmd8ZW58MHx8fHwxNjg0NzQ5NDE3fDA&ixlib=rb-4.0.3&q=80&w=1080",
      date: "May 2, 2025",
      author: "Vikram Singh",
      category: "Success Stories",
      comments: 47
    },
    {
      id: "decluttering-tips",
      title: "Decluttering Your Home in 7 Days: A Step-by-Step Plan",
      excerpt: "Follow this practical 7-day plan to transform your cluttered space into an organized haven, while identifying items that could earn you money on RETREND.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZGVjbHV0dGVyaW5nfGVufDB8fHx8MTY4NDc0OTQ3OHww&ixlib=rb-4.0.3&q=80&w=1080",
      date: "April 25, 2025",
      author: "Neha Gupta",
      category: "Lifestyle",
      comments: 29
    },
    {
      id: "product-photography",
      title: "Smartphone Photography: Capturing Perfect Product Photos",
      excerpt: "Learn professional techniques for taking stunning product photos using just your smartphone, helping your listings stand out and sell faster.",
      image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8fHx8MTY4NDc0OTUzNHww&ixlib=rb-4.0.3&q=80&w=1080",
      date: "April 20, 2025",
      author: "Sanjay Khanna",
      category: "Photography",
      comments: 35
    },
    {
      id: "electronic-buying",
      title: "What to Check When Buying Second-Hand Electronics",
      excerpt: "Essential tips to ensure you're making a smart purchase when buying used electronics, from testing functionality to spotting potential red flags.",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZWxlY3Ryb25pY3N8ZW58MHx8fHwxNjg0NzQ5NTc2fDA&ixlib=rb-4.0.3&q=80&w=1080",
      date: "April 15, 2025",
      author: "Amit Joshi",
      category: "Buying Guide",
      comments: 42
    }
  ];

  const categories = [
    { name: "Sustainability", count: 24 },
    { name: "Fashion", count: 18 },
    { name: "DIY", count: 31 },
    { name: "Success Stories", count: 15 },
    { name: "Lifestyle", count: 29 },
    { name: "Photography", count: 12 },
    { name: "Buying Guide", count: 22 }
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
              RETREND Blog
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="800px" color="gray.700">
              Insights, tips, and stories about sustainable shopping, second-hand commerce, and making the most of your RETREND experience.
            </Text>
            <InputGroup size="lg" maxW="600px" mt={4}>
              <Input
                pr="4.5rem"
                placeholder="Search articles..."
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

      {/* Featured Post */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="xl">Featured Post</Heading>
          </VStack>

          <FeaturedPost {...featuredPost} />
        </VStack>
      </Container>

      {/* Latest Posts */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={8}>
            <VStack align="start" spacing={8} gridColumn={{ lg: "span 3" }}>
              <Heading as="h2" size="xl">Latest Articles</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} width="100%">
                {blogPosts.map((post, index) => (
                  <BlogCard key={index} {...post} />
                ))}
              </SimpleGrid>
              
              <Button 
                colorScheme="teal" 
                alignSelf="center"
                size="lg"
                mt={4}
              >
                Load More Articles
              </Button>
            </VStack>
            
            {/* Sidebar */}
            <VStack align="start" spacing={8}>
              <Box 
                p={6} 
                bg={useColorModeValue('white', 'gray.700')} 
                borderRadius="lg" 
                boxShadow="md"
                width="100%"
              >
                <Heading as="h3" size="md" mb={4}>Categories</Heading>
                <VStack align="start" spacing={2}>
                  {categories.map((category, index) => (
                    <Flex 
                      key={index} 
                      justify="space-between" 
                      width="100%" 
                      py={2}
                      _hover={{ color: "teal.500" }}
                      cursor="pointer"
                    >
                      <Text>{category.name}</Text>
                      <Text color="gray.500">{category.count}</Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
              
              <Box 
                p={6} 
                bg={useColorModeValue('white', 'gray.700')} 
                borderRadius="lg" 
                boxShadow="md"
                width="100%"
              >
                <Heading as="h3" size="md" mb={4}>Subscribe</Heading>
                <Text mb={4}>Get the latest articles and updates delivered to your inbox.</Text>
                <Input placeholder="Your email address" mb={4} />
                <Button colorScheme="teal" width="100%">Subscribe</Button>
              </Box>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Blog;
