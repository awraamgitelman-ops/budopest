import React, { useEffect, useRef, useState } from 'react';
import { DELIVERY_ZONES } from '../data/catalogData';
import { Search, MapPin, CheckCircle2, ExternalLink, Layers, Building2, Warehouse } from 'lucide-react';

export const BENGS_HUBS = [
  {
    id: 'liubymivka',
    name: 'Любимівський гранітний кар\'єр (Південний напрямок)',
    shortName: 'Любимівський гранітний кар\'єр',
    lat: 48.3750,
    lng: 35.1850,
    address: 'с. Любимівка (пряме видобування та відвантаження)'
  },
  {
    id: 'naberezhna',
    name: 'Термінал «Набережна Заводська» (Правий берег / Дніпро)',
    shortName: 'Термінал Набережна Заводська',
    lat: 48.4890,
    lng: 34.9850,
    address: 'м. Дніпро, вул. Набережна Заводська (автоваги 80т)'
  },
  {
    id: 'kamianske',
    name: 'Кам\'янський перевальний термінал (Західний напрямок)',
    shortName: 'Кам\'янський термінал',
    lat: 48.5173,
    lng: 34.6063,
    address: 'м. Кам\'янське (перевальний склад)'
  }
];

const OFFICE_COORDS = {
  lat: 48.5135,
  lng: 35.0850,
  name: 'Головний офіс ТОВ «БЕНГС»',
  address: 'м. Дніпро, вул. Журналістів, 3 (бухгалтерія та кабінети)'
};

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
  const hubMarkersRef = useRef([]);

  const [selectedHubId, setSelectedHubId] = useState(BENGS_HUBS[0].id);
  const [activeHub, setActiveHub] = useState(BENGS_HUBS[0]);
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

  // Recalculate distance and zone strictly from quarry hubs (excluding office)
  const updateLocation = (lat, lng, addressName = '', targetHubId = selectedHubId) => {
    const found = BENGS_HUBS.find(h => h.id === targetHubId) || BENGS_HUBS[0];
    const dist = calculateDistanceKm(found.lat, found.lng, lat, lng);

    setActiveHub(found);
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
      hubName: found.shortName
    });

    if (mapInstanceRef.current && window.L) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([lat, lng]);
        const popupContent = `
          <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
            <strong style="color: #15803d; font-size: 14px;">Точка доставки:</strong><br/>
            <b>${finalName}</b><br/>
            <span style="color: #64748b;">Відстань від кар'єра/бази (${found.shortName}): <b>${dist} км</b></span>
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
          [found.lat, found.lng],
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

    // Draw Office Marker (Informational slate SVG badge)
    const officeIcon = L.divIcon({
      className: 'custom-office-marker',
      html: `<div style="background: #334155; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-weight: 700; font-size: 13px;">Офіс</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    const officeMarker = L.marker([OFFICE_COORDS.lat, OFFICE_COORDS.lng], { icon: officeIcon }).addTo(map);
    officeMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
        <strong style="color: #334155; font-size: 14px;">${OFFICE_COORDS.name}</strong><br/>
        <span style="color: #64748b;">${OFFICE_COORDS.address}</span><br/>
        <small style="color: #94a3b8;">Розрахунок доставки здійснюється від кар'єрів/баз</small>
      </div>
    `);

    // Draw Quarry & Terminal Hub Markers on Map (Green SVG Badges)
    hubMarkersRef.current = BENGS_HUBS.map((hub, idx) => {
      const hubIcon = L.divIcon({
        className: 'custom-hub-marker',
        html: `<div style="background: #15803d; color: #fff; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.35); cursor: pointer;">К${idx + 1}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: hubIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
          <strong style="color: #15803d; font-size: 14px;">${hub.name}</strong><br/>
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

    // Customer Destination Marker (Red Location Pin)
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `<div style="background: #ef4444; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.35);">Ціль</div>`,
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
        [BENGS_HUBS[0].lat, BENGS_HUBS[0].lng],
        [initialLat, initialLng]
      ],
      { color: '#22c55e', weight: 4, dashArray: '6, 8', opacity: 0.9 }
    ).addTo(map);
    lineRef.current = line;

    updateLocation(initialLat, initialLng, currentAddressName, BENGS_HUBS[0].id);

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
        alert('Адресу не знайдено. Будь ласка, оберіть точку кліком на Google Карті.');
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
      {/* Sleek Custom Quarry / Hub Selector Card */}
      <div className="quarry-select-card">
        <div className="qsc-header">
          <Warehouse size={16} className="text-green" />
          <span className="qsc-title">Кар'єр / База відвантаження (звідки рахувати доставку):</span>
        </div>
        <div className="qsc-select-wrapper">
          <select
            value={selectedHubId}
            onChange={handleHubSelectChange}
            className="qsc-select"
          >
            {BENGS_HUBS.map(hub => (
              <option key={hub.id} value={hub.id}>
                {hub.name}
              </option>
            ))}
          </select>
          <div className="qsc-arrow">▼</div>
        </div>
      </div>

      {/* Search Input & Satellite Toggle Bar */}
      <div className="map-search-bar-row">
        <form onSubmit={handleSearchSubmit} className="map-search-form flex-1">
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

        <button type="button" onClick={toggleMapType} className="map-type-toggle-btn">
          <Layers size={14} />
          <span>{mapType === 'roadmap' ? 'Google Супутник' : 'Google Схема'}</span>
        </button>
      </div>

      {/* Google Maps Container */}
      <div className="leaflet-map-wrapper">
        <div ref={mapContainerRef} className="leaflet-map-container" style={{ height: '360px', width: '100%' }} />
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
              Відстань від кар'єра/бази (<strong>{activeHub.shortName}</strong>): <strong>{calculatedDistance} км</strong> • Зона: <strong className="text-green">{selectedZone.name.split('(')[0]}</strong>
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

      <style>{`
        .quarry-select-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }
        .qsc-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .qsc-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .qsc-select-wrapper {
          position: relative;
          width: 100%;
        }
        .qsc-select {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          background: #f8fafc;
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          padding: 11px 40px 11px 14px;
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }
        .qsc-select:hover {
          border-color: #16a34a;
          background: #ffffff;
        }
        .qsc-select:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
          background: #ffffff;
        }
        .qsc-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.75rem;
          color: #64748b;
          pointer-events: none;
        }
        .map-search-bar-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        @media (max-width: 640px) {
          .map-search-bar-row {
            flex-direction: column;
          }
          .map-search-bar-row .map-search-form {
            width: 100%;
          }
          .map-type-toggle-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
