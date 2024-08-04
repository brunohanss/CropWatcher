import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Box, Flex, Text } from "@chakra-ui/react";
import dayjs from 'dayjs';

type SuccessRateProps = {
  index: number;
  status: Status;
  period: string;
};
type Status = 'green' | 'yellow' | 'transparent';


export const SuccessRate: React.FC<SuccessRateProps> = ({ index, status, period }) => {

  const getCardColor = (status: Status) => {
    switch (status) {
      case 'green':
        return '#D7F205';
      case 'yellow':
        return '#F2E205';
      case 'transparent':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  return (
    <Flex
      key={index}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="#262626"
      rounded="md"
      shadow="md"
      display="flex"
      width="5vw"
      minWidth="25px"
      height="50px"
      margin="1px"
    >
      {status !== 'transparent' && <Box height="60%" width="100%" bg={getCardColor(status)} borderTopRadius={10}> </Box>}
      {status === 'transparent' && <Box height="60%" width="100%" sx={{
        backgroundImage: `repeating-linear-gradient(
            45deg,
            black,
            black 3px,
            transparent 3px,
            transparent 6px
          )`,
      }} borderTopRadius={10}> </Box>}
      <Box height="40%" width="100%" ><Text color="#5C6373" fontSize={12} fontWeight={"600"}>
        {period}
      </Text></Box>

    </Flex>
  );

};

export default Map;


