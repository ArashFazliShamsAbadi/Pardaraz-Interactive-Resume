// important requirements
import {
    osmHot,
    osm,
    Esri_WorldImagery,
    greenIcon,
    redIcon,
    goldIcon,
    blackIcon,
    orangeIcon,
    greyIcon,
    violetIcon,
    yellowIcon,
    iconRenderer,
} from './components/base_map_icons.js';
import {
    urbanprojectsEl,
    architectureprojectsEl,
    trafficprojectsEl,
    buildingsupervisionprojectsEl,
    searchbarEl,
    state,
} from './components/common.js';

import { readgeojson } from './components/fetch_base_data.js';

// raw map without any point
const basemap = L.layerGroup([osm, osmHot]);

const map = L.map('map', {
    center: [32.3353104, 53.5136114],
    zoom: 5,
    layers: [basemap]
});
L.control.scale().addTo(map);

// preparing raw data
const base_info_address = "./base_info/all_project_profiles.xlsx";

// kinds of projects
const urbanplanning = L.layerGroup();
const urbandesigning = L.layerGroup();
const historicalquarters = L.layerGroup();
const regionalplanning = L.layerGroup();
const urbanregeneration = L.layerGroup();
const architecture = L.layerGroup();
const buildingsupervision = L.layerGroup();
const traffic = L.layerGroup();

// project points and adding them to the categories
fetch(base_info_address)
    .then(response => response.arrayBuffer())
    .then(data => {
        // Convert the data to a workbook
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first sheet
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // creating points to show on the map
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].lat && jsonData[i].lng) {
                switch (jsonData[i].kind) {
                    case 'urban planning':
                        var project_point_k1 = L.marker([Number(jsonData[i].lat), Number(jsonData[i].lng)], { icon: redIcon }).addTo(urbanplanning);
                        var image_src = String(jsonData[i].img_address);
                        project_point_k1.bindPopup(`<img src=${image_src}>`);
                        break;
                    case 'urban designing':
                        var project_point_k2 = L.marker([Number(jsonData[i].lat), Number(jsonData[i].lng)], { icon: greenIcon }).addTo(urbandesigning);
                        var image_src = String(jsonData[i].img_address);
                        project_point_k2.bindPopup(`<img src=${image_src}>`);
                        break;
                    case 'regional planning':
                        var project_point_k3 = L.marker([Number(jsonData[i].lat), Number(jsonData[i].lng)], { icon: violetIcon }).addTo(regionalplanning);
                        var image_src = String(jsonData[i].img_address);
                        project_point_k3.bindPopup(`<img src=${image_src}>`);
                        break;
                    case 'urban regeneration':
                        var project_point_k4 = L.marker([Number(jsonData[i].lat), Number(jsonData[i].lng)], { icon: greyIcon }).addTo(urbanregeneration);
                        var image_src = String(jsonData[i].img_address);
                        project_point_k4.bindPopup(`<img src=${image_src}>`);
                        break;
                    case 'historical quarters conservation':
                        var project_point_k5 = L.marker([Number(jsonData[i].lat), Number(jsonData[i].lng)], { icon: goldIcon }).addTo(historicalquarters);
                        var image_src = String(jsonData[i].img_address);
                        project_point_k5.bindPopup(`<img src=${image_src}>`);
                        break;
                    case 'traffic':
                        var project_point_k6 = L.marker([Number(jsonData[i].lat), Number(jsonData[i].lng)], { icon: blackIcon }).addTo(traffic);
                        var image_src = String(jsonData[i].img_address);
                        project_point_k6.bindPopup(`<img src=${image_src}>`);
                        break;
                    case 'architecture':
                        var project_point_k7 = L.marker([Number(jsonData[i].lat), Number(jsonData[i].lng)], { icon: yellowIcon }).addTo(architecture);
                        var image_src = String(jsonData[i].img_address);
                        project_point_k7.bindPopup(`<img src=${image_src}>`);
                        break;
                    default:
                        var project_point_k8 = L.marker([Number(jsonData[i].lat), Number(jsonData[i].lng)], { icon: orangeIcon }).addTo(buildingsupervision);
                        var image_src = String(jsonData[i].img_address);
                        project_point_k8.bindPopup(`<img src=${image_src}>`);
                        break;
                }
            }
        }
    })
    .catch(error => {
        console.log(error);
    });



// map with layers
var baseMaps = {
    "<span style='color:black; font-size:12px'>OpenStreetMap</span>": osm,
    "<span style='color: black; font-size:12px'>OpenStreetMap.HOT</span>": osmHot,
    "<span style='color: black; font-size:12px'>Esri World Imagery</span>" : Esri_WorldImagery
};


