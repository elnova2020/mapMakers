import { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { mapService } from '../services/mapService'



export class _MapContainer extends Component {

  state = {
    activeMarker: {},
    selectedPlace: {},
    addresseName: '',
    places: [],
    isWrongLoc: false
  };

  componentDidMount() {
    this.loadPlaces()
  }


  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  loadPlaces = () => {
    var places = mapService.getPlaces()
    this.setState({
      ...this.state,
      places

    })
  }



  onAddMarker = async (ev) => {
    ev.preventDefault()
    try {
      var addressForQuerry = this.state.addresseName.replace(/\s/g, "%20");

      const newLoc = await mapService.query(addressForQuerry)
      this.setState({
        ...this.state,
        places: [...this.state.places, { name: this.state.addresseName, lat: newLoc.lat, lng: newLoc.lng }],
        isWrongLoc: false
      }, () => {
        mapService.addPlace({ name: this.state.addresseName, lat: newLoc.lat, lng: newLoc.lng })
      })

    } catch (err) {
      console.log('Could not add marker' , err);
      this.setState({
        ...this.state,
        isWrongLoc: true
      })      
    }

  }


  onHandleChange = ({ target }) => {
    this.setState({
      ...this.state,
      addresseName: target.value
    })
  }


  render() {
    const { places , isWrongLoc } = this.state
    if (!places) return <div>Loading...</div>
    return (
      <section className="page-map">

        <form className="page-map-form flex align-center justify-center" action="" onSubmit={this.onAddMarker} >
          <input className="page-map-input" type="text" placeholder="Type location" onChange={this.onHandleChange} />
          <button>Add Marker</button>
        </form>

        {isWrongLoc && <div className="page-map-wrong-loc">You have entered a wrong location , please try again.</div>}

        <Map
          google={this.props.google}
          initialCenter={{ lat: 32.0750224, lng: 34.7749395 }}
          onClick={this.onMapClicked}
          zoom={7}
          style={{ position: 'relative', width: '85%', height: '700px', margin: 'auto', bottom: '0' }}>
          {places.map((place, idx) => <Marker key={idx} name={place.name} position={{ lat: place.lat, lng: place.lng }} />)}
        </Map>

      </section>
    );
  }
}

export const MapContainer = GoogleApiWrapper({
  apiKey: ('AIzaSyCH-jmqS38VxKTB2yaaz9xPB95yW3TyeG4')
})(_MapContainer)


