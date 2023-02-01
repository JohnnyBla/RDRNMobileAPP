import { Text, VStack } from 'native-base';
import LottieView from 'lottie-react-native';
import React from 'react';

const LoadingScreen = (props) => {
  return (
    <VStack flex={1} alignItems='center' space={2} bg={props.mainbackground}>
      <Text
        marginTop={12}
        fontWeight='bold'
        color={props.color}
        textTransform='uppercase'
      >
        {props.title}
      </Text>
      <Text fontWeight='bold' color={props.color} textTransform='uppercase'>
        {props.subtitle}
      </Text>
      <LottieView
        autoPlay
        loop
        source={require('../assets/25925-fast-delivery')}
      />
    </VStack>
  );
};

export default LoadingScreen;
