import { useState } from 'react';
import {Group, Text, Wedge } from 'react-konva';

function purifyColor(color: any) {
    var randIndex = Math.round(Math.random() * 3);
    color[randIndex] = 0;
    return color;
}

function getRandomColor() {
    var r = 100 + Math.round(Math.random() * 55);
    var g = 100 + Math.round(Math.random() * 55);
    var b = 100 + Math.round(Math.random() * 55);
    return purifyColor([r, g, b]);
}

function getRandomReward() {
    var mainDigit = Math.round(Math.random() * 9);
    return mainDigit + '\n0\n0';
}

function WheelWedge(props: { n: number, numWedges: number}) {
    var [s] = useState(getRandomColor());
    var [reward] = useState(getRandomReward());
    var r = s[0];
    var g = s[1];
    var b = s[2];
    var angle = (2 * Math.PI) / props.numWedges;

    var endColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    r += 100;
    g += 100;
    b += 100;

    var startColor = 'rgb(' + r + ',' + g + ',' + b + ')';

    //wedge.startRotation = wedge.rotation();
    return (
        <Group rotation={(2 * props.n * Math.PI) / props.numWedges} >
        <Wedge
            radius={400}
            angle={angle}
            fillRadialGradientStartPointX={0}
            fillRadialGradientStartRadius={0}
            fillRadialGradientEndPointX={0}
            fillRadialGradientEndRadius={400}
            fillRadialGradientColorStops={[0, startColor, 1, endColor]}
            fill={'#64e9f8'}
            fillPriority={'radial-gradient'}
            stroke={'#ccc'}
            strokeWidth={2}
            />
        <Text
            text={reward}
            fontFamily={'Calibri'}
            fontSize={50}
            fill={ 'white'}
            align={ 'center'}
            stroke={ 'yellow'}
            strokeWidth={ 1}
            rotation={ (Math.PI + angle) / 2}
            x={ 380}
            y={ 30}
            listening={ false}
            />
        </Group>
    );
}

export default WheelWedge;