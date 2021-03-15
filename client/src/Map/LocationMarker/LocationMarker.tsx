import { Icon, LatLngExpression } from 'leaflet';
import { FunctionComponent } from 'react';
import { Marker, Popup } from 'react-leaflet';
import styles from './LocationMarker.module.scss';

interface Props {
    position: LatLngExpression | null;
    message: string;
}

export const LocationMarker: FunctionComponent<Props> = (props) => {
    if (!props.position) {
        return null;
    }
    return (
        <Marker
            position={props.position}
            icon={
                new Icon({
                    iconUrl: '/images/marker-icon.png',
                    iconRetinaUrl: '/images/marker-icon-2x.png',
                    shadowUrl: '/images/marker-shadow.png',
                    className: styles.icon
                })
            }
        >
            <Popup>{props.message}</Popup>
        </Marker>
    );
};
