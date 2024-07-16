import { Card, Stack, CardBody, CardFooter, Heading, Text, Button, Box } from "@chakra-ui/react";
import React from "react";
import Map from './Map'; // Ensure correct import path
import { LatLngExpression } from "leaflet";

type LocationProps = {
  setLocation: any;
  location: LatLngExpression | null;
  city: string | null;
  country: string | null;
  address1: string | null;
  address2: string | null;
  loading: boolean | null;
  setStep: (int: number) => void;
};

const Location: React.FC<LocationProps> = ({ setLocation, location, city, country,address1,address2, loading, setStep }) => {
  return loading ? (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      width={'80vw'}
      margin="auto"
      marginBottom={5}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={{ base: '100%', sm: '200px' }}
        height="100%"
        // bg="gray.200"
      >
        <svg width="150" height="150" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#000">
          <g fill="none" fillRule="evenodd" strokeWidth="2">
            <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                begin="0s" dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                begin="0s" dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite" />
            </circle>
            <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                begin="-0.9s" dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                begin="-0.9s" dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </Box>
      <Stack>
        <CardBody>
        <Heading size="md">Locating you...</Heading>
          <Text py="2">
            We are trying to locate you. By knowing your location, we can tailor recommendations and alerts specifically for you.
          </Text>
        </CardBody>
      </Stack>
    </Card>
  ) : (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      width={'80vw'}
      margin="auto"
      marginBottom={5}
    >
      <Map setPosition={setLocation} position={location} />
      <Stack width={'100%'}>
        <CardBody>
          <Heading size="md">Using your detected position :</Heading>
          <Text py="2">{address1}</Text>
          <Text py="2">{address2}</Text>
        </CardBody>
        <CardFooter>
          <Button variant="solid" colorScheme="blue" margin="auto" onClick={() => {setStep(1)}}>
            Use this position
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default Location;
