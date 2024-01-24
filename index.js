const axios = require("axios");
// bring in dotenv
require("dotenv").config();

// Your Google Places API key
const apiKey = process.env.api;

// Function to fetch details of multiple businesses based on location
async function getBusinessesByLocation(
  latitude,
  longitude,
  radius = 500,
  keyword = ""
) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${apiKey}`
    );

    if (response.data.status === "OK") {
      return response.data.results;
    } else {
      throw new Error("Error fetching businesses");
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

// Example usage: Provide latitude and longitude of the location
const latitude = 41; // Replace with the latitude of the location
const longitude = -75.642221; // Replace with the longitude of the location
const radius = 60000; // Radius in meters (default: 500 meters)
const keyword = "allergist"; // Optional keyword to filter results

getBusinessesByLocation(latitude, longitude, radius, keyword)
  .then((businesses) => {
    if (businesses) {
      console.log("Businesses:", businesses);
      // Handle businesses details here
    } else {
      console.log("Unable to fetch businesses");
    }
  })
  .catch((err) => console.error("Error:", err));
