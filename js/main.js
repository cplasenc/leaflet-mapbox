const api = config.API_KEY;
let municipiosSelect = document.querySelector('#municipios-select');
let contador = 0;

/**
 * Creación del mapa
 */
var map = L.map('miMapa').setView([28.337503, -16.624173], 10);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${api}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

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

/**
 * Dibujar la información en el mapa según el input del usuario
 */
var layerGroup = L.layerGroup();
const pintarCoordenadas = () => {

    let cpIntroducido = document.querySelector('#codigo-postal').value;
    let buscarNombre = document.querySelector('#buscar-nombre').value;
    let municipioSeleccionado = document.querySelector('#municipios-select').value;

    map.addLayer(layerGroup);

    for (let i = 0; i < coordenadas.length; i++) {
        //buca por nombre
        if ((nombre[i].toLowerCase()).includes(buscarNombre.toLowerCase())) {
            if (buscarNombre != '') {
                marker = L.marker(coordenadas[i], { icon: greenIcon })
                layerGroup.addLayer(marker);
                contador++;
            }
        }

        //bucamunicipio select
        if (municipioSeleccionado == cMunicipio[i]) {
            marker = L.marker(coordenadas[i],
                { icon: greenIcon })
                .addTo(map)
                .bindPopup(nombre[i])
            layerGroup.addLayer(marker);
            contador++;
        }

        //busca por codigo postal
        if (cpIntroducido == cpostal[i]) {
            marker = L.marker(coordenadas[i],
                { icon: greenIcon })
                .addTo(map)
                .bindPopup(nombre[i])
            layerGroup.addLayer(marker);
            contador++;
        }
    }
    console.log(contador);
}

/**
 * Ejecuta la funcion pintarCoordenadas
 */
const search = () => {
    document.getElementById('formulario').addEventListener('submit', (e) => {
        e.preventDefault();
        if (contador > 0) {
            borrarLayer();
        }
        pintarCoordenadas()
    });
}

/**
 * Borra los marcadores del layerGroup
 */
const borrarLayer = () => {
    layerGroup.clearLayers();
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

getData();
addMunicipios();
search();