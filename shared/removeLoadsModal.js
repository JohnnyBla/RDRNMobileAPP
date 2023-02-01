import React, { useState, useContext } from 'react';
import {
  HStack,
  Text,
  Icon,
  IconButton,
  Button,
  Spinner,
  Heading,
  Box,
} from 'native-base';
import { removeAllLoads } from '../redux/loadInfoReducer';
import { deleteAllLoads } from '../redux/getDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AuthContext } from '../context/auth-context';
import { Popover } from 'native-base';
import { useDispatch } from 'react-redux';

const RemoveLoads = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handleDelete
  const handleDelete = () => {
    setIsLoading(true),
      dispatch(removeAllLoads({ id: auth.userid, key: auth.token }));
    dispatch(deleteAllLoads());
    setTimeout(() => {
      setIsOpen(false);
      setIsLoading(false);
    }, 2500);
  };

  if (!isLoading) {
    return (
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement='top'
        trigger={(triggerProps) => {
          return (
            <IconButton
              {...triggerProps}
              mb='4'
              variant='solid'
              bg='yellow.400'
              colorScheme='yellow'
              borderRadius='full'
              onPress={() => setIsOpen(true)}
              shadow={5}
              icon={
                <HStack>
                  <Icon
                    as={MaterialCommunityIcons}
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    size='6'
                    name='minus'
                    color='warmGray.50'
                  />
                  <Text alignSelf='center' mx='2'>
                    Remove All Loads
                  </Text>
                </HStack>
              }
            />
          );
        }}
      >
        <Popover.Content w='95%' borderRadius='xl' shadow={3}>
          <Popover.Arrow bgColor='yellow.400' />
          <Popover.CloseButton onPress={() => setIsOpen(false)} />
          <Popover.Header
            _text={{
              color: 'red.600',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            !!!~Important~!!!
          </Popover.Header>
          <Popover.Body>
            <Text
              textTransform='uppercase'
              textAlign='center'
              fontWeight='medium'
            >
              Completeting this action will delete{' '}
              <Text color='yellow.400' fontWeight='bold'>
                all Loads
              </Text>{' '}
              information{' '}
            </Text>
          </Popover.Body>
          <Popover.Footer>
            <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                shadow={2}
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme='yellow'
                shadow={2}
                onPress={() => handleDelete()}
              >
                Delete
              </Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    );
  } else {
    return (
      <Box marginTop={3} marginBottom={5}>
        <HStack space={2} justifyContent='center'>
          <Spinner accessibilityLabel='Loading posts' />
          <Heading color='primary.500' fontSize='md'>
            Erasing Data
          </Heading>
        </HStack>
      </Box>
    );
  }
};

export default RemoveLoads;
