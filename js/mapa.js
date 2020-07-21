const api = config.API_KEY;
let municipiosSelect = document.querySelector("#municipios-select");

/**
 * Creación del mapa
 */
var mymap = L.map('miMapa').setView([28.337503, -16.624173], 10);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${api}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

/**
 * Extracción de datos del archivo JSON
 */
const misComercios = JSON.parse(localStorage.getItem("data"));
const miData = Object.values(misComercios[0].features);

let coordinadas = miData.map(d => d.geometry.coordinates.reverse());
const nombre = miData.map(d => d.properties.nombre);
const cpostal = miData.map(d => d.properties.cp);
const cMunicipio = miData.map(d => d.properties.mun);

/** 
 * Creación de icono alternativo
 */
let greenIcon = L.icon({
    iconUrl: 'icon/comercio.png',

    iconSize: [40, 40] // tamaño del icono
});

/**
 * Añade municipios al select
 */
function addMunicipios() {
    let municipiosKeys = Object.keys(codigoMunicipio);
    let municipiosValues = Object.values(codigoMunicipio);

    for (let i = 0; i < municipiosKeys.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = municipiosKeys[i];
        option.value = municipiosValues[i];
        municipiosSelect.appendChild(option);
    }
}

function pintarCoordenadas() {

    let cpIntroducido = document.querySelector("#codigo-postal").value;
    let buscarNombre = document.querySelector("#buscar-nombre").value;
    let municipioSeleccionado = municipiosSelect.value;
    
    for (let i = 0; i < coordinadas.length; i++) {
        //buca por nombre
        if ((nombre[i].toLowerCase()).includes(buscarNombre.toLowerCase())) {
            if(buscarNombre != "") {
                L.marker(coordinadas[i],
                    { icon: greenIcon })
                    .addTo(mymap)
                    .bindPopup(nombre[i])
                }
        }

        //bucamunicipio select
        if (municipioSeleccionado == cMunicipio[i]) {
            L.marker(coordinadas[i],
                { icon: greenIcon })
                .addTo(mymap)
                .bindPopup(nombre[i])
        }

        //busca por codigo postal
        if (cpIntroducido == cpostal[i]) {
            L.marker(coordinadas[i],
                { icon: greenIcon })
                .addTo(mymap)
                .bindPopup(nombre[i])
        }
    }

}

function busquedaCodigoPostal() {
    document.getElementById("formulario").onsubmit = function () {
        pintarCoordenadas();
        return false; //evita reload
    };
}

addMunicipios();
busquedaCodigoPostal();