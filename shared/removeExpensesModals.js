import React, { useState, useContext } from 'react';
import {
  HStack,
  Text,
  Button,
  IconButton,
  Icon,
  Popover,
  Spinner,
  Heading,
  Box,
} from 'native-base';
import { removeAllExpenses } from '../redux/loadInfoReducer';
import { deleteAllExpenses } from '../redux/getDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/auth-context';
import { useDispatch } from 'react-redux';

const RemoveExpenses = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handleDelete
  const handleDelete = () => {
    setIsLoading(true),
      dispatch(removeAllExpenses({ id: auth.userid, key: auth.token }));
    setTimeout(() => {
      dispatch(deleteAllExpenses());
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
              bg='violet.500'
              colorScheme='violet'
              borderRadius='full'
              onPress={() => setIsOpen(true)}
              shadow={5}
              icon={
                <HStack>
                  <Icon
                    as={MaterialCommunityIcons}
                    size='6'
                    name='minus'
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color='warmGray.50'
                  />
                  <Text alignSelf='center' mx='2'>
                    Remove All Expenses
                  </Text>
                </HStack>
              }
            />
          );
        }}
      >
        <Popover.Content w='95%' borderRadius='xl' shadow={3}>
          <Popover.Arrow bgColor='violet.500' />
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
              <Text color='violet.500' fontWeight='bold'>
                all Expenses
              </Text>{' '}
              information{' '}
            </Text>
          </Popover.Body>
          <Popover.Footer>
            <Button.Group space={2}>
              <Button
                shadow={2}
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme='violet'
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

export default RemoveExpenses;
