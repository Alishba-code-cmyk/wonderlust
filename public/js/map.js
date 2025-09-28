
  // Fetch coordinates from Nominatim
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listinglocation)}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        console.log(`Coordinates for ${listinglocation}: Latitude=${lat}, Longitude=${lon}`);

        // Example: show on a simple map using Leaflet.js
        const map = L.map('map').setView([lat, lon], 13); // 'map' is your div id
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([lat, lon]).addTo(map)
          .bindPopup(listinglocation)
          .openPopup();
      } else {
        console.log("Location not found!");
      }
    })
    .catch(error => console.error("Error fetching coordinates:", error));

