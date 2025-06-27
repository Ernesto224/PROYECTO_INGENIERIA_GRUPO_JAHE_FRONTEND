import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: google.maps.Map | undefined;
  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderer: google.maps.DirectionsRenderer | undefined;

  destination = { lat: 9.901410394746234, lng: -83.67192974726795}; 

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.initMap(userLocation);
        },
        (error) => {
          console.error('Geolocation error: ', error);
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  initMap(userLocation: { lat: number; lng: number }): void {
    const loader = new Loader({
      apiKey: 'AIzaSyBU15Ra0fu6E449z7qomTyXAkZFnxrycb4', 
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: userLocation,
        zoom: 14,
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      this.directionsRenderer.setMap(this.map);

      const request = {
        origin: userLocation,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          this.directionsRenderer?.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });

      const userMarker = new google.maps.Marker({
        position: userLocation,
        map: this.map,
        title: "Your Location"
      });
    }).catch(error => {
      console.error('Error loading Google Maps: ', error);
    });
  }
}