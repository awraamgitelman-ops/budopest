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

      // Initial center: Dnipro, Zoom 15 for house visibility
      const map = L.map(mapRef.current, {
        center: [48.4647, 35.0462],
        zoom: 15,
        zoomControl: true
      });

      // Official Google Maps Roadmap Tiles
      L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      }).addTo(map);

      // Custom Red Pin Icon
      const redIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div style="background-color: #ef4444; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.45); margin-left: -17px; margin-top: -34px;"><div style="width: 12px; height: 12px; background: #ffffff; border-radius: 50%;"></div></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });

      const marker = L.marker([48.4647, 35.0462], {
        icon: redIcon,
        draggable: true
      }).addTo(map);

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;

      // Reverse geocoding in Ukrainian with exact house numbers
      const updateAddressFromCoords = async (lat, lng) => {
        setIsLoadingAddr(true);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=uk`);
          const data = await res.json();
          if (data && data.address) {
            const addr = data.address;
            const city = addr.city || addr.town || addr.village || 'м. Дніпро';
            const road = addr.road || addr.street || addr.avenue || addr.pedestrian || '';
            const house = addr.house_number || addr.building || '';
            const suburb = addr.suburb || addr.neighbourhood || addr.city_district || '';
            
            let fullAddr = '';
            if (road && house) {
              fullAddr = `${city}, ${road}, буд. ${house}`;
            } else if (road) {
              fullAddr = `${city}, ${road}`;
            } else if (suburb) {
              fullAddr = `${city}, ${suburb}`;
            } else {
              fullAddr = city;
            }
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
        mapInstanceRef.current.setView([latitude, longitude], 17);
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
              <h4>Вкажіть потрібний будинок / точку на Google Карті</h4>
              <p>Натисніть точно на потрібну будівлю, щоб встановити адреси доставки 📍</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="gmap-close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Google Map Interactive Canvas */}
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
            <span className="gmap-addr-label">Вибрана адреса з номером будинку:</span>
            <strong className="gmap-addr-val">
              {isLoadingAddr ? 'Визначення будинку за міткою...' : selectedAddress}
            </strong>
          </div>

          <div className="gmap-actions">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Скасувати
            </button>
            <button type="button" onClick={handleConfirm} className="btn btn-primary">
              <Check size={16} />
              <span>Обрати цю адресу</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
