mapboxgl.accessToken = mapToken;
const cmp = JSON.parse(campground);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: cmp.geometry.coordinates,
    zoom: 10, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(cmp.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${cmp.title}</h3><p>${cmp.location}</p>`
            )
    )
    .addTo(map)