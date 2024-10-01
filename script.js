// script.js

// Function to replace periods with hyphens in the input indicator
// Event listener for form submission
document.getElementById('indicatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const indicatorInput = document.getElementById('indicatorInput').value;

    fetch(`metadata/${indicatorInput}_metadata.json`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Unexpected response status: ' + response.status);
            }
        })
        .then(data => {
            const contentElement = document.getElementById('content');
            contentElement.innerHTML = `
                <h2>World Bank Indicator: ${data.indicator}</h2>
				<h3><p>Description: ${data.description}</p></h3>
                <p>Metadata: ${data.metadata}</p>
                <p>URL: <a href="${data.url}" target="_blank">Visit ${data.url} @ World Bank</a></p>
                <p><a href="#" id="downloadLink">Download CSV Data</a></p>
				<p><a href="#" id="downloadLink2">Download XML Data</a></p>
            `;

            const downloadLink = document.getElementById('downloadLink');
            downloadLink.addEventListener('click', function() {
                const dataDownload = `https://api.worldbank.org/v2/en/indicator/${indicatorInput}?downloadformat=csv`;
                window.open(dataDownload);
            });
			const downloadLink2 = document.getElementById('downloadLink2');
            downloadLink2.addEventListener('click', function() {
                const dataDownload = `https://api.worldbank.org/v2/en/indicator/${indicatorInput}?downloadformat=xml`;
                window.open(dataDownload);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});