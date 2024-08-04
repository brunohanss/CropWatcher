import React from 'react';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { SuccessRate } from './SuccessRate';

type MonthStatus = 'green' | 'yellow' | 'transparent';

interface YearPrevisionProps {
    monthsStatus: MonthStatus[];
}

const YearPrevision: React.FC<YearPrevisionProps> = ({ monthsStatus }) => {
    const cardSize = useBreakpointValue({ base: '50px', sm: '60px', md: '70px', lg: '80px' });

    const getCardColor = (status: MonthStatus) => {
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

    const getMonthName = (monthIndex: number) => {
        return dayjs().month(monthIndex).format('MMM');
    };

    return (
        <Flex justifyContent="center" flexWrap="wrap" width="100%" flexDirection="row">
            {monthsStatus.map((status, index) => (
                <SuccessRate status={status} index={index} period={getMonthName(index)}/>
            ))}
        </Flex>
    );
};

export default YearPrevision;
