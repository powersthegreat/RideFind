import {
  Flex,
  Spacer,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import seeRides from '../assets/seeRides.png';

const SeeAvailableRides = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

  return (
    <Flex
      width="full"
      minHeight="70vh"
      alignItems="center"
      px={isLargerThanLG ? '16' : '6'}
      py="16"
      justifyContent="space-between"
      flexDirection={isLargerThanLG ? 'row' : 'column'}
    >
      <Flex
        w={isLargerThanLG ? '40%' : 'full'}
        mb={isLargerThanLG ? '0' : '6'}
        alignItems="center"
        justifyContent="center"
      >
        <Image src={seeRides} alt="Chakra Team" w="full" />
      </Flex>
      <Spacer />
      <Flex
        w={isLargerThanLG ? '60%' : 'full'}
        flexDirection="column"
        ml={isLargerThanLG ? '7' : '0'}
      >
        <Text fontSize={isLargerThanLG ? '5xl' : '4xl'} fontWeight="bold">
          See Available Rides
        </Text>

        <Text mb="6" fontSize={isLargerThanLG ? 'lg' : 'base'} opacity={0.7}>
          RideFind will display up to 50 available rides<br></br>
          By default, rides are sorted by cost<br></br>
          Click the arrow on the right of each card to see more details
        </Text>
      </Flex>
    </Flex>
  );
};

export default SeeAvailableRides;