import React from 'react'
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      grf: 'Ground Floor',
      markers: [],

      moveXAmount: 0,
      moveYAmount: 0,
      isDragging: false,
      draggingElementId: 0
    }
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  handleDragEnd = (e) => {
    const marker = this.state.markers.find(item => item.id === this.state.draggingElementId);
    const markerpos = e.target.getBoundingClientRect()
    // marker.x = markerpos.x-297;
    // marker.y = markerpos.y-63;

    marker.x = 0;
    marker.y = 0;

    console.log("drag ended", e.target.getBoundingClientRect());

    const updatedMarkers = [...this.state.markers, marker];

    this.setState({
      ...this.state,
      markers: updatedMarkers
    })
  }

  handleClick = (e) => {
    console.log("clicked on the image");
    const rel = e.target.getBoundingClientRect()
    console.log(rel);
    const newMarker = {
      x: this.state.x - rel.left - 15,
      y: this.state.y - rel.top - 15,
      grf: this.state.grf,
      id: this.state.markers.length + 1
    }

    this.setState(prevState => ({
      markers: [...prevState.markers, newMarker],
    }))
    if (this.state.markers.length > 0) {
      console.log(this.state.markers);
    }

  }

  handleDrag = (e, id) => {

    this.setState({
      ...this.state,
      isDragging: true,
      draggingElementId: id,
    })

    console.log("dragged element", id);
    console.log("position", e);

  }

  handleMarkerClick=(e)=> {
    e.stopPropagation();
    console.log("clicked on the marker", e.clientX);
    this.setState({
      x: e.clientX,
      y: e.clientY
    })

  }

  render() {
    return (
      <div className="app container">
        <br></br><br></br>

        <div className="img-box" onMouseMove={this.handleMouseMove} onClick={this.handleClick}>
          {

            this.state.markers.map((value, index) => {
              return (
                <div
                  key={index}
                  style={{
                    left: value.x,
                    top: value.y,
                  }}
                  className="marker"
                  draggable={true}
                  onDrag={(ev) => this.handleDrag(ev, value.id)}
                  onDragEnd={this.handleDragEnd}
                  onClick={this.handleMarkerClick}
                >
                  {value.id}
                </div>
              )


            })}
        </div>
      </div>
    )
  }
}

export default App
