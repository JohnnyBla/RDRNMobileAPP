import React, { useState, useCallback, useContext, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import {
  Box,
  ScrollView,
  VStack,
  Icon,
  Text,
  Button,
  HStack,
  Link,
  IconButton,
} from 'native-base';
import Purchases from 'react-native-purchases';
import LoadReports from '../loadReports';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/auth-context';
import axios from 'axios';

const LoadsGenerator = ({ navigation }) => {
  const TotalLoads = useSelector((state) => state.details.totalLoads);

  const Gradient = {
    linearGradient: {
      colors: ['green.100', 'blue.100'],
      start: [0, 0],
      end: [1, 0],
    },
  };
  const auth = useContext(AuthContext);
  const [loads, setLoads] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const usermsg = auth.token;
  const userid = auth.userid;

  const userLoadsUrl = `https://razordispatchback.herokuapp.com/api/loads/user/${userid}`;

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getLoad();
    wait(1500).then(() => setRefreshing(false));
  }, []);
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
              setLoads(loadInfo);
            } else {
              console.log('No information');
            }
          }
        })
        .catch((err) => {
          setLoads([]);
          console.log(err);
        });
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getLoad();
  }, [TotalLoads]);

  if (loads.length >= 1) {
    return (
      <Box flex={1} bg={Gradient}>
        <ScrollView
          flex={1}
          p={1}
          pt={4}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loads.map((load) => {
            return <LoadReports key={load._id} {...load} nav={navigation} />;
          })}
          <Box mt={5}>
            <VStack space={1} alignItems='center'>
              <Text textAlign='center' color='muted.400'>
                Drag Down to Refresh
              </Text>
              <Icon
                as={MaterialCommunityIcons}
                size='6'
                name='chevron-double-down'
                _dark={{
                  color: 'warmGray.50',
                }}
                color='muted.400'
              />
            </VStack>
          </Box>
        </ScrollView>
      </Box>
    );
  } else {
    return (
      <Box flex={1} justifyContent='center' bg={Gradient}>
        <Box>
          <Button variant='ghost' isLoading size='lg'>
            Button
          </Button>
          <HStack alignSelf='center'>
            <Link
              alignSelf='center'
              onPress={() => {
                navigation.navigate('Submit Load');
              }}
              _text={{ color: 'blue.400' }}
            >
              Submit Loads To get Started
            </Link>
            <IconButton
              alignSelf='center'
              variant='unstyled'
              _focus={{
                borderWidth: 0,
              }}
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name='plus'
                  size='6'
                  color='green.600'
                />
              }
              onPress={() => {
                navigation.navigate('Submit Load');
              }}
            />
          </HStack>
        </Box>
      </Box>
    );
  }
};

export default LoadsGenerator;
