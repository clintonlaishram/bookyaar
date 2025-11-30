import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MapPinHouse } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 28.6139, lng: 77.209 }; // Fallback: Delhi

// Remove leading plus code like "J2C9+CWG, Part I, ..."
function removePlusCode(address = "") {
  if (!address) return address;

  const parts = address.split(",");
  if (parts.length === 0) return address;

  const first = parts[0].trim();
  const plusCodeRegex = /^[A-Z0-9]{4,6}\+[A-Z0-9]{2,3}$/;

  if (plusCodeRegex.test(first)) {
    return parts.slice(1).join(",").trim();
  }

  return address;
}

// Extract address parts from Google address_components
function extractAddressComponents(components = []) {
  const get = (...types) => {
    const c = components.find((comp) =>
      types.every((t) => comp.types.includes(t))
    );
    return c?.long_name || "";
  };

  const streetNumber = get("street_number");
  const route = get("route");
  const locality =
    get("sublocality_level_1", "sublocality", "political") ||
    get("locality", "political");
  const city =
    get("locality", "political") ||
    get("administrative_area_level_2", "political");

  // District from administrative_area_level_3 (fallback to level_2)
  const district =
    get("administrative_area_level_3", "political") ||
    get("administrative_area_level_2", "political");

  const state = get("administrative_area_level_1", "political");
  const pincode = get("postal_code");

  const address_line1 = [streetNumber, route].filter(Boolean).join(" ");

  return {
    address_line1,
    locality,
    city,
    district,
    state,
    pincode,
  };
}

