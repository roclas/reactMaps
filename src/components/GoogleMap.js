import React, { Component, createRef } from 'react'
import context from './Context';

function dist(lat1,lon1,lat2,lon2) {
  function toRad(x) { return x * Math.PI / 180; }
  var R = 6371; // km
  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

class GoogleMap extends Component {

  googleMapRef = createRef()

  componentDidMount() {
	context.nOfRefreshes=1;
	const api_key=this.props.apikey?this.props.apikey:process.env.REACT_APP_GOOGLE_API_KEY;
	const googleMapScript = document.createElement('script')
	const markers=this.props.markers
	googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places`
	window.document.body.appendChild(googleMapScript)	
	googleMapScript.addEventListener('load', () => {
		let bounds = new window.google.maps.LatLngBounds();
		this.googleMap = this.createGoogleMap()
		markers.forEach(m=>{
			this.createMarker(m);
			bounds.extend({lat:m.lat,lng:m.lng});
		})
	    	this.googleMap.fitBounds(bounds);
	})
   }


   searchAddress= (a) =>{
    this.geocoder = new window.google.maps.Geocoder();  
    this.geocoder.geocode(
	{address:a}, d=>{
	    if(!d || !d.length)return;
	    let [lat,lng]=[d[0].geometry.location.lat(),d[0].geometry.location.lng()];
	    this.googleMap.setCenter(new window.google.maps.LatLng(lat,lng));
	    let closest=this.props.markers.reduce((a,e)=>
		    dist(e.lat,e.lng,lat,lng)>a?a:[e,dist(e.lat,e.lng,lat,lng),e.lat,e.lng],
		    	[this.props.markers[0],999999],0,0);
	    if(closest[1]<999999){
		let bounds = new window.google.maps.LatLngBounds();
		bounds.extend({lat:lat,lng:lng});
		bounds.extend({lat:closest[2],lng:closest[3]});
		console.log("closest marker",closest[0]);
		this.chooseMarker(closest[0]);
	    	this.googleMap.fitBounds(bounds);
	    }
    });
    context.searchAddress="";
   }

   chooseMarker=(o)=>{
	    console.log("choosing marker",o);
	    context.detailText=<><p>Address: {o.address}</p>
	    <p>Telephone: {o.telephone}</p>
	    <p>Opening hours: {o.open}</p>
	    <p><a href={o.href}>Book an appointment</a></p>
	    </>
	    this.props.refreshParent(context.nOfRefreshes++);
    }

   createMarker = (o) =>{
    let marker=new window.google.maps.Marker({
      position: o,
      map: this.googleMap,
      extradata:{}
    })
    marker.addListener("click", ()=>this.chooseMarker(o));
   }


    createGoogleMap = () =>{
    	return new window.google.maps.Map(this.googleMapRef.current, {
      		zoom: 16, center: this.props.center, disableDefaultUI: true,
    })}

  render() {
    if(context.searchAddress) this.searchAddress(context.searchAddress);
    return (
      <div ref={this.googleMapRef} style={{ position:'absolute',float:'right',width: '70%', height:this.props.height }} />
    )
  }
}

export default GoogleMap;
