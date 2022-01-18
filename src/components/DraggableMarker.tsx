import { useCallback, useMemo, useRef, useState } from 'react';
import { Marker,  Popup } from 'react-leaflet';


const center = {
    lat: 51.505,
    lng: -0.09,
  }
interface Cnetr {
    lat : number;
    lng : number
}  



export default function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState<Cnetr>(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker:any = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        
        <Popup minWidth={90}  >
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
  }
  