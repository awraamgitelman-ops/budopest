import React, { useEffect, useRef, useState } from 'react';
import { DELIVERY_ZONES } from '../data/catalogData';
import { Search, MapPin, Navigation, CheckCircle2, ExternalLink, Layers, Building2 } from 'lucide-react';

export const BENGS_HUBS = [
  {
    id: 'auto',
    name: '⚡ Автовибір найближчої бази/кар\'єра (Найдешевша доставка)',
    shortName: 'Найближча база відвантаження',
    lat: 48.4890,
    lng: 34.9850,
    isAuto: true
  },
  {
    id: 'liubymivka',
    name: '🪨 Любимівський гранітний кар\'єр (Південний напрямок)',
    shortName: 'Любимівський кар\'єр',
    lat: 48.3750,
    lng: 35.1850,
    address: 'с. Любимівка (пряме відвантаження самоскидів 10-40т)'
  },
  {
    id: 'naberezhna',
    name: '🏗️ Термінал «Набережна Заводська» (Правий берег)',
    shortName: 'Термінал Набережна Заводська',
    lat: 48.4890,
    lng: 34.9850,
    address: 'м. Дніпро, вул. Набережна Заводська (автоваги 80т)'
  },
  {
    id: 'kamianske',
    name: '🚚 Кам\'янський перевальний термінал',
    shortName: 'Кам\'янський термінал',
    lat: 48.5173,
    lng: 34.6063,
    address: 'м. Кам\'янське (західний склад)'
  },
  {
    id: 'journalists',
    name: '🏢 Головний офіс ТОВ «БЕНГС» (вул. Журналістів, 3)',
    shortName: 'Головний офіс (вул. Журналістів, 3)',
    lat: 48.5135,
    lng: 35.0850,
    address: 'м. Дніпро, вул. Журналістів, 3 (бухгалтерія та відділ продажів)'
  }
];

const REAL_HUBS = BENGS_HUBS.filter(h => !h.isAuto);

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

// Find closest hub among REAL_HUBS for given target lat, lng
const getClosestHub = (targetLat, targetLng) => {
  let minDistance = Infinity;
  let closest = REAL_HUBS[0];

  REAL_HUBS.forEach(hub => {
    const dist = calculateDistanceKm(hub.lat, hub.lng, targetLat, targetLng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = hub;
    }
  });

  return { hub: closest, distance: minDistance };
};

export const DeliveryMapPicker = ({ onSelectZone, selectedZone }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const lineRef = useRef(null);
  const tileLayerRef = useRef(null);
  const hubMarkersRef = useRef([]);

  const [selectedHubId, setSelectedHubId] = useState('auto');
  const [activeHub, setActiveHub] = useState(REAL_HUBS[0]);
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

  // Recalculate distance and zone based on active hub selection
  const updateLocation = (lat, lng, addressName = '', targetHubId = selectedHubId) => {
    let effectiveHub = REAL_HUBS[0];
    let dist = 0;

    if (targetHubId === 'auto') {
      const closest = getClosestHub(lat, lng);
      effectiveHub = closest.hub;
      dist = closest.distance;
    } else {
      const found = REAL_HUBS.find(h => h.id === targetHubId) || REAL_HUBS[0];
      effectiveHub = found;
      dist = calculateDistanceKm(found.lat, found.lng, lat, lng);
    }

    setActiveHub(effectiveHub);
    setActiveCoords({ lat, lng });
    setCalculatedDistance(dist);
    const finalName = addressName || `Точка на карті (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    setCurrentAddressName(finalName);

    const matchedZone = resolveZoneByCoords(lat, lng, dist);

    onSelectZone(matchedZone, {
      distanceKm: dist,
      addressName: finalName,
      lat,
      lng,
      hubName: effectiveHub.shortName
    });

    if (mapInstanceRef.current && window.L) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([lat, lng]);
        const popupContent = `
          <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
            <strong style="color: #15803d; font-size: 14px;">📍 Точка доставки:</strong><br/>
            <b>${finalName}</b><br/>
            <span style="color: #64748b;">Відстань від бази (${effectiveHub.shortName}): <b>${dist} км</b></span>
          </div>
        `;
        const popup = userMarkerRef.current.getPopup();
        if (popup) {
          popup.setContent(popupContent);
        } else {
          userMarkerRef.current.bindPopup(popupContent);
        }
      }

      if (lineRef.current) {
        lineRef.current.setLatLngs([
          [effectiveHub.lat, effectiveHub.lng],
          [lat, lng]
        ]);
      }
    }
  };

  // Initialize Google Maps Tiles & Hub Markers
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    const map = L.map(mapContainerRef.current, {
      center: [48.485, 35.055],
      zoom: 11,
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

    // Draw all 4 Hub Markers on Map
    hubMarkersRef.current = REAL_HUBS.map(hub => {
      const isMainOffice = hub.id === 'journalists';
      const hubIcon = L.divIcon({
        className: 'custom-hub-marker',
        html: `<div style="background: ${isMainOffice ? '#15803d' : '#0284c7'}; color: #fff; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 17px; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.35); cursor: pointer;">${isMainOffice ? '🏢' : '🪨'}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: hubIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
          <strong style="color: ${isMainOffice ? '#15803d' : '#0284c7'}; font-size: 14px;">${hub.name}</strong><br/>
          <span style="color: #64748b;">${hub.address}</span><br/>
          <small style="color: #15803d; font-weight: 600;">Клікніть для розрахунку від цієї бази</small>
        </div>
      `);

      marker.on('click', () => {
        setSelectedHubId(hub.id);
        updateLocation(activeCoords.lat, activeCoords.lng, currentAddressName, hub.id);
      });

      return marker;
    });

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
        [REAL_HUBS[0].lat, REAL_HUBS[0].lng],
        [initialLat, initialLng]
      ],
      { color: '#22c55e', weight: 4, dashArray: '6, 8', opacity: 0.9 }
    ).addTo(map);
    lineRef.current = line;

    updateLocation(initialLat, initialLng, currentAddressName, 'auto');

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapLoaded]);

  // Handle Hub selection change from UI dropdown
  const handleHubSelectChange = (e) => {
    const hubId = e.target.value;
    setSelectedHubId(hubId);
    updateLocation(activeCoords.lat, activeCoords.lng, currentAddressName, hubId);
  };

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
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([lat, lng]);
        }
      } else {
        alert('Адресу не знайдено. Будь ласка, оберіть точку кліком на Google Карті або скористайтесь швидкими кнопками.');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&origin=${activeHub.lat},${activeHub.lng}&destination=${activeCoords.lat},${activeCoords.lng}`;

  return (
    <div className="delivery-map-picker-box">
      {/* Quarry / Hub Selector & Search Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <Building2 size={18} style={{ color: '#15803d', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              База / Кар'єр відвантаження:
            </div>
            <select
              value={selectedHubId}
              onChange={handleHubSelectChange}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.92rem',
                color: '#0f172a',
                cursor: 'pointer',
                outline: 'none',
                padding: '2px 0 0 0'
              }}
            >
              {BENGS_HUBS.map(hub => (
                <option key={hub.id} value={hub.id}>
                  {hub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
      </div>

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
              Відстань від бази (<strong>{activeHub.shortName}</strong>): <strong>{calculatedDistance} км</strong> • Зона: <strong className="text-green">{selectedZone.name.split('(')[0]}</strong>
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
