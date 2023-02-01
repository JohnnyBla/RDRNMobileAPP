import React, { useState, useEffect, useContext } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { userLogin } from '../shared/urls';
import { AuthContext } from '../context/auth-context';
import Purchases from 'react-native-purchases';
import axios from 'axios';
import {
  Input,
  Icon,
  VStack,
  Heading,
  Text,
  FormControl,
  Box,
  Link,
  Button,
  HStack,
  WarningOutlineIcon,
  KeyboardAvoidingView,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = (props) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const auth = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth.isLoggedIn) {
      props.navigation.navigate('Account');
    } else {
      setError('Please Login');
    }
  }, []);

  // handle Submit Information
  const onSubmit = async () => {
    await axios
      .post(userLogin, { ...form })
      .catch((error) => console.warn(error))
      .then((res) => {
        if (res.status === 200) {
          auth.login(
            res.data.username,
            res.data.token,
            res.data.status,
            res.data.userid
          );
          props.navigation.navigate('Account');
        } else {
          setError('Login Failed');
        }
      })
      .catch((error) => {
        setError('Please Check Your Credientials');
        setCount(count + 1);
        if (count === 3) {
          const Attempts = count - 1;
          setError(
            `You will be redirected in ${Attempts} more attempts Click on Forgot Password if you Need assistance`
          );
        }
        if (count === 4) {
          setError('Please Reset Password');
        }
        if (count === 5) {
          props.navigation.navigate('Forgot Password');
        }
      });
  };

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  return (
    <Box w='100%' flex={1} px={2} marginTop='1/3' bgColor='coolGray.200'>
      <KeyboardAvoidingView
        h={{
          base: '350px',
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Heading
          mb='1'
          alignSelf='flex-start'
          color='logo.300'
          mt={2}
          mx='auto'
        >
          Razor Dispatch
        </Heading>

        <Heading
          mb='3'
          mx='auto'
          _dark={{
            color: 'warmGray.200',
          }}
          color='logo.300'
          fontWeight='medium'
          size='sm'
        >
          {' '}
          Login to continue!
        </Heading>
        <Text alignSelf='center' color='red.700' mb={1}>
          {error}
        </Text>

        <VStack space={3}>
          <FormControl isRequired>
            <FormControl.Label>Login ID</FormControl.Label>
            <Input
              value={form.username}
              w={{ base: '100%', md: '25%' }}
              size='2xl'
              color='logo.100'
              onChangeText={(username) => setForm({ ...form, username })}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name='person' />}
                  size={5}
                  ml='2'
                  color='logo.200'
                />
              }
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size='xs' />}
            >
              User Not Found.
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={form.password}
              size='2xl'
              w={{ base: '100%', md: '25%' }}
              color='logo.100'
              onChangeText={(password) => setForm({ ...form, password })}
              type={show ? 'text' : 'password'}
              isRequired
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={5}
                  mr='2'
                  color='logo.200'
                  onPress={() => setShow(!show)}
                />
              }
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size='xs' />}
            >
              Incorrect Password.
            </FormControl.ErrorMessage>
            <Link
              onPress={() => props.navigation.navigate('Forgot Password')}
              _text={{
                fontSize: 'md',
                fontWeight: '700',
                color: 'logo.300',
              }}
              alignSelf='flex-end'
              mt='1'
            >
              Forgot Password?
            </Link>
          </FormControl>
          <Button
            isFocused={true}
            mt='2'
            size='lg'
            colorScheme='amber'
            type='submit'
            onPress={() => onSubmit()}
          >
            Sign in
          </Button>
          <HStack mt='6' justifyContent='center' alignItems='center'>
            <Text
              fontSize='sm'
              color='coolGray.800'
              _dark={{
                color: 'warmGray.200',
              }}
            >
              New user:{' '}
            </Text>
            <Link
              _text={{
                color: 'logo.300',
                fontWeight: 'medium',
                fontSize: 'lg',
              }}
              onPress={() => props.navigation.navigate('Register')}
            >
              Register Here
            </Link>
          </HStack>
        </VStack>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default HomeScreen;
