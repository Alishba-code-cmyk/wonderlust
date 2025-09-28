
// Use Nominatim to get coordinates
fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listingLocation)}`)
  .then(res => res.json())
  .then(data => {
    if (data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log(`Coordinates: Latitude=${lat}, Longitude=${lon}`);

      // Initialize Leaflet map
      const map = L.map('map').setView([lat, lon], 13);

      // Add OSM tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Add marker at listing location
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(listingLocation)
        .openPopup();
    } else {
      console.log("Location not found!");
    }
  })
  .catch(err => console.error("Error fetching location:", err));
