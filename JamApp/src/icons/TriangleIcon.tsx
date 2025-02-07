import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface TriangleIconProps {
    width?: number;
    height?: number;
    fill?: string;
    style?: object;
}

const TriangleIcon = ({
    width = 24,
    height = 24,
    fill = 'black',
    style,
}: TriangleIconProps): JSX.Element => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
        >
            <Path
                d="M12 4L20 20H4L12 4Z"
                fill={fill}
            />
        </Svg>
    );
};

export default TriangleIcon;
