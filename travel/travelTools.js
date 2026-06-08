// Weather tool
export async function getWeather({ city }) {
    console.log(`Getting weather for ${city}`);

    const data = {
        Goa: {
            temperature: 30,
            condition: "Sunny"
        },
        Bangalore: {
            temperature: 26,
            condition: "Pleasant"
        }
    }

    return data[city] || {
        temperature: "Unknown",
        condition: "Unknown"
    };
}

// hotel price tool
export async function getHotelPrice( { city }) {
    console.log(`Getting hotel price for ${city}`)

    const data = {
        Goa: {
            perNight: 4500
        },
        Bangalore: {
            perNight: 3000
        }
    }

    return data[city] || {
        perNight: "Unknown"
    };
}

// flight price tool
export async function getFlightPrice({ city }) {
    console.log(`Getting flight price for ${city}`);

    const data = {
        Goa: {
            roundTrip: 9000
        },
        Bangalore: {
            roundTrip: 3000
        }
    }

    return data[city] || {
        roundTrip: "Unknown"
    };
}

// get crowd level
export async function getCrowdLevel( {city} ) {
    const data = {
        Goa: {
            crowd: "High"
        },
        Bangalore: {
            crowd: "Low"
        }
    }
    return data[city] || {
        roundTrip: "Unknown"
    };
}

export async function getTravelTime({ city }) {
    const data = {
        Goa: {
            hours: 2
        },
        Bangalore: {
            hours: 1
        }
    };

    return data[city] || {
        roundTrip: "Unknown"
    };
}

