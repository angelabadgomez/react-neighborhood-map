import React, { Component } from 'react'
import App from './App'
import InfoWindowD from './InfoWindowD'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const styles = {
    position: 'inherit', backgroundColor: 'white',
    listStyle: 'none'

}


function PlaceDetails(props) {

  const { markers, showMarkers, foursquareVenue, attractions } = props;

  return (
          <div>
            {props.markers.map((marker, index)=> {
              if(props.showMarkers.venueId === marker.venueId){
                return(
                  <div key={props.showMarkers.venueId} ><h3>Found places:</h3>
                    <h5>{props.showMarkers.name}</h5>
                    <p>{props.attractions ? ( `Likes: ` + props.attractions.likes.count):('Information could not be loaded from Foursquare') }</p>
                  </div>
                )
              }
            })}

          <ol onClick={(event)=>{props.showInfoInList(event.target.value) }}></ol>


          </div>

  );
}

export default PlaceDetails;
