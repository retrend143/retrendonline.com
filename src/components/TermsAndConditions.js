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

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box bg="white" py={10}>
      <Container maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" mb={4}>Terms and Conditions</Heading>
          <Text>Last Updated: May 19, 2025</Text>
          
          <Divider my={6} />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Introduction</Heading>
            <Text mb={4}>
              Welcome to RETREND. These terms and conditions outline the rules and regulations for the use of RETREND's website.
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use RETREND's website
              if you do not accept all of the terms and conditions stated on this page.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>License to Use</Heading>
            <Text mb={4}>
              Unless otherwise stated, RETREND and/or its licensors own the intellectual property rights for all material on RETREND.
              All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use
              subject to restrictions set in these terms and conditions.
            </Text>
            <Text mb={2}>You must not:</Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Republish material from this website</ListItem>
              <ListItem>Sell, rent, or sub-license material from this website</ListItem>
              <ListItem>Reproduce, duplicate, or copy material from this website</ListItem>
              <ListItem>Redistribute content from RETREND (unless content is specifically made for redistribution)</ListItem>
            </UnorderedList>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>User Account</Heading>
            <Text mb={4}>
              If you create an account on our website, you are responsible for maintaining the security of your account,
              and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the account.
              You must immediately notify RETREND of any unauthorized uses of your account or any other breaches of security.
              RETREND will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>User Content</Heading>
            <Text mb={4}>
              In these terms and conditions, "User Content" shall mean any audio, video, text, images, or other material you choose to display on this website.
              By displaying your User Content, you grant RETREND a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate,
              and distribute it in any and all media.
            </Text>
            <Text mb={4}>
              Your User Content must be your own and must not be infringing on any third party's rights.
              RETREND reserves the right to remove any of your content from this website at any time without notice.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Prohibited Uses</Heading>
            <Text mb={2}>You may not use this website for any of the following purposes:</Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>In any way that breaches any applicable local, national, or international law or regulation</ListItem>
              <ListItem>In any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect</ListItem>
              <ListItem>To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material or any other form of similar solicitation (spam)</ListItem>
              <ListItem>To knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware, or any other harmful programs or similar computer code designed to adversely affect the operation of any computer software or hardware</ListItem>
            </UnorderedList>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Limitation of Liability</Heading>
            <Text mb={4}>
              In no event shall RETREND, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website,
              whether such liability is under contract, tort, or otherwise, and RETREND, including its officers, directors, and employees shall not be liable for any indirect, consequential,
              or special liability arising out of or in any way related to your use of this website.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Indemnification</Heading>
            <Text mb={4}>
              You hereby indemnify to the fullest extent RETREND from and against any and all liabilities, costs, demands, causes of action, damages, and expenses (including reasonable attorney's fees)
              arising out of or in any way related to your breach of any of the provisions of these terms.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Severability</Heading>
            <Text mb={4}>
              If any provision of these terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these terms unenforceable or invalid as a whole,
              and such provisions shall be deleted without affecting the remaining provisions herein.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Variation of Terms</Heading>
            <Text mb={4}>
              RETREND is permitted to revise these terms at any time as it sees fit, and by using this website, you are expected to review such terms on a regular basis to ensure you understand all terms and conditions governing use of this website.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Governing Law & Jurisdiction</Heading>
            <Text mb={4}>
              These terms will be governed by and construed in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the courts located in India for the resolution of any disputes.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Contact Us</Heading>
            <Text mb={4}>
              If you have any questions about these Terms and Conditions, please contact us at:
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

export default TermsAndConditions;
