// Sample data
var sampleData = [
    { Name: "John Doe", Age: 30, City: "New York" },
    { Name: "Jane Smith", Age: 25, City: "Los Angeles" },
    { Name: "Bob Johnson", Age: 35, City: "Chicago" }
];

// Create Excel file
var ws = XLSX.utils.json_to_sheet(sampleData);
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

// Generate string content
var excelString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

// Convert string to blob
var excelBlob = new Blob([s2ab(excelString)], { type: 'application/octet-stream' });

// Helper function to convert string to array buffer
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

// Add event listener for download button
var downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', function () {
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(excelBlob);
    downloadLink.download = 'sample_excel_file.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});
