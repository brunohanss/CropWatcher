import { Box, Collapse, Spinner } from "@chakra-ui/react";
import { useLocation } from '../hooks/useLocation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Location from '../components/Location';
import StepperComponent from "../components/Stepper";
import { useState } from "react";
import useMeteo from "../hooks/useMeteo";
import Graph from "../components/Graph";

const Home = () => {
  const [currentStep, setStep] = useState<number>(0);
  const { location, setLocation, city, country, address1, address2, loading } = useLocation();
  const { isLoaded, loadingMeteo } = useMeteo((location as any)?.[0] , (location as any)?.[1], currentStep);
  console.log("currentLocation", location)
  

  return (
    <Box minH="100vh">
      <Header />
      <StepperComponent step={currentStep}></StepperComponent>
      <Collapse in={currentStep === 0} animateOpacity>
        <Location setLocation={setLocation} location={location} city={city} country={country} loading={loading} address1={address1} address2={address2} setStep={setStep}/>
      </Collapse>
      <Collapse in={currentStep === 1  && !isLoaded && !loadingMeteo} animateOpacity>
        <Spinner ></Spinner>
      </Collapse> 
      <Collapse in={currentStep === 1 && isLoaded} animateOpacity>
        <Graph latitude={(location as any)?.[0]} longitude={(location as any)?.[1]} isLoaded={isLoaded} currentStep={currentStep}></Graph>
      </Collapse><Footer />
    </Box>
  );
};

export default Home;