var overlayMaps = {
    "<span style='color:black; font-size:12px'>Urban Planning</span>": urbanplanning,
    "<span style='color:black; font-size:12px'>Urban Designing</span>": urbandesigning,
    "<span style='color:black; font-size:12px'>Historical Quarters Conservation</span>": historicalquarters,
    "<span style='color:black; font-size:12px'>Urban Regeneration</span>": urbanregeneration,
    "<span style='color:black; font-size:12px'>Regional Planning</span>": regionalplanning,
    "<span style='color:black; font-size:12px'>Architecture</span>": architecture,
    "<span style='color:black; font-size:12px'>Building Supervision</span>": buildingsupervision,
    "<span style='color:black; font-size:12px'>Traffic</span>": traffic,
};

var layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: false, position: 'topright' }).addTo(map);


// Departments Experiences
let urbanprojects_on = true;
urbanprojectsEl.addEventListener('click', function () {
    if (urbanprojects_on) {
        urbandesigning.addTo(map);
        urbanplanning.addTo(map);
        urbanregeneration.addTo(map);
        historicalquarters.addTo(map);
        regionalplanning.addTo(map);
        urbanprojects_on = false;
    } else {
        urbandesigning.remove(map);
        urbanplanning.remove(map);
        urbanregeneration.remove(map);
        historicalquarters.remove(map);
        regionalplanning.remove(map);
        urbanprojects_on = true;
    }
});

let architectureprojects_on = true;
architectureprojectsEl.addEventListener('click', function () {
    if (architectureprojects_on) {
        architecture.addTo(map);
        architectureprojects_on = false;
    } else {
        architecture.remove(map);
        architectureprojects_on = true;
    }
});

let trafficprojects_on = true;
trafficprojectsEl.addEventListener('click', function () {
    if (trafficprojects_on) {
        traffic.addTo(map);
        trafficprojects_on = false;
    } else {
        traffic.remove(map);
        trafficprojects_on = true;
    }
});

let buidingsupervisionprojects_on = true;
buildingsupervisionprojectsEl.addEventListener('click', function () {
    if (buidingsupervisionprojects_on) {
        buildingsupervision.addTo(map);
        buidingsupervisionprojects_on = false;
    } else {
        buildingsupervision.remove(map);
        buidingsupervisionprojects_on = true;
    }
});

// Adding Legend
const legendItems = {
    'Urban Planning': L.marker([0, 0], { icon: redIcon }),
    'Urban Designing': L.marker([0, 0], { icon: greenIcon }),
    'Historical Quarters Conservation': L.marker([0, 0], { icon: goldIcon }),
    'Urban Regeneration': L.marker([0, 0], { icon: greyIcon }),
    'Regional Planning': L.marker([0, 0], { icon: violetIcon }),
    'Architecture': L.marker([0, 0], { icon: yellowIcon }),
    'Building Supervision': L.marker([0, 0], { icon: orangeIcon }),
    'Traffic': L.marker([0, 0], { icon: blackIcon }),
};

const legend = L.control.featureLegend(legendItems, {
    position: "bottomright",
    title: "Legend",
    symbolContainerSize: 40,
    symbolScaling: "clamped",
    maxSymbolSize: 20,
    minSymbolSize: 10,
    collapsed: false,
    drawShadows: true,
}).addTo(map);


// Show search results on the map
searchbarEl.addEventListener('search',
    async function loadProjects(event) {
        event.preventDefault();
        const response = await fetch(base_info_address)
            .then(response => response.arrayBuffer())
            .then(data => {
                // Convert the data to a workbook
                const workbook = XLSX.read(data, { type: "array" });

                // Get the first sheet
                const sheet = workbook.Sheets[workbook.SheetNames[0]];

                // Convert the sheet to JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // Search phrase (in persian)
                const searchPhrase = searchbarEl.value;

                // A list for storing results
                var resultslayer = state.results;

                // Finding the matched results
                for (var i = 0; i < jsonData.length; i++) {
                    if (jsonData[i].project_name.includes(searchPhrase) || jsonData[i].location.includes(searchPhrase) || jsonData[i].state.includes(searchPhrase)) {
                        var project_point = L.marker([jsonData[i].lat, jsonData[i].lng], { icon: iconRenderer(jsonData[i]) });
                        project_point.bindPopup(`<span>Name: ${jsonData[i].project_name}</span></br><span>Location: ${jsonData[i].location}</span></br><span>Department: ${jsonData[i].department}</span>`)
                        resultslayer.push(project_point);
                    } else {
                        console.log('Not Matched');
                    }
                }
                const searchedProjects = L.featureGroup(resultslayer).addTo(map);
                map.fitBounds(searchedProjects.getBounds());
                // searchbarEl.blur();
            }

            )
            .catch(error => console.error('Error loading json', error));
    }
);