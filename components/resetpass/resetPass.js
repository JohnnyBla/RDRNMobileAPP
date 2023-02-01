import React, { useState } from 'react';
import {
  Input,
  KeyboardAvoidingView,
  Text,
  Button,
  VStack,
  Heading,
  Center,
  Box,
  Icon,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import axios from 'axios';
import * as Notifications from 'expo-notifications';

import LoadingScreen from '../../shared/loadingScreen';
const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

const ResetPass = ({ navigation }) => {
  // loading components
  const [isLoading, setIsLoading] = useState(false);
  // headers
  const [confirmationHeader, setConfirmationHeader] = useState('');
  const [header, setHeader] = useState(
    'Not to worry! Enter Your email address associated with your account, and your new password'
  );
  // color change
  const [color, setColor] = useState('muted.400');
  // password form
  const [form, setForm] = useState({
    email: '',
    password: '',
    repeatpassword: '',
  });
  // show passwords
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  //password change notification;

  const presentLocalNotification = async () => {
    const sendNotification = () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
        }),
      });

      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Password Update',
          body: `password associated with ${form.email} has been changed successfully`,
        },
        trigger: null,
      });
    };
    let permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.granted) {
      sendNotification();
    } else {
      return;
    }
  };

  // handle form submission
  const handleSubmit = () => {
    if (
      form.email === '' ||
      form.password === '' ||
      form.repeatpassword === ''
    ) {
      setColor('red.400');
      setHeader('check information for completetion');
    } else if (form.password !== form.repeatpassword) {
      setColor('red.400');
      setHeader('passwords must match');
    } else if (!regex.test(form.password)) {
      setColor('red.400');
      setHeader(
        'password must be 8 characters and include a number no symbols'
      );
    } else {
      axios
        .put('https://razordispatchback.herokuapp.com/api/users', form)
        .then((response) => {
          if (response.status === 200) {
            presentLocalNotification();
            setIsLoading(true);
            setConfirmationHeader(response.data);
            setTimeout(() => {
              navigation.navigate('Login Account');
            }, 3000);
          } else {
            console.warn(response.error.message);
          }
        })
        .catch((err) => {
          err = err.response.data.message;
          setColor('red.400');
          console.log(err);
          setHeader(err);
        });
    }
  };
  if (!isLoading) {
    return (
      <Box bgColor='coolGray.900' flex={1}>
        <KeyboardAvoidingView
          h={{
            base: '550px',
            lg: 'auto',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Center flex={1}>
            <VStack flex='1' justifyContent='flex-end' w='100%' maxW='300'>
              <Heading mx='auto' mb='3' color='white'>
                Forgot Password!!
              </Heading>
              <Text color={color} textAlign='center' mb={2}>
                {' '}
                {header}
              </Text>

              <VStack space={1}>
                <Input
                  placeholder='Email Address'
                  value={form.email}
                  onChangeText={(value) =>
                    setForm({ ...form, email: value.toLowerCase() })
                  }
                  color='white'
                  size='lg'
                  variant='underlined'
                />
                <Input
                  placeholder='password'
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChangeText={(value) =>
                    setForm({ ...form, password: value })
                  }
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr='2'
                      color='amber.400'
                      onPress={() => setShow(!show)}
                    />
                  }
                  color='white'
                  size='lg'
                  variant='underlined'
                />
                <Input
                  placeholder='repeat password'
                  type={show2 ? 'text' : 'password'}
                  value={form.repeatpassword}
                  onChangeText={(value) =>
                    setForm({ ...form, repeatpassword: value })
                  }
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name={show2 ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr='2'
                      color='amber.400'
                      onPress={() => setShow2(!show2)}
                    />
                  }
                  color='white'
                  mb={2}
                  size='lg'
                  variant='underlined'
                />
              </VStack>
              <Button mt='4' onPress={() => handleSubmit()}>
                Proceed
              </Button>
              <Text color='green.400' textAlign='center'>
                {confirmationHeader}{' '}
              </Text>
            </VStack>
          </Center>
        </KeyboardAvoidingView>
      </Box>
    );
  } else {
    return (
      <LoadingScreen
        title={confirmationHeader}
        subtitle='Lets Get Back Rolling'
        color='green.500'
        mainbackground='coolGray.900'
      />
    );
  }
};

export default ResetPass;
