import React, { useState, useEffect } from 'react';
import { usersUrl } from '../../shared/urls';
import {
  ScrollView,
  KeyboardAvoidingView,
  Stack,
  Box,
  Input,
  Heading,
  Button,
  Icon,
  Text,
  View,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import LoadingScreen from '../../shared/loadingScreen';
import Purchases from 'react-native-purchases';
const Register = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    repeatpassword: '',
  });

  const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    Purchases.getCustomerInfo().then((response) => {
      setSubscription(response.activeSubscriptions);
    });
  }, []);

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);

  // register Notifcation
  const presentLocalNotification = async () => {
    const sendNotification = () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
        }),
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Successfully Registered',
          body: `Welcome ${data.username} to Razor Dispatch`,
        },
        trigger: null,
      });
    };
    let permissions = await Notifications.getPermissionsAsync();
    if (permissions.granted) {
      sendNotification();
    } else {
      return;
    }
  };

  const onSubmit = async () => {
    if (!regex.test(data.password)) {
      setFeedback(
        'Password needs to be at least 8 digits long and include a number with no symbols'
      );

      return;
    }
    if (data.password !== data.repeatpassword) {
      setFeedback('Passwords do not match');
      return;
    }
    if (data.username === '' || data.email === '') {
      setFeedback('username and email is required');
      return;
    } else {
      setFeedback('');
      await axios
        .post(usersUrl, data)
        .catch((err) => setFeedback(err.response.data))
        .then((res) => {
          if (res.status === 200) {
            presentLocalNotification();
            setIsLoading(true);
            setFeedback(res.data.status);
            setTimeout(() => {
              navigation.navigate('Login Account');
            }, 3000);
          } else {
            setHeader('username in use');
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  const requestNotifyPermissions = async () => {
    let permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.granted) {
      return;
    }
  };

  requestNotifyPermissions();

  if (subscription.length !== 0) {
    if (!isLoading) {
      return (
        <ScrollView bgColor='coolGray.900' flex={1}>
          <Box mt={10} paddingTop={10}>
            <KeyboardAvoidingView
              h={{
                base: '520px',
                lg: 'auto',
              }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <Heading textAlign='center' mt={2} mb={5} color='coolGray.300'>
                Register To Get Organized
              </Heading>
              <Text color='red.600' textAlign='center' marginBottom={3}>
                {feedback}
              </Text>
              <Stack space={4} w='90%' maxW='400px' mx='auto'>
                <Input
                  size='lg'
                  color='white'
                  placeholder='First Name'
                  value={data.firstname}
                  onChangeText={(value) =>
                    setData({ ...data, firstname: value })
                  }
                />
                <Input
                  size='lg'
                  color='white'
                  placeholder='Last Name'
                  value={data.lastname}
                  onChangeText={(value) =>
                    setData({ ...data, lastname: value })
                  }
                />
                <Input
                  size='lg'
                  color='white'
                  placeholder='Email Adress'
                  value={data.email}
                  onChangeText={(value) =>
                    setData({ ...data, email: value.toLowerCase() })
                  }
                />
                <Input
                  size='lg'
                  color='white'
                  placeholder='UserName'
                  value={data.username}
                  onChangeText={(value) =>
                    setData({ ...data, username: value })
                  }
                  isRequired
                />
                <Input
                  type={show ? 'text' : 'password'}
                  size='lg'
                  color='white'
                  value={data.password}
                  onChangeText={(value) =>
                    setData({ ...data, password: value })
                  }
                  InputRightElement={
                    <Button
                      size='xs'
                      rounded='none'
                      w='1/6'
                      h='full'
                      onPress={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  }
                  placeholder='Password'
                />
                <Input
                  type={show2 ? 'text' : 'password'}
                  size='lg'
                  color='white'
                  value={data.repeatpassword}
                  onChangeText={(value) =>
                    setData({ ...data, repeatpassword: value })
                  }
                  InputRightElement={
                    <Button
                      size='xs'
                      rounded='none'
                      w='1/6'
                      h='full'
                      onPress={handleClick2}
                    >
                      {show2 ? 'Hide' : 'Show'}
                    </Button>
                  }
                  placeholder='Repeat Password'
                />
                <Button
                  size='lg'
                  isFocused
                  onPress={() => onSubmit()}
                  borderRadius='lg'
                  _text={{ alignSelf: 'center' }}
                  leftIcon={
                    <Icon
                      alignSelf='center'
                      as={MaterialCommunityIcons}
                      name='cloud-upload-outline'
                      size='md'
                    />
                  }
                >
                  Register
                </Button>
              </Stack>
            </KeyboardAvoidingView>
          </Box>
        </ScrollView>
      );
    }
    return (
      <LoadingScreen
        title='Registration Successful'
        subtitle='Lets get Rolling'
        color={'green.500'}
        mainbackground='transparent'
      />
    );
  } else {
    return (
      <Box flex={1} justifyContent='center' alignItems='center' bgColor='black'>
        <Heading color='gray.200' textAlign='center' mt='4'>
          Try RazorDispatch {'\n'}Free for 7 Days
        </Heading>
        <Text color='gray.300' p={2} textAlign='center' mt='2'>
          Unlimited Data Exports, Organize Your Information In one App. Keep
          track of Loads and Expenses. Constantly Evolving Application. Cancel
          Anytime.
        </Text>
        <Button
          colorScheme='lightBlue'
          onPress={() => {
            navigation.navigate('Paywall');
          }}
        >
          Click here to Subscribe
        </Button>
      </Box>
    );
  }
};

export default Register;
