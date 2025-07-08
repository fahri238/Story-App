import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LocationHelper = {
  init({ containerId, onLocationSelect }) {
    const banjarmasinCoords = [-3.3179, 114.5905];
    const map = L.map(containerId).setView(banjarmasinCoords, 13);
    let marker = null;

    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    const jawgMatrix = L.tileLayer(
      "https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}",
      {
        attribution:
          '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 22,
        accessToken:
          "dEVkwXjnF8UVrJx9Cafx2z6311VKaLf4EYZl6gYL7MbninURPp6SPRDeEatohFUR",
      }
    );

    osm.addTo(map);

    const baseMaps = {
      "Mode Terang": osm,
      "Mode Gelap": jawgMatrix,
    };

    L.control.layers(baseMaps).addTo(map);

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: '<i class="fas fa-map-marker-alt fa-2x" style="color: #415a77;"></i>', // Menggunakan warna primer dari tema
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      if (typeof onLocationSelect === "function") {
        onLocationSelect({ lat, lon: lng });
      }

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng, { icon: customIcon }).addTo(map);
      }
      marker
        .bindPopup(`Lokasi dipilih: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
        .openPopup();
    });

    return map;
  },
};

export default LocationHelper;
