import React, { Component } from 'react'
import './App.css'
import InfoWindowD from './InfoWindowD'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {

  state = {
    showingInfoWindow: false,
    showingMarker: false, //if true this will show all markers
    activeMarker: {},
    attractions: {
      likes: {
        count: 0
      }
    },
    selectedPlace: {},
    showMarkers: {type: 'All'},
    markers:
        [ {
          name: 'Стадион «Нижний Новгород»',
          lat: 56.337498,
          lng: 43.963386,
          venueId: '555eed18498e3451c8bf5765',
          type:'Sport',
          show: true},
         {
          name: 'Большая Покровская улица',
          lat: 56.317676,
          lng: 43.995474,
          venueId: '4bd322019854d13ae2f1fc4d',
          type:'Entertaiment',
          show: true},
         {
          name: 'Нижегородский Кремль',
          lat: 56.328499,
          lng: 44.004681,
          venueId: '4d90af651716a143265167f7' ,
          type: 'Historical',
          show: true},
         {
          name: 'Зоопарк «Лимпопо»',
          lat: 56.334550,
          lng: 43.854127,
          venueId: '4ca71ea5931bb60ccec999e2',
          type: 'Park',
          show: true},
         {
          name: 'Теннис Парк Cafe',
          lat: 56.292484,
          lng: 43.974676,
          venueId: '54a6a2a6498ee573efdc4234',
          type: 'Cafe',
          show: true}
      ],
  };
/* // client 1
client_id=RT5Y42P5OSTXAOTGCERRNVLQCUYGF2SBX0SSHJJJBJ5LPXRP
client_secret=15KS1PLQ5OV1NZ2HDGKDAF1SD34LAYGXWWIGH1CXL4C2XQGJ
*/

/* // client 2
client_id=QHLI4ZDYMM4DOPDXN04KC10HSYD3XLMQLIDEHT44SD5PS0H2
client_secret=IUX4Q40CKHK0XHGRZC3JJRQ5PKZUTYNUJBBJXQPCHT0P5JVG
*/

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })

    //send the title to foursquareVenue to get the place id and fetch a description from Foursquare API
    //this.foursquareVenue(marker.title);
    console.log('onMarkerClick received: ' + marker.name),
    this.foursquareVenue(marker.name)
  }


  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  showInfoInList = (received) => {
    console.log('showInfoInList: ' + received)
  }

  ejecutar = (received) => {
    console.log(received)


    //close any opened infoWindow before opening any marker
    this.setState({showingInfoWindow: false});

    for(var i=0; i < this.state.markers.length; i++) {

      var marker = this.state.markers[i];
      if(this.state.markers[i].type === received) {
        this.setState({showMarkers: this.state.markers[i]})
        marker.show = true //set property show marker to true

      }
      else{
      //  this.setState({show: false})
      marker.show = false //hide markers in other categories
      this.showingInfoWindow = false
      }
    }

    if(received == 'All') {
      for(var i=0; i < this.state.markers.length; i++) {

      var allMarkers = this.state.markers[i];
    //  this.setState({showingMarker: true})
      allMarkers.show = true //set property show marker to true

        console.log('SOMETHING ' + allMarkers.show)
      }
    }
  }

    //this method adds venueInfo to a marker in the state
    updateMarkerInfo = (venueId) => {
      console.log('test() executed ' +venueId)
      for(var i=0; i < this.state.markers.length; i++) {
        if(this.state.markers[i].venueId === venueId){
          var addVenueInfo = this.state.markers[i];
          var likes = this.foursquareVenue(venueId); /*this.state.attractions.likes.count*/;
           addVenueInfo.likes = likes //set property show marker to true
        }
      }
    }

      foursquareVenue = (venueId) => {
        console.log(venueId)
        for(var i=0; i < this.state.markers.length; i++) {
          if(venueId === this.state.markers[i].venueId){
          var attraction = this.state.markers[i].venueId;

           // Begins basic foursquare API request
            //  This request is not premium and is almost not limited to make tests per day. Comment to test premium request bellow
            fetch(`https://api.foursquare.com/v2/venues/${this.state.markers[i].venueId}/likes?client_id=QHLI4ZDYMM4DOPDXN04KC10HSYD3XLMQLIDEHT44SD5PS0H2&client_secret=IUX4Q40CKHK0XHGRZC3JJRQ5PKZUTYNUJBBJXQPCHT0P5JVG&v=20180827`)
                 .then((result) =>
                    result.json()
                 )
                 .then(parsedJSON =>
                       (this.setState({attractions: parsedJSON.response}),

                       // this.setState({ [`attraction${attraction}`]: parsedJSON.response }),
                       this.setState({ [`${attraction}`]: parsedJSON.response }),
                       console.log('doing something with: ' +venueId)
                     )
                  )
                 .catch((error) =>
                 alert('there was an error:' + error )
               );  // Finish basic foursquare API request */


                {/*  // Begins premium foursquare API request
                 // This request is premium and it is limited to 50 request per day. To test no premium requests try uncommenting the var foursquareVenue variable from above
                   fetch(`https://api.foursquare.com/v2/venues/${this.state.markers[i].venueId}?client_id=QHLI4ZDYMM4DOPDXN04KC10HSYD3XLMQLIDEHT44SD5PS0H2&client_secret=IUX4Q40CKHK0XHGRZC3JJRQ5PKZUTYNUJBBJXQPCHT0P5JVG&v=20180827`)
                        .then((result) =>
                           result.json()
                        )
                        .then(parsedJSON =>
                              (this.setState({attractions: parsedJSON.response})),
                              console.log('information saved at state')
                         )

                      //   .then( ()=>
                      //   infoWindow.setContent(`<div><h2>${attractionTitle}</h2>
                      //        <p>Address: ${getAttractionAddress()}<br>
                      //        <strong>Rating:</strong> ${getAttractionRating()}   <strong>Attraction type: </strong>${getAttractionType()}</p>
                      //        <p>${getVenueDescription()}</p>
                      //        <p><span>Information provided by: <a target="_blank" href="http://foursquare.com">Foursquare</a></span></p></div>`)
                      //      )
                        .catch((error) =>
                            console.log('There was a problem getting the information from the server. Details: ' + error)
                        );
                */}  // Finish premium foursquare API request
          }
        }
      }

  componentWillUnmount() {
      if (this.marker) {
        this.marker.setMap(null);
      }
    }

  // <Marker onClick={this.onMarkerClick}
  //   title={points[0].name}
  //   name={this.state.selectedPlace.name}
  //   position={{lat: 56.337498, lng: 43.963386}}
  // />

  render() {
    const style = {
  width: '100%',
  height: '100%'
}
var attractionToCache;
var attractionToCache2;


var updateShowMarkers = (received) => {
  //close any opened infoWindow before opening any marker
  this.setState({showingInfoWindow: false});

for(var i=0; i < this.state.markers.length; i++) {

  var marker = this.state.markers[i];
  if(this.state.markers[i].venueId === received) {
    console.log('venue found')
    this.setState({showMarkers: this.state.markers[i]})
    marker.show = true //set property show marker to true
  }
  else{
  marker.show = false //set property show to true
  this.showingInfoWindow = false
  }
}
//this.foursquareVenue(received)
}



var venueInfo;
var attractionTitle;
var infoWindow;
var getAttractionLikes;




var pointsOnMap = []
console.log(this.state.showMarkers)
var bounds = new this.props.google.maps.LatLngBounds();


for (var i = 0; i < this.state.markers.length; i++) {
  bounds.extend(this.state.markers[i]);
  console.log(this.state.markers[i].name)
  //send the title to foursquareVenue to get the place id and fetch a description from Foursquare API

  //this.foursquareVenue(this.state.markers[i].name);
}

//var createDiv.setContent(`<div>test1</div><div>test2</div>`)

for (var i = 0; i < 3; i++) {
//  return (i)
}

    return (
      <div className="app" style={style}>
        <InfoWindowD markers={this.state.markers} activeMarker={this.state.activeMarker} updateShowMarkers={updateShowMarkers} ejecutar={this.ejecutar} attractions={this.state.attractions} showMarkers={this.state.showMarkers} showInfoInList={this.showInfoInList} foursquareVenue={this.foursquareVenue}/>
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 56.285775,
            lng: 43.933880
          }}
          zoom={11}
          onClick={this.onMapClicked}
          bounds={bounds}
        >

