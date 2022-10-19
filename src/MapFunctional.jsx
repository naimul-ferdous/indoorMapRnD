import React, { useRef, useState } from 'react';
import './App.css';


const MapFunctional = () => {

    const [xy, setXy] = useState({x: 0, y: 0});

    const [markers, setMarkers] = useState([]);

    const [isDragging, setIsDragging] = useState(false);

    const [draggingElementId, setDraggingElementId] = useState(0);

    const [gf, setGf] = useState("Ground Floor");

    const parentRef= useRef(null);


    const handleMouseMove = (e) => {
        setXy({...xy, x: e.clientX, y: e.clientY});
      }
    
      const handleDragEnd = (e) => {

        let bounds = parentRef.current.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;
    
        console.log(x, y);

        const marker = markers.find(item => item.id === draggingElementId);
        // const markerpos = e.target.getBoundingClientRect()
        // marker.x = markerpos.x-297;
        // marker.y = markerpos.y-63;
    
        marker.x = x;
        marker.y = y;
    
        console.log("drag ended", e.target.getBoundingClientRect());
    
        const updatedMarkers = [...markers, marker];

        setMarkers(updatedMarkers);
      }
    
      const handleClick = (e) => {
        console.log("clicked on the image");
        const rel = e.target.getBoundingClientRect()
        console.log(rel);
        const newMarker = {
          x: xy.x - rel.left - 15,
          y: xy.y - rel.top - 15,
          gf: gf,
          id: markers.length + 1
        }
    
        // this.setState(prevState => ({
        //   markers: [...prevState.markers, newMarker],
        // }))

        setMarkers([...markers, newMarker]);

        
        if (markers.length > 0) {
          console.log(markers);
        }
    
      }
    
      const handleDrag = (e, id) => {

        setIsDragging(true);
        setDraggingElementId(id);
    
        console.log("dragged element", id);
        console.log("position", e);
    
      }
    
      const handleMarkerClick=(e)=> {
        e.stopPropagation();
        console.log("clicked on the marker", e.clientX);

        setXy({...xy, x: e.clientX, y: e.clientY});
    
      }
    return (
        <div className="app container">
          <br></br><br></br>
  
          <div ref={parentRef} className="img-box" onMouseMove={handleMouseMove} onClick={handleClick}>
            {
  
              markers.map((value, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      left: value.x,
                      top: value.y,
                    }}
                    className="marker"
                    draggable={true}
                    onDrag={(ev) => handleDrag(ev, value.id)}
                    onDragEnd={handleDragEnd}
                    onClick={handleMarkerClick}
                  >
                    {value.id}
                  </div>
                )
  
  
              })}
          </div>
        </div>
      )
}

export default MapFunctional