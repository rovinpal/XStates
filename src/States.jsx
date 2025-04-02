import React, { useState, useEffect } from "react";

const State = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(
                    "https://crio-location-selector.onrender.com/countries"
                );
                if(!response.ok){
                    throw new Error("Failed to fetch Country Data!");
                } 
                const data = await response.json();
                setCountries(data);
            }
            catch (error){
                console.error(`Error fetching data: ${error.message}`);
            };
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchStates = async () => {
            if(selectedCountry) {
                try {
                    const response = await fetch(
                        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
                    );
                    if(!response.ok){
                        throw new Error("Failed to fetch State Data!");
                    } 
                    const data = await response.json();
                    setStates(data);
                }
                catch (error){
                    console.error(`Error fetching data: ${error.message}`);
                };
            } else {
                setStates([]);
                setCities([]);
            }
        };

        fetchStates();
    }, [selectedCountry]);

    useEffect(() => {
        const fetchCities = async () => {
            if(selectedState) {
                try {
                    const response = await fetch(
                        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
                    );
                    if(!response.ok){
                        throw new Error("Failed to fetch City Data!");
                    } 
                    const data = await response.json();
                    setCities(data);
                }
                catch (error){
                    console.error(`Error fetching data: ${error.message}`);
                };
            } else {
                setCities([]);
            }
        };

        fetchCities();
    }, [selectedState, selectedCountry]);


    return (
        <div style={{textAlign: "center", padding: "20px"}}>
            <h1>Select Location</h1>
            <div
                style={{
                    display: "flex", 
                    justifyContent: "center", 
                    gap: "20px",
                    marginBottom: "20px"
                }}
            >
                <select 
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    value={selectedCountry}
                    style={{
                        padding: "20px",
                        fontSize: "16px"
                    }}
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                <select 
                    onChange={(e) => setSelectedState(e.target.value)}
                    value={selectedState}
                    disabled={!selectedCountry}
                    style={{
                        padding: "20px",
                        fontSize: "16px"
                    }}
                >
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                <select 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    value={selectedCity}
                    disabled={!selectedState}
                    style={{
                        padding: "20px",
                        fontSize: "16px"
                    }}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            {selectedCity && (
                <div
                    style={{
                        marginTop: "20px",
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        gap: "10px"
                    }}
                >
                    <span style={{ fontWeight: "bold", alignSelf: "flex-end"}}>You selected</span>
                    <span style={{ fontSize: "24px", fontWeight: "bold", alignSelf: "flex-end"}}>{selectedCity},</span>
                    <span style={{ color: "gray", alignSelf: "flex-end"}}>{selectedState},</span>
                    <span style={{ color: "gray", alignSelf: "flex-end"}}>{selectedCountry}</span>
                </div>
            )}
        </div>
    );
};


export default State;