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
      iconAnchor: [12, 24], // Anchor at bottom center for tree icons
      popupAnchor: [0, -24]
    });
  };

  // Parks data
  const parks = [
    { name: "Rocky Mountain NP", coords: [40.3428, -105.6836], desc: "Majestic mountain vistas and alpine lakes" },
    { name: "Zion NP", coords: [37.2982, -113.0263], desc: "Stunning sandstone cliffs and narrow canyons" },
    { name: "Yellowstone", coords: [44.4280, -110.5885], desc: "World's first national park with geysers and wildlife" },
    { name: "Grand Teton", coords: [43.7904, -110.6818], desc: "Dramatic mountain peaks rising above Jackson Hole" },
    { name: "Olympic NP", coords: [47.8021, -123.6044], desc: "Temperate rainforests and rugged Pacific coastline" },
    { name: "Crater Lake NP", coords: [42.8684, -122.1685], desc: "Deepest lake in the U.S. formed in a volcanic caldera" },
    { name: "Redwood NP", coords: [41.2132, -124.0046], desc: "Home to the tallest trees on Earth" },
    { name: "Yosemite NP", coords: [37.8651, -119.5383], desc: "Iconic granite cliffs, waterfalls, and giant sequoias" },
    { name: "Pinnacles NP", coords: [36.4906, -121.1836], desc: "Remnants of an ancient volcanic field" },
    { name: "Kings Canyon NP", coords: [36.8879, -118.5551], desc: "Deep canyon carved by glaciers" },
    { name: "Sequoia NP", coords: [36.4864, -118.5658], desc: "Home to the massive General Sherman Tree" },
    { name: "Death Valley NP", coords: [36.5323, -116.9325], desc: "Hottest, driest, and lowest national park" },
    { name: "Saguaro NP", coords: [32.1479, -110.7887], desc: "Iconic giant cacti of the Sonoran Desert" },
    { name: "Bryce Canyon NP", coords: [37.5930, -112.1871], desc: "Hoodoos (irregular rock columns) in amphitheaters" },
    { name: "Canyonlands NP", coords: [38.3269, -109.8783], desc: "Vast wilderness of canyons and buttes" },
    { name: "Arches NP", coords: [38.7331, -109.5925], desc: "Over 2,000 natural sandstone arches" },
    { name: "Great Sand Dunes NP", coords: [37.7916, -105.5942], desc: "Tallest sand dunes in North America" },
    { name: "Badlands NP", coords: [43.8554, -102.3397], desc: "Striking geologic formations and fossil beds" },
    { name: "Indiana Dunes NP", coords: [41.6379, -87.0965], desc: "Lake Michigan shoreline with biodiverse dunes" },
    { name: "Great Smoky Mountains NP", coords: [35.6118, -83.5495], desc: "Ancient mountains with diverse plant and animal life" },
    { name: "Congaree NP", coords: [33.7930, -80.7817], desc: "Largest intact expanse of old growth bottomland hardwood forest" }
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