export default function LocationPicker({ value = {}, onChange }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const mapRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const hasInitialLocationRef = useRef(false);
  const searchInputRef = useRef(null); // 👈 new

  const [searchTerm, setSearchTerm] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const center =
    value.lat != null && value.lng != null
      ? { lat: value.lat, lng: value.lng }
      : defaultCenter;

  // Init AutocompleteService when Maps JS is ready
  useEffect(() => {
    if (
      isLoaded &&
      window.google &&
      window.google.maps &&
      window.google.maps.places &&
      !autocompleteServiceRef.current
    ) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;

    if (!placesServiceRef.current) {
      placesServiceRef.current =
        new window.google.maps.places.PlacesService(map);
    }
  }, []);

  // Common emit + logging
  const emitLocationChange = useCallback(
    (payload, meta = {}) => {
      console.group("Location changed");
      if (meta.source) console.log("Source:", meta.source);
      if (meta.raw) {
        console.log("Raw Google data:", meta.raw);
      }
      console.log("Normalized payload:", payload);
      console.groupEnd();

      onChange?.(payload);
    },
    [onChange]
  );

  // Helper to reverse geocode any lat/lng (map click, drag, geolocation)
  const reverseGeocodeAndEmit = useCallback(
    (lat, lng, sourceLabel = "geocoder") => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        console.group("Geocoder raw response");
        console.log("Status:", status);
        console.log("Results:", results);
        console.groupEnd();

        if (status === "OK" && results && results.length > 0) {
          const result = results[0];
          const cleanedAddress = removePlusCode(
            result.formatted_address || ""
          );
          const parts = extractAddressComponents(
            result.address_components || []
          );

          const payload = {
            lat,
            lng,
            placeId: result.place_id,
            name: cleanedAddress,
            address: cleanedAddress,
            ...parts,
          };

          emitLocationChange(payload, {
            source: sourceLabel,
            raw: result,
          });

          setSearchTerm(cleanedAddress || "");
        } else {
          const payload = { lat, lng };
          emitLocationChange(payload, {
            source: `${sourceLabel}-no-result`,
          });
        }
      });
    },
    [emitLocationChange]
  );

  // Map click / marker drag
  const handleMapClick = useCallback(
    (event) => {
      if (!event.latLng) return;
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setIsSearching(true);
      reverseGeocodeAndEmit(lat, lng, "map-click");
    },
    [reverseGeocodeAndEmit]
  );

  const handleMarkerDragEnd = useCallback(
    (event) => {
      if (!event.latLng) return;
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setIsSearching(true);
      reverseGeocodeAndEmit(lat, lng, "marker-drag");
    },
    [reverseGeocodeAndEmit]
  );

  // Handle search input
  const handleSearchChange = (e) => {
    const valueStr = e.target.value;
    setSearchTerm(valueStr);

    if (!valueStr) {
      setPredictions([]);
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  };

  // Debounced autocomplete search
  useEffect(() => {
    if (!isLoaded) return;
    if (!autocompleteServiceRef.current) return;
    if (!searchTerm) return;

    const timeoutId = setTimeout(() => {
      autocompleteServiceRef.current.getPlacePredictions(
        { input: searchTerm },
        (results, status) => {
          if (
            status ===
            window.google.maps.places.PlacesServiceStatus.OK
          ) {
            setPredictions(results || []);
          } else {
            setPredictions([]);
          }
          setIsSearching(false);
        }
      );
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [isLoaded, searchTerm]);

  // Select suggestion → PlacesService.getDetails
  const handleSelectPrediction = useCallback(
    (prediction) => {
      if (!placesServiceRef.current || !mapRef.current) return;

      placesServiceRef.current.getDetails(
        {
          placeId: prediction.place_id,
          fields: [
            "geometry",
            "name",
            "formatted_address",
            "place_id",
            "address_components",
          ],
        },
        (place, status) => {
          console.group("PlacesService raw response");
          console.log("Status:", status);
          console.log("Place:", place);
          console.groupEnd();

          if (
            status ===
              window.google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
          ) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const cleanedAddress = removePlusCode(
              place.formatted_address || ""
            );
            const parts = extractAddressComponents(
              place.address_components || []
            );

            const payload = {
              lat,
              lng,
              placeId: place.place_id,
              name: cleanedAddress,
              address: cleanedAddress,
              ...parts,
            };

            emitLocationChange(payload, {
              source: "places-details",
              raw: place,
            });

            mapRef.current.panTo({ lat, lng });
            mapRef.current.setZoom(16);

            setSearchTerm(place.name || cleanedAddress || "");
            setPredictions([]);

            // 👇 blur the input and hide suggestions
            if (searchInputRef.current) {
              searchInputRef.current.blur();
            }
            setIsSearchFocused(false);
          }
        }
      );
    },
    [emitLocationChange]
  );

  // Auto-pickup current location on first load
  useEffect(() => {
    if (!isLoaded) return;
    if (!navigator.geolocation) return;
    if (hasInitialLocationRef.current) return;

    hasInitialLocationRef.current = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(16);
        }

        setIsSearching(true);
        reverseGeocodeAndEmit(lat, lng, "geolocation-initial");
      },
      (err) => {
        console.warn("Geolocation error:", err);
      }
    );
  }, [isLoaded, reverseGeocodeAndEmit]);

  // "Use my location" button
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(16);
        }

        setIsSearching(true);
        reverseGeocodeAndEmit(lat, lng, "geolocation-button");
      },
      (err) => {
        console.warn("Geolocation error:", err);
      }
    );
  };

  if (loadError) return <div>Map cannot be loaded right now.</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Top UI: search + "Use my location" */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          width: "min(520px, 94%)",
          display: "flex",
          gap: 8,
        }}
      >
        {/* Search box */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            padding: "4px 8px",
          }}
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Google Maps"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 14,
              padding: "6px 4px",
            }}
          />
        </div>

        {/* "Use my location" button */}
        <button
          type="button"
          onClick={handleUseMyLocation}
          style={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            gap: 4,
            whiteSpace: "nowrap",
            borderRadius: 999,
            border: "none",
            padding: "8px 10px",
            fontSize: 12,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            cursor: "pointer",
            color: "#6168ddff",
          }}
        >
          <MapPinHouse className="w-4 h-4"/> My location
        </button>
      </div>

      {/* Suggestions dropdown – only when input is focused */}
      {isSearchFocused && predictions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 52,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            width: "min(520px, 94%)",
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            maxHeight: 260,
            overflowY: "auto",
          }}
        >
          {predictions.map((p) => (
            <div
              key={p.place_id}
              onMouseDown={(e) => e.preventDefault()} // prevent blur before click
              onClick={() => handleSelectPrediction(p)}
              style={{
                padding: "8px 10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 500 }}>
                {p.structured_formatting?.main_text || p.description}
              </div>
              {p.structured_formatting?.secondary_text && (
                <div style={{ fontSize: 12, color: "#666" }}>
                  {p.structured_formatting.secondary_text}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Optional "Searching..." text */}
      {isSearching && searchTerm && (
        <div
          style={{
            position: "absolute",
            top: 52,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            marginTop: isSearchFocused ? 266 : 0,
            fontSize: 12,
            color: "#555",
            pointerEvents: "none",
          }}
        >
          Searching…
        </div>
      )}

      {/* Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {value.lat != null && value.lng != null && (
          <Marker
            position={{ lat: value.lat, lng: value.lng }}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </div>
  );
}
