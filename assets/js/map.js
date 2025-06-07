document.addEventListener('DOMContentLoaded', function() {
  // Create map with better initial view
  const map = L.map('parks-map', {
    center: [39.8283, -98.5795],
    zoom: 4,
    zoomControl: false,
    preferCanvas: true
  });

  // Add only satellite tile layer
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
  }).addTo(map);
  
  // Add custom zoom control
  L.control.zoom({
    position: 'topright'
  }).addTo(map);
  
  // Add scale control
  L.control.scale({
    position: 'bottomleft',
    imperial: true,
    metric: false
  }).addTo(map);

  // Custom tree icon
  const getParkIcon = () => {
    return L.divIcon({
      html: '<i class="fas fa-tree" style="color:#27ae60; font-size:24px;"></i>',
      className: 'park-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24]
    });
  };

  // Parks data
  const parks = [
    { name: "Rocky Mountain NP", coords: [40.3428, -105.6836], desc: "Majestic mountain vistas and alpine lakes" },
    // ... other parks data
  ];

  // Add markers with tree icons and enhanced popups
  parks.forEach(park => {
    L.marker(park.coords, { 
      icon: getParkIcon(),
      riseOnHover: true
    })
    .addTo(map)
    .bindPopup(`
      <div class="park-popup">
        <h3>${park.name}</h3>
        <p>${park.desc}</p>
        <small>Coordinates: ${park.coords[0].toFixed(4)}, ${park.coords[1].toFixed(4)}</small>
        <div class="popup-links">
          <a href="https://www.nps.gov/${park.name.split(' ')[0].toLowerCase()}/index.htm" target="_blank">Official Site</a>
          <a href="https://www.google.com/search?q=${encodeURIComponent(park.name)}" target="_blank">Search</a>
        </div>
      </div>
    `);
  });
});
