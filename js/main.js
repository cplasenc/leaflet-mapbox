//AÑADIR A UN GROUPLAYER Y LUEGO BORRAR EL GROUP LAYER

const api = config.API_KEY;
let municipiosSelect = document.querySelector('#municipios-select');

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
 * Creación de icono alternativo
 */
let greenIcon = L.icon({
    iconUrl: 'icon/comercio.png',
    iconSize: [40, 40] //tamaño del icono
});

/**
 * Consumo de la información
 */
let nombre, coordenadas, cpostas, cMunicipo;
const getData = () => {
    fetch('js/comercios.json')
        .then(response => response.json())
        .then(response => {
            let comercios = response.features;
            nombre = comercios.map(comercio => comercio.properties.nombre)
            coordenadas = comercios.map(comercio => comercio.geometry.coordinates.reverse());
            cpostal = comercios.map(comercio => comercio.properties.cp);
            cMunicipio = comercios.map(comercio => comercio.properties.mun);
        });
}

// const getData = async () => {
//     const response = await fetch('js/comercios.json')
//     if (response.status === 200) {
//         return response.json()
//     } else {
//         throw new Error('Se ha producido un error')
//     }
// }

// let nombre, coordenadas, cpostas, cMunicipo;
// getData().then(response => {
//     let comercios = response.features;
//     nombre = comercios.map(comercio => comercio.properties.nombre)
//     coordenadas = comercios.map(comercio => comercio.geometry.coordinates.reverse());
//     cpostal = comercios.map(comercio => comercio.properties.cp);
//     cMunicipio = comercios.map(comercio => comercio.properties.mun);
//     console.log(nombre[0])
// });

/**
 * Dibujar la información en el mapa
 */
const pintarCoordenadas = () => {

    let cpIntroducido = document.querySelector('#codigo-postal').value;
    let buscarNombre = document.querySelector('#buscar-nombre').value;
    let municipioSeleccionado = document.querySelector('#municipios-select').value;

    var theMarker = {};
    for (let i = 0; i < coordenadas.length; i++) {
        //buca por nombre
        if ((nombre[i].toLowerCase()).includes(buscarNombre.toLowerCase())) {
            if (buscarNombre != '') {
                theMarker = L.marker(coordenadas[i], { icon: greenIcon }).addTo(mymap).bindPopup(nombre[i])
            }
        }

        //bucamunicipio select
        if (municipioSeleccionado == cMunicipio[i]) {
            L.marker(coordenadas[i],
                { icon: greenIcon })
                .addTo(mymap)
                .bindPopup(nombre[i])
        }

        //busca por codigo postal
        if (cpIntroducido == cpostal[i]) {
            L.marker(coordenadas[i],
                { icon: greenIcon })
                .addTo(mymap)
                .bindPopup(nombre[i])
        }
    }
}

const search = () => {
    document.getElementById('formulario').addEventListener('submit', (e) => {
        e.preventDefault();
        pintarCoordenadas();
    });
}

/**
 * Añade municipios al select
 */
const addMunicipios = () => {
    let municipiosKeys = Object.keys(codigoMunicipio);
    let municipiosValues = Object.values(codigoMunicipio);

    for (let i = 0; i < municipiosKeys.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = municipiosKeys[i];
        option.value = municipiosValues[i];
        municipiosSelect.appendChild(option);
    }
}

addMunicipios();
search();