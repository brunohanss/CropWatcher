import { Box, Text } from "@chakra-ui/react";

const ThemeSelector = () => {

  return (
    <Box as="header" pb={{ base: 0, lg: 0 }} bg="#09090D">
    <Text
            margin="20px"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            lineHeight="shorter"
            fontFamily="Quicksand"
            color='#D9D9D9'
        >
            Personalized Recommendations
        </Text>
        <Text
            margin="10px"
            fontSize={{ base: '1xl', md: '2xl' }}
            fontWeight="medium"
            textAlign="center"
            fontFamily="Quicksand"
            color='#D9D9D9'
        >
            Access it now
        </Text>
  </Box>
  );
};

export default ThemeSelector;

