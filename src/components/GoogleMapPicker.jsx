import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Check, X, Compass } from 'lucide-react';

export const GoogleMapPicker = ({ onSelectAddress, onClose, initialAddress }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerInstanceRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState(initialAddress || 'м. Дніпро');
  const [isLoadingAddr, setIsLoadingAddr] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = async () => {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      if (!isMounted || !mapRef.current || mapInstanceRef.current) return;

      const L = window.L;

      // Initial center: Dnipro
      const map = L.map(mapRef.current, {
        center: [48.4647, 35.0462],
        zoom: 12,
        zoomControl: true
      });

      // Standard OSM Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom Red Pin Icon
      const redIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div style="background-color: #ef4444; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.4); margin-left: -16px; margin-top: -32px;"><div style="width: 10px; height: 10px; background: #ffffff; border-radius: 50%;"></div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const marker = L.marker([48.4647, 35.0462], {
        icon: redIcon,
        draggable: true
      }).addTo(map);

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;

      // Reverse geocoding helper
      const updateAddressFromCoords = async (lat, lng) => {
        setIsLoadingAddr(true);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`);
          const data = await res.json();
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || 'м. Дніпро';
            const road = data.address.road || '';
            const house = data.address.house_number || '';
            const suburb = data.address.suburb || data.address.neighbourhood || '';
            
            const parts = [city, suburb, road, house].filter(Boolean);
            const fullAddr = parts.length > 0 ? parts.join(', ') : data.display_name;
            setSelectedAddress(fullAddr);
          } else {
            setSelectedAddress(`м. Дніпро (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
          }
        } catch (e) {
          setSelectedAddress(`м. Дніпро (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
        } finally {
          setIsLoadingAddr(false);
        }
      };

      // Map click event
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        updateAddressFromCoords(lat, lng);
      });

      // Marker drag event
      marker.on('dragend', () => {
        const position = marker.getLatLng();
        updateAddressFromCoords(position.lat, position.lng);
      });
    };

    loadLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleConfirm = () => {
    onSelectAddress(selectedAddress);
    onClose();
  };

  const handleLocateUser = () => {
    if (navigator.geolocation && mapInstanceRef.current && markerInstanceRef.current) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        mapInstanceRef.current.setView([latitude, longitude], 15);
        markerInstanceRef.current.setLatLng([latitude, longitude]);
        mapInstanceRef.current.fire('click', { latlng: { lat: latitude, lng: longitude } });
      });
    }
  };

  return (
    <div className="gmap-picker-backdrop animate-fade">
      <div className="gmap-picker-window animate-slide">
        <div className="gmap-header">
          <div className="gmap-title">
            <MapPin size={22} className="icon-green" />
            <div>
              <h4>Вкажіть точну точку на карті Дніпра</h4>
              <p>Клацніть у будь-яке місце на карті, щоб поставити мітку 📍</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="gmap-close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Interactive Map Box */}
        <div className="gmap-container">
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

          <button
            type="button"
            className="gmap-locate-btn"
            onClick={handleLocateUser}
            title="Моє місцезнаходження"
          >
            <Compass size={16} />
            <span>Моя геолокація</span>
          </button>
        </div>

        {/* Selected Address Display & Confirmation */}
        <div className="gmap-footer">
          <div className="gmap-address-display">
            <span className="gmap-addr-label">Вказана точка на карті:</span>
            <strong className="gmap-addr-val">
              {isLoadingAddr ? 'Отримання адреси...' : selectedAddress}
            </strong>
          </div>

          <div className="gmap-actions">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Скасувати
            </button>
            <button type="button" onClick={handleConfirm} className="btn btn-primary">
              <Check size={16} />
              <span>Встановити цю адресу</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
