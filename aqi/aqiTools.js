export async function getAirQuality({ city }) {
    console.log(`Fetching AQI for ${city}`);

    const data = {
        Delhi: {
            aqi: 250,
            quality: "Very Poor"
        },
        Bangalore: {
            aqi: 45,
            quality: "Good"
        },
        Mumbai: {
            aqi: 90,
            quality: "Moderate"
        }
    };

    return data[city];
}

