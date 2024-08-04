import { Box, Text, Stack } from '@chakra-ui/react';

const Title = () => {
  return (
    <Box
        width="100%"
      py={{ base: 10, md: 20 }}
      px={{ base: 5, md: 10 }}
      textAlign="center"
       bg="#09090D"
    //    position="absolute"
    >
      <Stack spacing={5} align="center">
        <Text
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="bold"
          lineHeight="shorter"
          fontFamily="Quicksand"
           color='#D9D9D9'
        >
          Discover the Perfect Time to Grow
        </Text>
        <Text
          fontSize={{ base: '1xl', md: '2xl' }}
          fontWeight="medium"
          maxWidth="600px"
          textAlign="center"
          fontFamily="Quicksand"
           color='#D9D9D9'
        >
           Historic and Real-Time Weather
        </Text>
        <Text
          fontSize={{ base: '1xl', md: '2xl' }}
          fontWeight="medium"
          maxWidth="600px"
          textAlign="center"
          fontFamily="Quicksand"
           color='#D9D9D9'
        >
           Based on your location
        </Text>
      </Stack>
    </Box>
  );
};

export default Title;