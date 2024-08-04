import { Box, Flex, Link, Button, IconButton, Image, Heading, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Divider } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import logo from '../assets/logo.png';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header" pb={{ base: 0, lg: 0 }} bg="#09090D">
      <Box maxW="7xl" mx="5px" px="8px">
        <Flex as="nav" align="center" display="flex" justify="space-between" h="80px" width="100vw">
          <Box marginTop={{ base: 0, lg: 0 }}>
            <Link href="/" title="" display="flex" flexDirection="row">
              <Image
                w="auto"
                margin="auto"
                h={{ base: 20, lg: 20 }}
                src={logo}
                alt="Rocketux Logo"
              />
              <Heading margin="auto" fontSize="40" fontFamily="Quicksand" fontWeight="medium" marginLeft={1} marginTop="25px" color='#D9D9D9'>Rocketux</Heading>
            </Link>
          </Box>
          <Box marginRight="25px">
            <IconButton
              height="60px" width="60px"
              colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" borderColor="#D9D9D9" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}
              display={{ base: 'block', lg: 'none' }}
              icon={isOpen ? <CloseIcon  height="30px" width="30px"/> : <HamburgerIcon  height="30px" width="30px"/>}
              onClick={onOpen}
              aria-label="Toggle menu"
            />

            <Flex
              display={{ base: 'none', lg: 'flex' }}
              justifyContent="space-around"
              width="50vw"
            >
              <Button as={Link} href="/instances" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                Guides
              </Button>
              <Button as={Link} href="/instances" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                Plants
              </Button>
              <Button as={Link} href="/modules" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                Features
              </Button>
              <Button as={Link} href="/docs" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                Pricing
              </Button>
              <Button as={Link} href="/signin" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" borderColor="#D9D9D9" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                Sign in
              </Button>
            </Flex>
          </Box>
        </Flex>

        {isOpen && (
          <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent  bg="#09090D">
              <DrawerHeader borderBottomWidth='1px'>
                <Box display="flex" justifyContent="space-between">
                  <Link href="/" title="" display="flex" flexDirection="row">
                    <Image
                      w="auto"
                      margin="auto"
                      h={{ base: 20, lg: 20 }}
                      src={logo}
                      alt="Rocketux Logo"
                    />
                    <Heading margin="auto" fontSize="40" fontFamily="Quicksand" fontWeight="medium" marginLeft={1} marginTop="25px" color='#D9D9D9'>Rocketux</Heading>
                  </Link>
                  <IconButton
              height="60px" width="60px"
              colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" borderColor="#D9D9D9" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}
              icon={isOpen ? <CloseIcon  height="30px" width="30px"/> : <HamburgerIcon  height="30px" width="30px"/>}
              onClick={isOpen ? onClose : onOpen}
              aria-label="Toggle menu"
            />
                </Box>
              </DrawerHeader>
              <DrawerBody>
                <Box px={6}>
                  <Button as={Link} href="/modules" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                    Guides
                  </Button>
                  <Button as={Link} href="/modules" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                    Plants
                  </Button>
                  <Button as={Link} href="/docs" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                    Features
                  </Button>
                  <Button as={Link} href="/pricing" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                    Pricing
                  </Button>
                  <Button as={Link} href="/signin" colorScheme='white' color="#D9D9D9" variant='ghost' fontSize="base" fontWeight="medium" fontFamily="Quicksand" borderRadius="25px" borderColor="#D9D9D9" _hover={{ backgroundColor: 'white', color: '#09090D', borderColor: "transparent", borderRadius: "25px" }}>
                    Sign in
                  </Button>
                  
                </Box>
              </DrawerBody>
              <Divider/>
            </DrawerContent>
          </Drawer>
        )}
      </Box>
    </Box>
  );
};

export default Header;
