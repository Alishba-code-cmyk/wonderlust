if (typeof listinglocation !== "undefined" && listinglocation.trim() !== "") {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listinglocation)}`, {
    headers: {
      "User-Agent": "wanderlust-app/1.0 (your-email@example.com)" // required by Nominatim
    }
  })
    .then(async response => {
      if (!response.ok) {
        // If the response isn’t JSON (likely HTML error page), log it
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const map = L.map("map").setView([lat, lon], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
          .bindPopup(listinglocation)
          .openPopup();
      }
    })
    .catch(error => console.error("Error fetching coordinates:", error));
}
