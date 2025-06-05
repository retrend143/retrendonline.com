import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  ListItem,
  UnorderedList,
  OrderedList
} from '@chakra-ui/react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box bg="white" py={10}>
      <Container maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" mb={4}>Privacy Policy</Heading>
          <Text>Last Updated: May 19, 2025</Text>
          
          <Divider my={6} />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Introduction</Heading>
            <Text mb={4}>
              Welcome to RETREND. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website
              and tell you about your privacy rights and how the law protects you.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Information We Collect</Heading>
            <Text mb={2}>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Identity Data includes first name, last name, username or similar identifier.</ListItem>
              <ListItem>Contact Data includes email address, telephone numbers, and address.</ListItem>
              <ListItem>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</ListItem>
              <ListItem>Profile Data includes your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</ListItem>
              <ListItem>Usage Data includes information about how you use our website, products, and services.</ListItem>
            </UnorderedList>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>How We Use Your Information</Heading>
            <Text mb={2}>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</Text>
            <OrderedList pl={6} spacing={2} mb={4}>
              <ListItem>To register you as a new customer.</ListItem>
              <ListItem>To process and deliver your orders including managing payments.</ListItem>
              <ListItem>To manage our relationship with you including notifying you about changes to our terms or privacy policy.</ListItem>
              <ListItem>To enable you to participate in a review, survey, or other features of our service.</ListItem>
              <ListItem>To administer and protect our business and this website.</ListItem>
              <ListItem>To deliver relevant website content and advertisements to you.</ListItem>
              <ListItem>To use data analytics to improve our website, products/services, marketing, customer relationships, and experiences.</ListItem>
            </OrderedList>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Data Security</Heading>
            <Text mb={4}>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, 
              or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those 
              employees, agents, contractors, and other third parties who have a business need to know.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Data Retention</Heading>
            <Text mb={4}>
              We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, 
              including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Your Legal Rights</Heading>
            <Text mb={2}>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Request access to your personal data.</ListItem>
              <ListItem>Request correction of your personal data.</ListItem>
              <ListItem>Request erasure of your personal data.</ListItem>
              <ListItem>Object to processing of your personal data.</ListItem>
              <ListItem>Request restriction of processing your personal data.</ListItem>
              <ListItem>Request transfer of your personal data.</ListItem>
              <ListItem>Right to withdraw consent.</ListItem>
            </UnorderedList>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Cookies</Heading>
            <Text mb={4}>
              Cookies are small text files that are placed on your computer by websites that you visit. 
              They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Changes to This Privacy Policy</Heading>
            <Text mb={4}>
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
              You are advised to review this privacy policy periodically for any changes.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Contact Us</Heading>
            <Text mb={4}>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br />
              Email: support@RETREND.in
              <br />
              Email: support@retrend.in
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
