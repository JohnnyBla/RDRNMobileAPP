import React, { useEffect, useState, useContext } from 'react';
import { Alert, Platform, View, Dimensions } from 'react-native';
import { Box, Text, Heading, Button, Image } from 'native-base';
import { AuthContext } from '../context/auth-context';
import LoadingScreen from '../shared/loadingScreen';
import Purchases from 'react-native-purchases';

const SignedInPaywall = ({ navigation }) => {
  const [packages, setPackages] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const auth = useContext(AuthContext);
  const screen = Dimensions.get('window').width;

  useEffect(() => {
    const getOfferings = async () => {
      Purchases.isConfigured().then(async (response) => {
        if (response === true) {
          const offerings = await Purchases.getOfferings()
            .then((response) => {
              setPackages(response.current);
            })
            .catch((e) => console.log(e));
        } else {
          return;
        }
      });
    };
    getOfferings();
  }, []);

  const Subscribe = async (value) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(value);

      if (typeof customerInfo.entitlements.active.Pro !== 'undefined') {
        setIsLoading(true);
        setTimeout(() => {
          auth.logout();
        }, 2500);
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.log(e.message);
      }
    }
  };
  if (!isLoading) {
    return (
      <Box background='black' flex={1}>
        <Heading color='gray.200' textAlign='center' mt='4'>
          Try RazorDispatch {'\n'}Free for 7 Days
        </Heading>
        <Text color='gray.300' p={2} textAlign='center' mt='2'>
          Unlimited Data Exports, Organize Your Information In one App. Keep
          track of Loads and Expenses. Constantly Evolving Application. Cancel
          Anytime.
        </Text>

        {!packages ? (
          <Button variant='ghost' size='lg' colorScheme='dark' isLoading />
        ) : (
          packages.availablePackages.map((value) => {
            return (
              <Box
                key={value.product.priceString}
                bgColor='black'
                flex={1}
                borderWidth='2'
                borderColor='white'
                alignItems='center'
                padding={5}
                margin={5}
                maxHeight='1/4'
              >
                <Text color='gray.200' fontSize='lg' mt={2}>
                  {value.product.priceString}/Month after trail ends.
                </Text>
                <Text color='gray.200' mt={1}>
                  Subscribe now to get started
                </Text>
                <Button
                  width='100%'
                  onPress={() => Subscribe(value)}
                  mt='auto'
                  colorScheme='dark'
                  _text={{
                    color: 'black',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  ReSubscribe
                </Button>
              </Box>
            );
          })
        )}

        <Heading color='gray.200' textAlign='center' mt='4'>
          Revolutionizing The Way {'\n'} We Get It Done
        </Heading>
        <Image
          source={require('../assets/SimplifiedLong.png')}
          alt='logo'
          marginTop={Platform.OS === 'ios' ? 9 : 10}
          style={{ width: screen - 50, height: 125 }}
        />
      </Box>
    );
  } else {
    return (
      <LoadingScreen
        title='Redirecting to the Login Page'
        subtitle='one moment please'
        color='yellow.700'
        mainbackground='coolGray.800'
      />
    );
  }
};

export default SignedInPaywall;
