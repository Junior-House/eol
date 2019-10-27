import React from 'react';
import mapboxgl from 'mapbox-gl';

import mapStyle from './map-style-basic-v8.json'
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends React.Component {
    componentDidMount() {
        mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: mapStyle
        });
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {
        const style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%'
        };

        return <div style={style} ref={el => this.mapContainer = el} />;
    }
}


export default Map;