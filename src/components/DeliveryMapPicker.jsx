import React, { useEffect, useRef, useState } from 'react';
import { DELIVERY_ZONES } from '../data/catalogData';
import { Search, MapPin, Navigation, CheckCircle2, ExternalLink, Layers } from 'lucide-react';

const HUB_COORDS = { lat: 48.4412, lng: 35.1580, name: 'Перевалка ТОВ «БЕНГС» (м. Дніпро, вул. Чаплинська, 1А)' };

const PRESET_LOCATIONS = [
  { name: 'Дніпро (Правий берег: Центр / Соборний)', lat: 48.4647, lng: 35.0462 },
  { name: 'Дніпро (Лівий берег: АНД / Індустріальний)', lat: 48.5080, lng: 35.0710 },
  { name: 'Підгородне / Слобожанське', lat: 48.5772, lng: 35.1075 },
  { name: 'смт Обухівка / Горянівське', lat: 48.5430, lng: 34.8690 },
  { name: 'Кам\'янське (Лівобережжя / Центр)', lat: 48.5173, lng: 34.6063 },
  { name: 'Новомосковськ / Піщанка', lat: 48.6369, lng: 35.2285 },
  { name: 'м. Синельникове', lat: 48.3512, lng: 35.5202 },
  { name: 'м. Павлоград', lat: 48.5262, lng: 35.8672 }
];

// Haversine formula to compute distance in km
const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

// Map coordinates and distance to DELIVERY_ZONES
const resolveZoneByCoords = (lat, lng, distKm) => {
  if (distKm <= 12) {
    if (lng < 35.05) {
      return DELIVERY_ZONES.find(z => z.id === 'dnipro_right') || DELIVERY_ZONES[0];
    } else {
      return DELIVERY_ZONES.find(z => z.id === 'dnipro_left') || DELIVERY_ZONES[1];
    }
  } else if (distKm <= 20) {
    if (lat > 48.55) {
      return DELIVERY_ZONES.find(z => z.id === 'pidhorodne_slobozhanske') || DELIVERY_ZONES[2];
    } else {
      return DELIVERY_ZONES.find(z => z.id === 'novomoskovsk') || DELIVERY_ZONES[4];
    }
  } else if (distKm <= 42) {
    if (lng < 34.85) {
      return DELIVERY_ZONES.find(z => z.id === 'kamianske') || DELIVERY_ZONES[3];
    } else {
      return DELIVERY_ZONES.find(z => z.id === 'novomoskovsk') || DELIVERY_ZONES[4];
    }
  } else if (distKm <= 65) {
    return DELIVERY_ZONES.find(z => z.id === 'pavlohrad_synelnykove') || DELIVERY_ZONES[5];
  } else {
    return DELIVERY_ZONES.find(z => z.id === 'oblast_far') || DELIVERY_ZONES[6];
  }
};

