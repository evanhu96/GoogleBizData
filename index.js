// bring in dotenv

// Your Google Places API key

// Function to fetch details of multiple businesses based on location
async function getBusinessesByLocation(
  latitude,
  longitude,
  radius = 500,
  keyword = ""
) {
  try {
    const response = await fetch(
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

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
  getBusinessesByLocation(latitude, longitude, radius, keyword)
    .then((businesses) => {
      if (businesses) {
        console.log("Businesses:", businesses);
        // Handle businesses details here// Create Excel file
        var ws = XLSX.utils.json_to_sheet(sampleData);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate string content
        var excelString = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

        // Convert string to blob
        var excelBlob = new Blob([s2ab(excelString)], {
          type: "application/octet-stream",
        });

        // Helper function to convert string to array buffer
        function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
          return buf;
        }

        // Add event listener for download button
        var downloadBtn = document.getElementById("downloadBtn");

        downloadBtn.addEventListener("click", function () {
          var downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(excelBlob);
          downloadLink.download = "sample_excel_file.xlsx";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        });
      } else {
        console.log("Unable to fetch businesses");
      }
    })
    .catch((err) => console.error("Error:", err));
});
