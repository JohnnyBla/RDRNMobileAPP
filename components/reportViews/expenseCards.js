import React, { useState, useContext } from 'react';
import {
  Box,
  Text,
  Stack,
  Heading,
  Button,
  Icon,
  Alert,
  VStack,
  HStack,
  Collapse,
  IconButton,
} from 'native-base';
import { Dimensions } from 'react-native';
import { AuthContext } from '../../context/auth-context';
import { removeSingleExpense } from '../../redux/loadInfoReducer';
import { deleteExpenses } from '../../redux/getDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoadingScreen from '../../shared/loadingScreen';

import { useSelector, useDispatch } from 'react-redux';

const ExpenseCard = ({ navigation }) => {
  const Info = useSelector((state) => state.passLoad.expenses);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const screen = Dimensions.get('window').width;
  const Gradient = {
    linearGradient: {
      colors: ['red.100', 'blue.100'],
      start: [0, 0],
      end: [1, 0],
    },
  };

  //handle expense removal
  const deleteHandler = () => {
    dispatch(removeSingleExpense({ eid: Info._id, key: auth.token }));
    dispatch(deleteExpenses(Info._id));
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate('Expense Reports');
    }, 3000);
  };
  const ExpenseInfo = () => {
    if (Info && !isLoading) {
      return (
        <Box
          w={screen - 20}
          rounded='md'
          overflow='hidden'
          borderColor='coolGray.900'
          borderWidth='1'
          shadow={5}
          mt={5}
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'coolGray.100',
          }}
        >
          <Stack p='4' space={3}>
            <Stack space={2}>
              <Heading size='md' ml='-1' italic>
                Fuel Price:
              </Heading>
              <Text
                fontSize='lg'
                _light={{
                  color: 'black',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight='500'
                ml='-0.5'
                mt='-1'
              >
                ${parseFloat(Info.fuelPrice).toFixed(2)}
              </Text>
            </Stack>
            <Stack space={2}>
              <Heading size='md' ml='-1' italic>
                Room and Board:
              </Heading>
              <Text
                fontSize='md'
                _light={{
                  color: 'black',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight='500'
                ml='-0.5'
                mt='-1'
              >
                ${parseFloat(Info.RoomAndBoard).toFixed(2)}
              </Text>
            </Stack>
            <Stack space={2}>
              <Heading size='md' ml='-1' italic>
                Repairs:
              </Heading>
              <Text
                fontSize='md'
                _light={{
                  color: 'black',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight='500'
                ml='-0.5'
                mt='-1'
              >
                ${parseFloat(Info.Repairs).toFixed(2)}
              </Text>
            </Stack>
            <Stack space={2}>
              <Heading size='md' ml='-1' italic>
                Miscellaneous:
              </Heading>
              <Text
                fontSize='md'
                _light={{
                  color: 'black',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight='500'
                ml='-0.5'
                mt='-1'
              >
                ${parseFloat(Info.Misc).toFixed(2)}
              </Text>
            </Stack>
            <Stack space={2}>
              <Button
                onPress={() => setShow(true)}
                colorScheme='danger'
                leftIcon={
                  <Icon
                    name='delete'
                    as={MaterialCommunityIcons}
                    color='white'
                    size='6'
                  />
                }
              >
                <Text fontSize='md' color='amber.300'>
                  Delete
                </Text>
              </Button>
              <Collapse isOpen={show} alignItems='center'>
                <Alert w='90%' maxW='400' status='error'>
                  <VStack space={1} w='100%'>
                    <HStack
                      space={2}
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Alert.Icon />
                      <Text
                        alignSelf='center'
                        fontSize='md'
                        fontWeight='medium'
                        _dark={{
                          color: 'coolGray.800',
                        }}
                      >
                        Are You sure You want to Delete!
                      </Text>
                    </HStack>

                    <Box
                      _dark={{
                        _text: {
                          color: 'coolGray.600',
                        },
                      }}
                    >
                      <HStack justifyContent='space-around'>
                        <HStack>
                          <IconButton
                            variant='unstyled'
                            _focus={{
                              borderWidth: 0,
                            }}
                            icon={
                              <Icon
                                as={MaterialCommunityIcons}
                                name='check'
                                size='6'
                                color='green.600'
                              />
                            }
                            onPress={() => deleteHandler()}
                          />
                          <Text alignSelf='center'>Yes</Text>
                        </HStack>
                        <HStack>
                          <IconButton
                            variant='unstyled'
                            _focus={{
                              borderWidth: 0,
                            }}
                            icon={
                              <Icon
                                as={MaterialCommunityIcons}
                                name='close'
                                size='6'
                                color='red.600'
                              />
                            }
                            onPress={() => setShow(false)}
                          />
                          <Text alignSelf='center'>No</Text>
                        </HStack>
                      </HStack>
                    </Box>
                  </VStack>
                </Alert>
              </Collapse>
            </Stack>
          </Stack>
        </Box>
      );
    } else {
      return (
        <LoadingScreen
          title='Rotating Tires'
          subtitle='one moment please'
          color='red.500'
          mainBackground='transparent'
        />
      );
    }
  };

  return (
    <Box flex={1} p={3} bg={Gradient}>
      <ExpenseInfo />
    </Box>
  );
};

export default ExpenseCard;
