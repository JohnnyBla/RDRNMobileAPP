import React, { useState, useContext } from 'react';
import {
  Box,
  Heading,
  Input,
  VStack,
  Button,
  Text,
  Icon,
  View,
} from 'native-base';
import { useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
import { submitLoad } from '../../redux/loadInfoReducer';
import { AuthContext } from '../../context/auth-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { loads } from '../../redux/getDetails';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleApiKey } from '../../Variables/env';
import LoadingScreen from '../../shared/loadingScreen';
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Gradient = {
  linearGradient: {
    colors: ['green.100', 'blue.100'],
    start: [0, 0],
    end: [1, 0],
  },
};
const regx = /^\d+$/;

const SubmitLoads = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({
    Origin: '',
    Destination: '',
    PricePerMile: '',
    TotalMiles: '',
    TotalPrice: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const usermsg = auth.token;
  const userid = auth.userid;

  const userLoadsUrl = `https://razordispatchback.herokuapp.com/api/loads/user/${userid}`;

  const dispatch = useDispatch();

  const getLoad = async () => {
    try {
      await axios({
        method: 'GET',
        url: userLoadsUrl,
        headers: {
          Authorization: 'Bearer ' + usermsg,
          'Content-Type': 'application/json',
        },
      })
        .catch((error) => console.log(error))
        .then((response) => {
          if (response.status === 200) {
            const loadInfo = response.data;
            if (loadInfo) {
              dispatch(loads(loadInfo));
            } else {
              console.log('No information');
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      throw err;
    }
  };

  //handleSubmission
  const handleSubmit = () => {
    if (
      formData.Origin === '' ||
      regx.test(formData.Origin) ||
      formData.Destination === '' ||
      regx.test(formData.Destination) ||
      formData.TotalMiles === 0 ||
      formData.PricePerMile === 0
    ) {
      setFeedback('All fields are required');
    } else {
      setIsLoading(true);
      dispatch(submitLoad({ formData, token: auth.token }));
      setTimeout(() => {
        getLoad();
        setFormData({
          Origin: '',
          Destination: '',
          TotalMiles: '',
          PricePerMile: '',
        });
        setIsLoading(false);
        navigation.navigate('Load Reports');
      }, 3000);
    }
  };

  if (!isLoading) {
    return (
      <Box flex={1} bg={Gradient}>
        <Box
          bg='white'
          height={screenHeight - 220}
          width={screenWidth - 15}
          mt={5}
          p={3}
          borderRadius='md'
          shadow={5}
          alignSelf='center'
        >
          <VStack space={2}>
            <Heading
              textAlign='center'
              mt={3}
              color='green.300'
              textTransform='uppercase'
              shadow={1}
            >
              Submit Load
            </Heading>
            <Text textAlign='center' mt={3} color='red.700'>
              {feedback}
            </Text>
            <VStack space={5}>
              <View position='absolute' zIndex={5}>
                <Text fontWeight='bold'>Enter Origin</Text>
                <GooglePlacesAutocomplete
                  query={{
                    key: GoogleApiKey,
                    language: 'en', // language of the results
                  }}
                  fetchDetails={false}
                  styles={{
                    container: {
                      flex: 1,
                      marginBottom: 2,
                    },
                    textInputContainer: {
                      width: '100%',
                    },
                    textInput: {
                      backgroundColor: '#FFFFFF',
                      height: 40,
                      borderRadius: 5,
                      paddingVertical: 2,
                      paddingHorizontal: 8,
                      fontSize: 15,
                      flex: 1,
                    },
                  }}
                  onPress={(data) =>
                    setFormData({ ...formData, Origin: data.description })
                  }
                  textInputProps={{
                    InputComp: Input,
                    leftIcon: { type: 'font-awesome', name: 'chevron-left' },
                    errorStyle: { color: 'red' },
                    width: '100%',

                    variant: 'underlined',
                    onChangeText: (value) => {
                      setFormData({ ...formData, Origin: value });
                    },
                  }}
                />
              </View>

              <Box marginTop={12} paddingTop={2} zIndex={4}>
                <View position='absolute' paddingTop={2}>
                  <Text fontWeight='bold'>Enter Destination</Text>
                  <GooglePlacesAutocomplete
                    query={{
                      key: GoogleApiKey,
                      language: 'en', // language of the results
                    }}
                    fetchDetails={false}
                    styles={{
                      container: {
                        flex: 1,
                      },
                      textInputContainer: {
                        width: '100%',
                      },
                      textInput: {
                        backgroundColor: '#FFFFFF',
                        height: 40,
                        borderRadius: 5,
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        fontSize: 15,
                        flex: 1,
                      },
                    }}
                    onPress={(data) =>
                      setFormData({
                        ...formData,
                        Destination: data.description,
                      })
                    }
                    textInputProps={{
                      InputComp: Input,
                      leftIcon: { type: 'font-awesome', name: 'chevron-left' },
                      errorStyle: { color: 'red' },
                      width: '100%',
                      variant: 'underlined',
                      onChangeText: (value) => {
                        setFormData({ ...formData, Destination: value });
                      },
                    }}
                  />
                </View>
              </Box>

              <VStack marginTop={12} paddingTop={2}>
                <Text fontWeight='bold'>Enter Price Per Mile</Text>
                <Input
                  width='95%'
                  size='lg'
                  variant='underlined'
                  name='PricePerMile'
                  keyboardType='decimal-pad'
                  type='number'
                  value={formData.PricePerMile}
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name='currency-usd' />}
                      size={5}
                      color='green.400'
                    />
                  }
                  onChangeText={(value) =>
                    setFormData({ ...formData, PricePerMile: value })
                  }
                />
              </VStack>
              <VStack>
                <Text fontWeight='bold'>Enter Total Miles</Text>
                <Input
                  width='95%'
                  size='lg'
                  variant='underlined'
                  keyboardType='decimal-pad'
                  name='TotalMiles'
                  type='number'
                  value={formData.TotalMiles}
                  onChangeText={(value) =>
                    setFormData({ ...formData, TotalMiles: value })
                  }
                />
              </VStack>
              <VStack>
                <Text fontWeight='bold'>Total Price</Text>
                <Input
                  width='95%'
                  size='lg'
                  variant='underlined'
                  name='TotalPrice'
                  type='number'
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name='currency-usd' />}
                      size={5}
                      color='green.400'
                    />
                  }
                  value={
                    (formData.TotalPrice = parseFloat(
                      formData.TotalMiles * formData.PricePerMile
                    ).toFixed(2))
                  }
                  onChangeText={(value) =>
                    setFormData({ ...formData, TotalPrice: value })
                  }
                  isDisabled
                  _readOnly={true}
                />
              </VStack>
            </VStack>
            <Button
              variant='solid'
              onPress={() => handleSubmit()}
              _text={{
                fontSize: 'md',
              }}
              leftIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name='truck-delivery'
                  size='lg'
                />
              }
              colorScheme='green'
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  } else {
    return (
      <LoadingScreen
        title='Packing up Load'
        subtitle='one moment'
        color='green.400'
        mainbackground='transparent'
      />
    );
  }
};

export default SubmitLoads;
