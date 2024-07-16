import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayOfYear);

const HISTORICAL_MONTH_LENGTH = 120;

const useMeteo = (latitude: number, longitude: number, currentStep: number) => {
  console.log("current step in use meteo", currentStep) 
  const [meteoData, setMeteoData] = useState([] as any[]);
  const [averageYearData, setAverageYearData] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMeteoData = async () => {
    try {
      setLoading(true);
      const endDate = dayjs();
      const startDate = endDate.subtract(HISTORICAL_MONTH_LENGTH, 'months');
      const monthlyData: any[] = [];
      const yearsPerRequest = 4;

      for (let i = 0; i < HISTORICAL_MONTH_LENGTH / 12; i += yearsPerRequest) {
        const periodStart = startDate.add(i * 12, 'months').startOf('month');
        const periodEnd = periodStart.add(yearsPerRequest * 12 - 1, 'months').endOf('month');
        const today = dayjs();
         // Ensure the periodEnd does not go beyond today
         const adjustedPeriodEnd = periodEnd.isAfter(today) ? today : periodEnd;
        console.log("Requesting from ", periodStart.format('YYYY-MM-DD'), " to ", periodEnd.format('YYYY-MM-DD'));

        const response = await fetch(
          `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${periodStart.format('YYYY-MM-DD')}&end_date=${adjustedPeriodEnd.format('YYYY-MM-DD')}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,rain,snowfall,cloud_cover,wind_speed_10m,wind_speed_100m,soil_temperature_0_to_7cm,soil_temperature_7_to_28cm,soil_moisture_0_to_7cm,soil_moisture_7_to_28cm,is_day,sunshine_duration`
        );
        const data = await response.json();

        if (data.hourly) {
          Object.keys(data.hourly).forEach(key => {
            data.hourly[key].forEach((value: any, index: any) => {
              if (!monthlyData[index]) {
                monthlyData[index] = {};
              }
              if (!monthlyData[index][key]) {
                monthlyData[index][key] = [];
              }
              monthlyData[index][key].push(value);
            });
          });
        }
      }

      setMeteoData(monthlyData);
      console.log(monthlyData.length, "entries found");
      setLoading(false);
      setIsLoaded(true);
    } catch (err) {
      console.error(err);
      setError(err as any);
      setLoading(false);
      setIsLoaded(false);
    }
  };

  const calculateFictionalYear = () => {
    if (!meteoData.length) return;

    const hourlyData: { [key: string]: any } = {};

    meteoData.forEach((monthData: any) => {
      monthData.time.forEach((time: any, index: any) => {
        const hour = dayjs(time).hour();
        const dayOfYear = dayjs(time).dayOfYear();

        if (!hourlyData[dayOfYear]) {
          hourlyData[dayOfYear] = {};
        }

        if (!hourlyData[dayOfYear][hour]) {
          hourlyData[dayOfYear][hour] = {
            temperature_2m: [],
            relative_humidity_2m: [],
            dew_point_2m: [],
            apparent_temperature: [],
            rain: [],
            snowfall: [],
            cloud_cover: [],
            wind_speed_10m: [],
            wind_speed_100m: [],
            soil_temperature_0_to_7cm: [],
            soil_temperature_7_to_28cm: [],
            soil_moisture_0_to_7cm: [],
            soil_moisture_7_to_28cm: [],
            is_day: [],
            sunshine_duration: [],
          };
        }

        Object.keys(hourlyData[dayOfYear][hour]).forEach(key => {
          hourlyData[dayOfYear][hour][key].push(monthData[key][index]);
        });
      });
    });

    const fictionalYear: any[] = [];

    Object.keys(hourlyData).forEach(dayOfYear => {
      Object.keys(hourlyData[dayOfYear]).forEach(hour => {
        const averagedData: { [key: string]: any } = {};

        Object.keys(hourlyData[dayOfYear][hour]).forEach(key => {
          const values = hourlyData[dayOfYear][hour][key];
          averagedData[key] = values.reduce((sum: any, value: any) => sum + value, 0) / values.length;
        });

        fictionalYear.push({
          dayOfYear: parseInt(dayOfYear),
          hour: parseInt(hour),
          data: averagedData,
        });
      });
    });

    console.log(fictionalYear);
    setAverageYearData(fictionalYear);
  };

  useEffect(() => {
    if (latitude && longitude && currentStep >= 1) {
      fetchMeteoData();
    }
  }, [latitude, longitude,currentStep]);

  useEffect(() => {
    console.timeLog("isLoaded", isLoaded)
    if (isLoaded) {
      calculateFictionalYear();
    }
  }, [isLoaded, meteoData, currentStep]);

  return { meteoData, averageYearData, loading, error, isLoaded };
};

export default useMeteo;