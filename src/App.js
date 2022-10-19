import React from 'react'
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      grf:'Ground Floor',
      markers: [],
    }
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  handleClick = (e) => {
    const rel = e.target.getBoundingClientRect()

    const newMarker = {
      x: this.state.x - rel.left - 15,
      y: this.state.y - rel.top - 15,
      grf: this.state.grf,
    }

    this.setState(prevState => ({
      markers: [...prevState.markers, newMarker],
    }))
    if(this.state.markers.length>0){
      console.log(this.state.markers);
    }
   
  }

  handleDrag=(e, i)=> {
    console.log("dragged element", this.state.markers[i]);
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
                onDrag={(ev)=>this.handleDrag(ev, index)}
              >
                {index + 1}
              </div>
            )


          })}
        </div>
      </div>
    )
  }
}

export default App
