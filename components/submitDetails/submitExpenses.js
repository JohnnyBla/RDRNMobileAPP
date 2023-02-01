import React, { useState, useContext } from 'react';
import { Box, Heading, Input, VStack, Button, Text, Icon } from 'native-base';
import { useDispatch } from 'react-redux';
import { expenses } from '../../redux/getDetails';
import { Dimensions } from 'react-native';
import { AuthContext } from '../../context/auth-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoadingScreen from '../../shared/loadingScreen';
import { submitExpense } from '../../redux/loadInfoReducer';
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Gradient = {
  linearGradient: {
    colors: ['red.100', 'blue.100'],
    start: [0, 0],
    end: [1, 0],
  },
};

const SubmitExpenses = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fuelPrice: 0,
    Repairs: 0,
    RoomAndBoard: 0,
    Misc: 0,
  });
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const usermsg = auth.token;
  const userid = auth.userid;

  const dispatch = useDispatch();

  const userExpensesUrl = `https://razordispatchback.herokuapp.com/api/expenses/user/${userid}`;

  const getExpenses = async () => {
    try {
      await axios({
        method: 'GET',
        url: userExpensesUrl,
        headers: {
          Authorization: 'Bearer ' + usermsg,
          'Content-Type': 'application/json',
        },
      })
        .catch((error) => console.log(error))
        .then((response) => {
          if (response.status === 200) {
            const expenseInfo = response.data;
            if (expenseInfo) {
              dispatch(expenses(expenseInfo));
            } else {
              console.log('No information');
            }
          } else {
            console.log(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //handleSubmission
  const handleSubmit = () => {
    if (
      formData.Misc === '' &&
      formData.Repairs === '' &&
      formData.RoomAndBoard === '' &&
      formData.fuelPrice === ''
    ) {
      setFeedback('At least one value must be entered');
    } else {
      setIsLoading(true);
      dispatch(submitExpense({ formData, token: auth.token }));
      setTimeout(() => {
        getExpenses();
        setFormData({ fuelPrice: '', Repairs: '', RoomAndBoard: '', Misc: '' });
        setIsLoading(false);
        navigation.navigate('Expense Reports');
      }, 2000);
    }
  };

  if (!isLoading) {
    return (
      <Box flex={1} bg={Gradient}>
        <Box
          bg='white'
          height={screenHeight - 220}
          width={screenWidth - 15}
          mt={8}
          p={3}
          borderRadius='md'
          shadow={5}
          alignSelf='center'
        >
          <VStack space={3}>
            <Heading
              shadow={1}
              textTransform='uppercase'
              textAlign='center'
              mt={3}
              color='red.300'
            >
              Submit Expense
            </Heading>
            <Text textAlign='center' mt={3} color='red.700'>
              {feedback}
            </Text>
            <VStack space={5} alignItems='center'>
              <VStack>
                <Text fontWeight='bold'>Enter Fuel Price</Text>
                <Input
                  width='95%'
                  size='lg'
                  variant='underlined'
                  type='number'
                  name='fuelPrice'
                  value={formData.fuelPrice}
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name='currency-usd' />}
                      size={5}
                      color='red.400'
                    />
                  }
                  keyboardType='decimal-pad'
                  onChangeText={(value) =>
                    setFormData({ ...formData, fuelPrice: value })
                  }
                />
              </VStack>
              <VStack>
                <Text fontWeight='bold'>Enter Repairs Price</Text>
                <Input
                  width='95%'
                  size='lg'
                  type='number'
                  name='Repairs'
                  variant='underlined'
                  value={formData.Repairs}
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name='currency-usd' />}
                      size={5}
                      color='red.400'
                    />
                  }
                  keyboardType='decimal-pad'
                  onChangeText={(value) =>
                    setFormData({ ...formData, Repairs: value })
                  }
                />
              </VStack>
              <VStack>
                <Text fontWeight='bold'>Enter Room and Board Price</Text>
                <Input
                  width='95%'
                  size='lg'
                  variant='underlined'
                  type='number'
                  name='Room And Board'
                  keyboardType='decimal-pad'
                  value={formData.RoomAndBoard}
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name='currency-usd' />}
                      size={5}
                      color='red.400'
                    />
                  }
                  onChangeText={(value) =>
                    setFormData({ ...formData, RoomAndBoard: value })
                  }
                />
              </VStack>
              <VStack>
                <Text fontWeight='bold'>Enter Miscellaneous</Text>
                <Input
                  width='95%'
                  size='lg'
                  variant='underlined'
                  type='number'
                  name='Misc'
                  keyboardType='decimal-pad'
                  value={formData.Misc}
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name='currency-usd' />}
                      size={5}
                      color='red.400'
                    />
                  }
                  onChangeText={(value) =>
                    setFormData({ ...formData, Misc: value })
                  }
                />
              </VStack>
              <VStack>
                <Text fontWeight='bold'>Total Expense Price</Text>
                <Input
                  width='95%'
                  size='lg'
                  variant='underlined'
                  type='number'
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name='currency-usd' />}
                      size={5}
                      color='red.400'
                    />
                  }
                  isDisabled
                  _readOnly={true}
                  value={parseFloat(
                    parseFloat(formData.Misc) +
                      parseFloat(formData.Repairs) +
                      parseFloat(formData.RoomAndBoard) +
                      parseFloat(formData.fuelPrice)
                  ).toFixed(2)}
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
                  name='gas-station'
                  size='lg'
                />
              }
              colorScheme='red'
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
        title='Filling up Tank'
        subtitle='one moment'
        color='red.500'
        mainbackground='transparent'
      />
    );
  }
};

export default SubmitExpenses;
