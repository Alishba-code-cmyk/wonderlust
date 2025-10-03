if (typeof coordinates !== "undefined" && coordinates.length === 2) {
  const [lng, lat] = coordinates;  // GeoJSON format: [longitude, latitude]

  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([lat, lng]).addTo(map)
    .bindPopup(listinglocation)
    .openPopup();
} else {
  console.warn("No coordinates found for this listing.");
}
