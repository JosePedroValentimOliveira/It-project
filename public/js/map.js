let cultuur;
let erfgoed;
let basemaps = {};
let erfgoedControl, cultuurControl;
let myMap;


let boolInfo = false;
let cultuurLabel = document.getElementById("cultuurLabel");
let erfgoedLabel = document.getElementById("erfgoedLabel");

//graphHopper routing setup
let routerControl = L.Routing.control({
    router: new L.Routing.graphHopper('afe32948-3157-43bb-a160-0b2334bf8fed'),
    collapsible: true
});

//aanmaken tile layer voor map
let tile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGVjdG9yd291dGVyIiwiYSI6ImNrNTJrbXVraDB6cWwzbHFuZmFpN3lrM3MifQ.hNfZWRybtm-L49c9TPZ-dQ',

})
//async functie voor ophalen van datasets
const dataOphalen = async (index) => {
    const rawData = await fetch(`./json/datasets.json`);
    const dataJson = await rawData.json();
    return dataJson[index];
  
  }
  //initialiseer map
let initMap= () =>{

    myMap = L.map('mapid', {
        center: [51.2194, 4.4025], zoom: 11.5
    })
}
//slider button om te zien welke layercontrol op map moet staan
let checkMap=()=> {
    let checkbox = document.getElementById("switch1").checked;
    erfgoedControl.addTo(myMap);
    cultuurControl.addTo(myMap);
    myMap.removeControl(routerControl);


    if (checkbox) {

        myMap.removeControl(erfgoedControl);
        cultuurLabel.style.color = "White";
        erfgoedLabel.style.color = "Grey";
    }
    else {

        myMap.removeControl(cultuurControl);
        cultuurLabel.style.color = "Grey";
        erfgoedLabel.style.color = "White";
    }


    myMap.eachLayer((layer) => {
        myMap.removeLayer(layer);
    });
    myMap.addLayer(tile);
}

