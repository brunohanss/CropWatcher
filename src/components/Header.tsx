import { Flex, Text } from "@chakra-ui/react";
import ThemeSelector from "./ThemeSelector";
import "./Header.css";
import { ThreeDScene } from "./AnimatedRabbit";
import AnimatedTitle from "./AnimatedTitle";

const Header = () => (
  <Flex className="header-container" justifyContent="space-between" alignItems="center" p={4} flexDirection={"column"} marginBottom={{ base: '500px', md: '325px' }}>
  <Flex justifyContent="space-between" alignItems="center" p={4} width={"100%"}>
  <img src="/crop-watcher-logo.png" className="responsive-logo" width={250} height={250} alt="CropWatcher logo" />
  <Text fontSize="x2" fontWeight="bold" as="span" className="logo-text" marginTop={-25}>
        <span className="span-logo-text">C</span>
        <span className="span-logo-text">R</span>
        <span className="span-logo-text">O</span>
        <span className="span-logo-text">P</span>
        <span className="span-logo-text"></span>
        <span className="span-logo-text">W</span>
        <span className="span-logo-text">A</span>
        <span className="span-logo-text">T</span>
        <span className="span-logo-text">C</span>
        <span className="span-logo-text">H</span>
        <span className="span-logo-text">E</span>
        <span className="span-logo-text">R</span>
      </Text>
    <ThemeSelector />
  </Flex>
  {/* <Credits></Credits> */}
  {/* <ThreeDScene></ThreeDScene> */}
  <AnimatedTitle></AnimatedTitle>
  </Flex>
);

export default Header;