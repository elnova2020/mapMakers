
import axios from 'axios'
import { storageService } from '../services/storageService'

export const mapService = {
    query,
    getPlaces,
    addPlace
}

const KEY = 'PLACES'

var gPlaces = [
    { name: 'Tel-Aviv: dizingov, 23', lat: 32.0750224, lng: 34.7749395 },
    { name: 'Haifa, Derech Simha Golan 54', lat: 32.789711, lng: 35.0078224 }
]


async function query(address) {
    try{
        const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCH-jmqS38VxKTB2yaaz9xPB95yW3TyeG4`;
        var res = await axios.get(baseUrl)
        return res.data.results[0].geometry.location
    }catch(err){
        console.log('Could not get places ' , err);
        throw err
    }
}


function getPlaces() {

    const places = _loadPlacesFromStorage()
    if(!places){
        return gPlaces
    }
    return places
}


function addPlace(place) {
    gPlaces.unshift(place)
    _savePlaceToStorage();
}


function _savePlaceToStorage() {
    storageService.store(KEY, gPlaces)
}

function _loadPlacesFromStorage() {
    return storageService.load(KEY)
}