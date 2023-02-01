import React, { useContext, useState } from 'react';
import {
  ScrollView,
  Box,
  Switch,
  HStack,
  Text,
  Heading,
  VStack,
  Link,
} from 'native-base';
import * as MailComposer from 'expo-mail-composer';

import { AuthContext } from '../../context/auth-context';

const Settings = () => {
  const auth = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const Gradient = {
    linearGradient: {
      colors: ['white', 'blue.800'],
      start: [0, 0],
      end: [1, 0],
    },
  };

  const sendMail = () => {
    MailComposer.composeAsync({
      isHtml: true,
      recipients: ['razordispatch@outlook.com'],
      subject: 'Email Inquiry',
    });
  };

  const onSwitch = () => {
    setChecked(!checked), auth.logout();
  };
  return (
    <Box flex={1} bg={Gradient}>
      <VStack space={3}>
        <Heading
          textAlign='center'
          textTransform='capitalize'
          fontSize='lg'
          mt={5}
          mb={5}
          color='#034efc'
        >
          {' '}
          Hello {auth.username}
        </Heading>
        <VStack>
          <Text mx={3} textTransform='uppercase' mt={1} fontWeight='bold'>
            Account Managment:
          </Text>

          <Box
            mx={2}
            borderColor='black'
            borderWidth={1}
            borderRadius='md'
            shadow={3}
          >
            <HStack space={4} p={2} mx={1} alignItems='center'>
              <Text fontSize='lg' color='red.500'>
                Logout Account
              </Text>
              <Switch
                size='lg'
                offTrackColor='green.700'
                onTrackColor='red.700'
                onToggle={() => onSwitch()}
                isChecked={checked}
              />
            </HStack>
          </Box>
        </VStack>
        <VStack>
          <Text mx={3} textTransform='uppercase' mt={1} fontWeight='bold'>
            Information:
          </Text>
          <Box
            mx={2}
            borderColor='black'
            borderWidth={1}
            borderRadius='md'
            shadow={3}
          >
            <VStack space={2} mb={2} p={2} mx={1}>
              <Link
                href='https://app.termly.io/document/terms-of-use-for-website/50048dee-8193-418e-bb10-fd070206b849'
                _text={{
                  fontSize: 'lg',
                  color: 'blue.600',
                  textTransform: 'capitalize',
                }}
              >
                Review Terms And conditions
              </Link>

              <Link
                href='https://app.termly.io/document/privacy-policy/c93d9c4d-fd75-43ab-bf75-082c9e39d922'
                _text={{
                  fontSize: 'lg',
                  color: 'blue.600',
                  textTransform: 'capitalize',
                }}
              >
                Privacy Policy
              </Link>
            </VStack>
          </Box>
        </VStack>
        <VStack>
          <Text mx={3} textTransform='uppercase' mt={1} fontWeight='bold'>
            Get in Touch:
          </Text>
          <Box
            mx={2}
            borderColor='black'
            borderWidth={1}
            borderRadius='md'
            shadow={3}
          >
            <VStack space={2} mb={2} p={2} mx={1}>
              <Link
                onPress={() => sendMail()}
                _text={{
                  fontSize: 'lg',
                  color: 'blue.600',
                  textTransform: 'capitalize',
                }}
              >
                Contact Us
              </Link>
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Settings;