export const DeliveryMapPicker = ({ onSelectZone, selectedZone }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const lineRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeCoords, setActiveCoords] = useState({ lat: 48.4647, lng: 35.0462 });
  const [currentAddressName, setCurrentAddressName] = useState('м. Дніпро (Правий берег / Центр)');
  const [calculatedDistance, setCalculatedDistance] = useState(7.5);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' or 'satellite'

  // Load Leaflet library dynamically
  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = () => {
      if (window.L) {
        if (isMounted) setMapLoaded(true);
        return;
      }

      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => {
          if (isMounted) setMapLoaded(true);
        };
        document.head.appendChild(script);
      } else {
        const checkL = setInterval(() => {
          if (window.L) {
            clearInterval(checkL);
            if (isMounted) setMapLoaded(true);
          }
        }, 100);
      }
    };

    loadLeaflet();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update position and calculate zone & distance
  const updateLocation = (lat, lng, addressName = '') => {
    const dist = calculateDistanceKm(HUB_COORDS.lat, HUB_COORDS.lng, lat, lng);
    const matchedZone = resolveZoneByCoords(lat, lng, dist);

    setActiveCoords({ lat, lng });
    setCalculatedDistance(dist);
    const finalName = addressName || `Точка на карті (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    setCurrentAddressName(finalName);

    onSelectZone(matchedZone, {
      distanceKm: dist,
      addressName: finalName,
      lat,
      lng
    });

    if (mapInstanceRef.current && window.L) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([lat, lng]);
        userMarkerRef.current.getPopup().setContent(`
          <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
            <strong style="color: #15803d; font-size: 14px;">📍 Точка доставки:</strong><br/>
            <b>${finalName}</b><br/>
            <span style="color: #64748b;">Відстань від бази: <b>${dist} км</b></span>
          </div>
        `);
      }

      if (lineRef.current) {
        lineRef.current.setLatLngs([
          [HUB_COORDS.lat, HUB_COORDS.lng],
          [lat, lng]
        ]);
      }

      mapInstanceRef.current.panTo([lat, lng]);
    }
  };

  // Initialize Google Maps Tiles in Leaflet
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // Centered cleanly on Dnipro city & suburbs
    const map = L.map(mapContainerRef.current, {
      center: [48.485, 35.055],
      zoom: 12,
      zoomControl: true
    });
    mapInstanceRef.current = map;

    // GOOGLE MAPS TILE LAYER (Official Google Maps vector roadmap: lyrs=m)
    const googleRoadmapUrl = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    const tileLayer = L.tileLayer(googleRoadmapUrl, {
      maxZoom: 20,
      attribution: '&copy; Google Maps'
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Hub Marker (Green Warehouse)
    const hubIcon = L.divIcon({
      className: 'custom-hub-marker',
      html: `<div style="background: #15803d; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.35);">🏢</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const hubMarker = L.marker([HUB_COORDS.lat, HUB_COORDS.lng], { icon: hubIcon }).addTo(map);
    hubMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
        <strong style="color: #15803d; font-size: 14px;">🏢 ТОВ «БЕНГС» (Перевалка №1)</strong><br/>
        м. Дніпро, вул. Чаплинська, 1А<br/>
        <small style="color: #64748b;">Пункт відправки самоскидів 10–40 т</small>
      </div>
    `);

    // Customer Destination Marker (Red Google Pin)
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `<div style="background: #ef4444; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.35);">📍</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const initialLat = activeCoords.lat;
    const initialLng = activeCoords.lng;

    const userMarker = L.marker([initialLat, initialLng], {
      icon: userIcon,
      draggable: true
    }).addTo(map);

    userMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
        <strong style="color: #15803d;">📍 Точка доставки:</strong><br/>
        ${currentAddressName}<br/>
        <span style="color: #64748b;">Відстань від бази: <b>${calculatedDistance} км</b></span>
      </div>
    `);
    userMarkerRef.current = userMarker;

    userMarker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      updateLocation(pos.lat, pos.lng, `Обрана точка на Google Карті (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`);
    });

    map.on('click', (e) => {
      updateLocation(e.latlng.lat, e.latlng.lng, `Обрана точка на Google Карті`);
    });

    // Dashed green delivery polyline
    const line = L.polyline(
      [
        [HUB_COORDS.lat, HUB_COORDS.lng],
        [initialLat, initialLng]
      ],
      { color: '#22c55e', weight: 4, dashArray: '6, 8', opacity: 0.9 }
    ).addTo(map);
    lineRef.current = line;

    updateLocation(initialLat, initialLng, currentAddressName);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapLoaded]);

  // Switch between Google Roadmap and Google Satellite
  const toggleMapType = () => {
    if (!mapInstanceRef.current || !window.L || !tileLayerRef.current) return;
    const newType = mapType === 'roadmap' ? 'satellite' : 'roadmap';
    setMapType(newType);

    const L = window.L;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const newUrl = newType === 'satellite'
      ? 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' // Google Satellite Hybrid
      : 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'; // Google Vector Roadmap

    const newLayer = L.tileLayer(newUrl, {
      maxZoom: 20,
      attribution: '&copy; Google Maps'
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  };

  // Search Address Geocoding via Nominatim
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const fullQuery = searchQuery.includes('Дніпро') || searchQuery.includes('область')
        ? searchQuery
        : `Дніпро ${searchQuery}`;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}&countrycodes=ua&limit=1`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        updateLocation(lat, lng, item.display_name.split(',').slice(0, 3).join(','));
      } else {
        alert('Адресу не знайдено. Будь ласка, оберіть точку кліком на Google Карті або скористайтесь швидкими кнопками.');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&origin=${HUB_COORDS.lat},${HUB_COORDS.lng}&destination=${activeCoords.lat},${activeCoords.lng}`;

  return (
    <div className="delivery-map-picker-box">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="map-search-form">
        <div className="map-search-input-wrap">
          <Search size={18} className="map-search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Введіть адресу у Google Картах (напр.: вул. Робоча, Підгородне, Кам'янське)..."
            className="map-search-input"
          />
          <button type="submit" className="map-search-btn" disabled={isSearching}>
            {isSearching ? 'Пошук...' : 'Знайти на карті'}
          </button>
        </div>
      </form>

      {/* Quick Preset Buttons */}
      <div className="map-presets-bar">
        <div className="presets-header">
          <span className="presets-label">Швидкі райони Дніпра та області:</span>
          <button type="button" onClick={toggleMapType} className="map-type-toggle-btn">
            <Layers size={13} />
            <span>{mapType === 'roadmap' ? 'Google Супутник' : 'Google Схема'}</span>
          </button>
        </div>
        <div className="presets-chips">
          {PRESET_LOCATIONS.map((loc, idx) => (
            <button
              key={idx}
              type="button"
              className="preset-chip"
              onClick={() => updateLocation(loc.lat, loc.lng, loc.name)}
            >
              <Navigation size={12} />
              <span>{loc.name.split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Google Maps Container */}
      <div className="leaflet-map-wrapper">
        <div ref={mapContainerRef} className="leaflet-map-container" style={{ height: '340px', width: '100%' }} />
        {!mapLoaded && (
          <div className="map-loading-overlay">
            <span>Завантаження Google Карт Дніпра...</span>
          </div>
        )}
        <div className="google-watermark-badge">
          <span>Google Карти</span>
        </div>
      </div>

      {/* Result Badge */}
      <div className="map-calc-result-badge">
        <div className="mc-info-left">
          <CheckCircle2 size={22} className="text-green flex-shrink-0" />
          <div>
            <div className="mc-address">{currentAddressName}</div>
            <div className="mc-details">
              Відстань від бази: <strong>{calculatedDistance} км</strong> • Зона: <strong className="text-green">{selectedZone.name.split('(')[0]}</strong>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div className="mc-rate-badge">
            від {selectedZone.baseRate} грн/т
          </div>
          <a
            href={googleMapsRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-route-link"
            title="Переглянути маршрут у додатку Google Maps"
          >
            <span>Маршрут в Google Maps</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
};
