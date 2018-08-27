import React, { Component } from 'react'
import App from './App'
import PlaceDetails from './PlaceDetails'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const styles = {
    position: 'inherit', backgroundColor: 'white',
    listStyle: 'none'

}

function InfoWindowD(props) {


  const { markers, activeMarker, updateShowMarkers, ejecutar, attractions, showMarkers, showInfoInList, foursquareVenue } = props;

  return (
    <div style={styles}>
      <div className="content">
        <h3>Attractions in Nizhny Novgorod</h3>
        <p>Filter by type:
        <select defaultValue="All" onChange={(event)=>{props.ejecutar(event.target.value); }} >
          <option value="All">All</option>
          {props.markers.map((marker, index)=> {
            return (
            <option value={marker.type}>{marker.type}</option>
            )
            })}
        </select></p>

          <div>Category spotlights: {props.showMarkers.type}

          <ul>
            {props.markers.map((marker, index)=> {
              if(marker.show === true){
              return (
              <li key={marker.venueId}>
              <form defaultValue="All" onChange={(event)=>{props.updateShowMarkers(event.target.value),props.showInfoInList(event.target.value) }}>
                <input type='radio' value={marker.venueId} name='radio' id={marker.venueId} />
                <label htmlFor={marker.venueId}>{marker.name}</label>
                </form>

              </li>
            )
          }
            })}
          </ul>

</div>







      </div>
    </div>
  );
}

// <PlaceDetails markers={props.markers}
// showMarkers={props.showMarkers}
// foursquareVenue={props.foursquareVenue}
// attractions={props.attractions} />

export default InfoWindowD;
