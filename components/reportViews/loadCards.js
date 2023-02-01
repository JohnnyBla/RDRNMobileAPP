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
import { AuthContext } from '../../context/auth-context';
import { removeSingleLoad } from '../../redux/loadInfoReducer';
import { deleteLoads } from '../../redux/getDetails';
import { Dimensions } from 'react-native';
import LoadingScreen from '../../shared/loadingScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';

const LoadCard = ({ navigation }) => {
  const Info = useSelector((state) => state.passLoad.loads);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const screen = Dimensions.get('window').width;
  const Gradient = {
    linearGradient: {
      colors: ['green.100', 'white'],
      start: [0, 0],
      end: [1, 0],
    },
  };

  //Handle Load Removal
  const deleteHandler = () => {
    dispatch(removeSingleLoad({ lid: Info._id, key: auth.token }));
    dispatch(deleteLoads(Info._id));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Load Reports');
    }, 3000);
  };
  const LoadInfo = () => {
    if (Info && !isLoading) {
      return (
        <Box
          w={screen - 20}
          rounded='md'
          overflow='hidden'
          borderColor='coolGray.900'
          borderWidth='1'
          shadow={5}
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
                Origin:
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
                {Info.Origin}
              </Text>
            </Stack>
            <Stack space={2}>
              <Heading size='md' ml='-1' italic>
                Destination:
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
                {Info.Destination}
              </Text>
            </Stack>
            <Stack space={2}>
              <Heading size='md' ml='-1' italic>
                Total Miles:
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
                {Info.TotalMiles}
              </Text>
            </Stack>
            <Stack space={2}>
              <Heading size='md' ml='-1' italic>
                Price Per Mile:
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
                ${parseFloat(Info.PricePerMile).toFixed(2)}
              </Text>
            </Stack>
            <Stack space={2}>
              <Heading size='md' ml='-1' italic>
                Total Price:
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
                ${parseFloat(Info.TotalPrice).toFixed(2)}
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
                <Text fontSize='md' fontWeight='bold' color='amber.300'>
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
                            onPress={() => {
                              deleteHandler();
                            }}
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
          title='Unpacking Load'
          subtitle='one moment please'
          color='green.500'
          mainBackground='transparent'
        />
      );
    }
  };

  return (
    <Box flex={1} p={3} bg={Gradient}>
      <LoadInfo />
    </Box>
  );
};

export default LoadCard;
