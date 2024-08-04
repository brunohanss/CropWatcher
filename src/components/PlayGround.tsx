import { Box, Button, Flex, HStack, Select, Text, useMediaQuery } from "@chakra-ui/react";
import YearPrevision from "./Previsions";
import { useEffect, useState } from "react";
const capitals = [
    "Washington, D.C.", // USA
    "London", // United Kingdom
    "Berlin", // Germany
    "Paris", // France
    "Rome", // Italy
    "Madrid", // Spain
    "Brasília", // Brazil
    "Buenos Aires", // Argentina
    "Lima", // Peru
    "Stockholm" // Chile
];

const vegetableFruit = [
    "Tomato",
    "Orange",
    "Banana",
    "Carrots",
    "Lettuce",

]

const Playground = () => {


    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [selectedCapital, setSelectedCapital] = useState('');
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");


    useEffect(() => {
        setIsSmallScreen(isSmallerThan600);
    }, [isSmallerThan600]);

    return <Box px="10vw" bg="#09090D">
        <Text
            margin="20px"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            lineHeight="shorter"
            fontFamily="Quicksand"
            color='#D9D9D9'
        >
            Try it out
        </Text>
        <Text
            margin="10px"
            fontSize={{ base: '1xl', md: '2xl' }}
            fontWeight="medium"
            textAlign="center"
            fontFamily="Quicksand"
            color='#D9D9D9'
        >
            Pick a city
        </Text>

        {isSmallScreen ? (
            <Select
                placeholder="Select capital"
                value={selectedCapital}
                onChange={(e) => setSelectedCapital(e.target.value)}
            >
                {capitals.map((capital, index) => (
                    <option key={index} value={capital}>{capital}</option>
                ))}
            </Select>
        ) : (
            <Flex
                marginTop="10px"
                justifyContent="space-between"
                flexWrap="wrap"
            >
                {capitals.map((capital, index) => (
                    <Button
                        key={index}
                        minWidth="fit-content"
                        colorScheme='white'
                        color={selectedCapital === capital ? "#09090D" : "#D9D9D9"}
                        variant='ghost'
                        fontSize="base"
                        fontWeight="medium"
                        fontFamily="Quicksand"
                        borderRadius="25px"
                        borderColor={selectedCapital === capital ? "transparent" : "white"}
                        backgroundColor={selectedCapital === capital ? "white" : "none"}
                        _hover={{
                            backgroundColor: 'white',
                            color: '#09090D',
                            borderColor: "transparent"
                        }}
                        onClick={() => setSelectedCapital(capital)}
                    >
                        {capital}
                    </Button>
                ))}
            </Flex>
        )}
        {vegetableFruit.map((item) => <Flex justifyContent="space-between"
            margin="5px">
            <Text
                fontSize={{ base: '1xl', md: '2xl' }}
                fontWeight="medium"
                textAlign="center"
                fontFamily="Quicksand"
                color='#D9D9D9'
                flex="1"
            >
                {item}
            </Text>
            <Box
                flex="8" display="flex" flexDirection="row">
                <YearPrevision monthsStatus={[
                    'green', 'yellow', 'transparent', 'green', 'green', 'green',
                    'green', 'green', 'transparent', 'green', 'yellow', 'transparent'
                ]} /></Box>
        </Flex>)}
    </Box>
};

export default Playground;