{ this.state.showMarkers.length < 1 ? (


      <Marker onClick={this.onMarkerClick}
        position={{lat: this.state.showMarkers.lat, lng:this.state.showMarkers.lng}}
        title={this.state.showMarkers.name}
        name={this.state.showMarkers.name}
        animation= {this.props.google.maps.Animation.BOUNCE}
        visible={true}
      />


) : (

  this.state.markers.map((marker, index)=> {
    return (
      <Marker key={marker.venueId} onClick={this.onMarkerClick}
        position={{lat: marker.lat, lng:marker.lng}}
        title={marker.name}
        name={marker.venueId}
        animation= {this.props.google.maps.Animation.Zn}
        visible={marker.show}
         /* visible={this.state.showingMarker} */
      />
    )
    })

)

  }


        {/* this.state.showMarkers === 'undefined' ? (
          points.map((marker, index)=> {
      return (
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}} />
      )
      })
        ):(
          points.map((marker, index)=> {
      return (
        <Marker onClick={this.onMarkerClick}
          position={{lat: marker.lat, lng:marker.lng}}
          title={marker.name}
          name={marker.name}

        />
      )
      })
        )
*/}
{ /*}} */}
        <InfoWindow
        marker={this.state.activeMarker}
        onOpen={this.windowHasOpened}
        onClose={this.windowHasClosed}
        visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.title}</h1>

            {/*// uncomment the next tags to test the premium foursquare API request*/}
            {/*  <span><strong>Rating:</strong> {this.state.attractions.venue.rating}</span><br />
              <span><strong>Attraction type: </strong>{this.state.attractions.venue.category[0].name}</span>

            <p>{this.state.attractions.venue.description}</p>
            <p><span>Information provided by: <a target="_blank" href="http://foursquare.com">Foursquare</a></span></p>
            */}

            {/*// uncomment the next <p> tag to test the basic foursquare API request*/}
            <p>Received likes: {this.state.attractions.likes.count}</p>

          {/*  <p>likes: {!this.state[`${this.state.selectedPlace.name}`] ? ('this.state.attractions.likes.count' ):('updating') </p> */}

          </div>
      </InfoWindow>

      </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDyeZwrmykBXkG_FkJY6kPthSpdidMpFiM")
})(App)
