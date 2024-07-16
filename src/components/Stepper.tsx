import { useEffect } from 'react';
import { Box, Card, CardBody, Step, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps } from "@chakra-ui/react";
import "./Header.css";
const StepperComponent = ({ step }: { step: number }) => {
    const steps = [
        { title: 'Location', description: '' },
        { title: 'Meteo', description: '' },
        { title: 'Results', description: '' },
    ];

    const { activeStep, setActiveStep } = useSteps({
        index: step,
        count: steps.length,
    });

    useEffect(() => {
        setActiveStep(step);
    }, [step, setActiveStep]);

    return (
        <Card  size={"sm"} maxWidth={"80vw"} margin={"auto"}  marginBottom={10}>
        {/* <CardHeader>
          <Heading size='md'> Prepare your data </Heading>
        </CardHeader> */}
        <CardBody>
        <Stepper className="diag-stepper" index={activeStep} width={"78vw"} margin="auto">
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator  maxWidth={"6vw"}>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0' maxWidth={"15vw"}>
                        <StepTitle>{step.title}</StepTitle>
                        {/* <StepDescription>{step.description}</StepDescription> */}
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
        </CardBody>
      </Card>
        
    );
};

export default StepperComponent;