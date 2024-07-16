import React, { useState, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { Spinner, Text, Box, Button, Checkbox, VStack, HStack } from "@chakra-ui/react";
import useMeteo from "../hooks/useMeteo";
import dayjs from "dayjs";
import "./Header.css";

const Graph = ({ latitude, longitude, isLoaded, currentStep }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const { averageYearData, loading, error } = useMeteo(latitude, longitude, currentStep);
  console.log("average year data", averageYearData);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month()); // Default to current month
  const [selectedVariables, setSelectedVariables] = useState([
    "soil_temperature_0_to_7cm",
    "relative_humidity_2m",
    "wind_speed_10m",
    "cloud_cover",
    "rain",
    "snowfall",
  ]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleVariableChange = (variable) => {
    setSelectedVariables((prev) => {
      if (prev.includes(variable)) {
        return prev.filter((v) => v !== variable);
      } else {
        return [...prev, variable];
      }
    });
  };

  const filteredData = useMemo(() => {
    if (!averageYearData || !isLoaded || loading) return [];

    const filtered = averageYearData.filter((point) =>
      dayjs().dayOfYear(point.dayOfYear).month() === selectedMonth
    );

    const dataSeries = selectedVariables.map((variable) => {
      return {
        label: variable.replace(/_/g, ' ').toUpperCase(),
        data: filtered.map((point) => ({
          primary: dayjs().dayOfYear(point.dayOfYear).hour(point.hour).toDate(),
          secondary: point.data[variable],
        })),
      };
    });

    return dataSeries;
  }, [averageYearData, isLoaded, loading, selectedMonth, selectedVariables]);

  const primaryAxis = useMemo<AxisOptions<typeof filteredData[number]["data"][number]>>(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
      scaleType: "time",
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<typeof filteredData[number]["data"][number]>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: "line",
      },
    ],
    []
  );

  if (!isLoaded || loading) return <Spinner />;
  if (error) return <Text>Error: {(error as any).message}</Text>;
  if (!filteredData.length) return <Text>No data available</Text>;

  return (
    <Box>
      <HStack spacing={2} className={isMobile ? 'mobile-scroll' : ''}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Button key={i} onClick={() => handleMonthChange(i)}>
            {dayjs().month(i).format("MMM")}
          </Button>
        ))}
      </HStack>
      <VStack align="start" spacing={2} mt={4}>
        <Checkbox
          isChecked={selectedVariables.includes("soil_temperature_0_to_7cm")}
          onChange={() => handleVariableChange("soil_temperature_0_to_7cm")}
        >
          Soil Temperature (0-7 cm) (°C)
        </Checkbox>
        <Checkbox
          isChecked={selectedVariables.includes("relative_humidity_2m")}
          onChange={() => handleVariableChange("relative_humidity_2m")}
        >
          Relative Humidity (2m) (%)
        </Checkbox>
        <Checkbox
          isChecked={selectedVariables.includes("wind_speed_10m")}
          onChange={() => handleVariableChange("wind_speed_10m")}
        >
          Wind Speed (10m) (m/s)
        </Checkbox>
        <Checkbox
          isChecked={selectedVariables.includes("cloud_cover")}
          onChange={() => handleVariableChange("cloud_cover")}
        >
          Cloud Cover (%)
        </Checkbox>
        <Checkbox
          isChecked={selectedVariables.includes("rain")}
          onChange={() => handleVariableChange("rain")}
        >
          Rain (mm)
        </Checkbox>
        <Checkbox
          isChecked={selectedVariables.includes("snowfall")}
          onChange={() => handleVariableChange("snowfall")}
        >
          Snowfall (cm)
        </Checkbox>
      </VStack>
      <Box height={500} mt={4}>
        <Chart
          height={500}
          options={{
            data: filteredData,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </Box>
    </Box>
  );
};

export default Graph;