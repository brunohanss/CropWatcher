import { LatLngExpression } from 'leaflet';
import { useState, useEffect, useRef } from 'react';

function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}



export const useLocation = () => {
    const [location, setLocationPrivate] = useState<LatLngExpression | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const [address1, setAddress1] = useState<string | null>(null);
    const [address2, setAddress2] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [newLocation, setNewLocation] = useState<boolean | null>(false);
    const timeoutRef = useRef<number | null>(null);

    const setLocation = (location: LatLngExpression | null) => {
        setNewLocation(true);
        setLocationPrivate(location);
        console.log(location);
    };
    const getPlaceFromCoordinates = async (lat: number, lng: number) => {
        try {
            const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${import.meta.env.VITE_LOCATION_SECRET_KEY}`)
            const providedLocation = await response.json();
            console.log("get location", providedLocation?.features?.[0]?.properties);
            return providedLocation;
        } catch (error) {
            console.error(error);
        }
    }

    const getLocationFromAPI = async () => {
        try {
            console.log("key", import.meta.env.VITE_IP_LOCATION_SECRET_KEY, import.meta.env.VITE_LOCATION_SECRET_KEY)
            setLoading(true);
            const ipResponse = await fetch(`https://freeipapi.com/api/json`, { method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Origin': 'no-origin',
                'Referer': 'no-referrer'
            }});
            const ip = (await ipResponse.json())?.ipAddress;
            
            const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IP_LOCATION_SECRET_KEY}&ip=${ip ? ip : ''}`);
            const data = await response.json();
            await wait(1000);
            setCountry(data?.country_name ?? '');
            setCity(data?.city ?? '');
            setLocation([data.latitude, data.longitude]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(null);
            setLocation(null);
        }
    };

    const getPlaceInfo = async (lat: number, lng: number) => {
        try {
            const location = await getPlaceFromCoordinates(lat, lng);
            setCountry(location?.features[0]?.properties?.country ?? '');
            setCity(location?.features[0]?.properties?.city ?? '');
            setAddress1(location?.features[0]?.properties?.address_line1 ?? '');
            setAddress2(location?.features[0]?.properties?.address_line2 ?? '');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getLocationFromAPI();
    }, []);

    useEffect(() => {
        if (location && newLocation) {
            setNewLocation(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => {
                const [lat, lng] = location as [number, number];
                getPlaceInfo(lat, lng);
            }, 3000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [location]);

    return { location, setLocation, city, country, address1, address2, loading };
};