//alle layergroups aanvullen met de correcte data gefilterd op gemeentes
let fillLayers = () => {


    for (let i = 0; i < 2; i++) {
      let antwerpenLayer = L.layerGroup(),
        berchemLayer = L.layerGroup(),
        bezaliLayer = L.layerGroup(),
        borgerhoutLayer = L.layerGroup(),
        ekerenLayer = L.layerGroup(),
        hobokenLayer = L.layerGroup(),
        merksemLayer = L.layerGroup(),
        wilrijkLayer = L.layerGroup(),
        edegemLayer = L.layerGroup(),
        deurneLayer = L.layerGroup();
  
      dataOphalen(i).then(link => {
  
      
  
      fetch(link.url).then((resp) => { return resp.json(); }).then((data) => {
  
  
  
        data.features.forEach(element => {
  
  
          let gemeente = element.attributes.gemeente;
          let lat = element.attributes.LAT;
          let lon = element.attributes.LON;
          let icon = L.icon({
            iconUrl: './images/marker-icon-red.png',
            iconSize: [25, 41]
          });
          let marker;
  
          if (i == 0) {
            marker = L.marker([lat, lon])
          }
          else {
            marker = L.marker([lat, lon], { icon: icon });
  
          }
          let route = document.createElement('button');
          route.className = 'route';
          route.textContent = "Route"
          let info = document.createElement('button');
          info.className = 'info';
          info.textContent = "Informatie";
          let div = document.createElement('div');
          div.className = 'div';
          div.appendChild(route);
          div.appendChild(info);
          let popup = L.popup().setContent(div);

          //marker popup met 2 buttons Route en Informatie
          //Route vraagt huidige locatie en displayed route
          //Informatie geeft een alert met alle informatie van de locatie
          marker.bindPopup(popup).on('popupopen', () => {
            route.addEventListener('click', () => {
  
              myMap.eachLayer((layer) => {
                myMap.removeLayer(layer);
              });
              myMap.addLayer(tile);
              if (!navigator.geolocation) console.log("Geolocation is not supported by your browser!")
              else {
                navigator.geolocation.getCurrentPosition((position) => {
  
  
                  routerControl.setWaypoints([L.latLng(position.coords.latitude, position.coords.longitude),
                  L.latLng(lat, lon)]).addTo(myMap);
                })
              }
            });
            info.addEventListener("click", () => {
              displayInfo(element);
            });
          });
  
          switch (gemeente) {
            case "Antwerpen":
              antwerpenLayer.addLayer(marker);
              break;
            case "Berchem (Antwerpen)":
              marker.addTo(berchemLayer);
              break;
            case "Borgerhout (Antwerpen)":
              marker.addTo(borgerhoutLayer);
              break;
            case "Berendrecht(Antwerpen)":
              marker.addTo(bezaliLayer);
              break;
            case "Zandvliet (Antwerpen)":
              marker.addTo(bezaliLayer);
              break;
            case "Lillo (Antwerpen)":
              marker.addTo(bezaliLayer);
              break;
            case "BeZaLi (Antwerpen)":
              marker.addTo(bezaliLayer);
              break;
            case "Ekeren (Antwerpen)":
              marker.addTo(ekerenLayer);
              break;
            case "Hoboken (Antwerpen)":
              marker.addTo(hobokenLayer);
              break;
            case "Merksem (Antwerpen)":
              marker.addTo(merksemLayer);
              break;
            case "Wilrijk (Antwerpen)":
              marker.addTo(wilrijkLayer);
              break;
            case "Edegem":
              marker.addTo(edegemLayer);
              break;
            case "Deurne (Antwerpen)":
              marker.addTo(deurneLayer);
              break;
            default:
              break;
          }
  
        });

      })})
  
      if (i == 0) {
  
  
        cultuur = {
          "Antwerpen": antwerpenLayer,
          "Berchem": berchemLayer,
          "Borgerhout": borgerhoutLayer,
          "Bezali": bezaliLayer,
          "Deurne": deurneLayer,
          "Ekeren": ekerenLayer,
          "Hoboken": hobokenLayer,
          "Merksem": merksemLayer,
          "Wilrijk": wilrijkLayer,
          "Edegem": edegemLayer
        }
  
  
      }
      else {
  
        erfgoed = {
          "Antwerpen": antwerpenLayer,
          "Berchem": berchemLayer,
          "Borgerhout": borgerhoutLayer,
          "Bezali": bezaliLayer,
          "Deurne": deurneLayer,
          "Ekeren": ekerenLayer,
          "Hoboken": hobokenLayer,
          "Merksem": merksemLayer,
          "Wilrijk": wilrijkLayer,
          "Edegem": edegemLayer
        }
      }
  
  
    }
    erfgoedControl = L.control.layers(basemaps, erfgoed);
  
    cultuurControl = L.control.layers(basemaps, cultuur);
  
  }




let displayInfo=(element)=> {

    let locatie = element.attributes;

    //creatie elementen
    let naam = document.createElement("p");
    let adres = document.createElement("p");
    let postcodeGemeente = document.createElement("p");
    let email = document.createElement("p");
    let site = document.createElement("p");
    let telefoon = document.createElement("p");


    //toewijzing van waarde

    naam.textContent = locatie.naam;
    adres.textContent = `${locatie.straat} ${locatie.huisnr}`
    postcodeGemeente.textContent = `${locatie.postcode} ${locatie.gemeente}`
    if (locatie.email == undefined) { email.textContent = "Geen Email adres"; }
    else { email.textContent = locatie.email; }

    if (locatie.link == null) site.textContent = "Geen website";
    else site.textContent = locatie.link;

    if (locatie.telefoon == undefined) telefoon.textContent = "Geen telefoonnummer";
    else { telefoon.textContent = locatie.telefoon; }


    alert(`${naam.textContent}\n${adres.textContent}\n${postcodeGemeente.textContent}\n${site.textContent}\n${telefoon.textContent}\n${email.textContent}\n`);
};


fillLayers();
initMap();

checkMap();
