import { Layer as LayerType } from 'konva/lib/Layer';
import { Util } from 'konva/lib/Util';
import { Arrow as ArrowType } from 'konva/lib/shapes/Arrow';
import { Vector2d } from 'konva/lib/types';
import { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { GiAxeSword, GiAppleSeeds, GiAxeInStump } from "react-icons/gi";
import { Stage, Layer,Circle, Arrow, Group} from 'react-konva';
import { Html } from 'react-konva-utils';

function generateTargets() {
  return [...Array(10)].map((_, i) => ({
    id: 'target-' + i.toString(),
    x: Math.random() * (window.innerWidth-300),
    y: Math.random() * (window.innerHeight - 200),
    color: Util.getRandomColor(),
    radius: 20 + (Math.random() * 20),
    icon: <GiAxeSword />
  }));
}

const INITIAL_CIRCLES = generateTargets();

INITIAL_CIRCLES[1].icon = <GiAppleSeeds />
INITIAL_CIRCLES[2].icon = <GiAxeInStump />
INITIAL_CIRCLES[3].icon = <GiAppleSeeds />
INITIAL_CIRCLES[4].icon = <GiAxeInStump />
INITIAL_CIRCLES[5].icon = <GiAppleSeeds />
INITIAL_CIRCLES[6].icon = <GiAxeInStump />
INITIAL_CIRCLES[7].icon = <GiAppleSeeds />


function generateConnectors() {
  const number = 10;
  const result = [];
  while (result.length < number) {
    const from = 'target-' + Math.floor(Math.random() * INITIAL_CIRCLES.length);
    const to = 'target-' + Math.floor(Math.random() * INITIAL_CIRCLES.length);
    if(from == to) {
      continue;
    }
    result.push({
      id: 'connector-' + result.length,
      from,
      to
    })
  }
  return result;
}

function getConnectorPoints(from: Vector2d, to: Vector2d) {
  const dx = to.x -from.x;
  const dy = to.y - from.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 50;
  return [
    from.x + -radius*Math.cos(angle + Math.PI),
    from.y + radius*Math.sin(angle+Math.PI),
    to.x+ -radius * Math.cos(angle),
    to.y+ radius* Math.sin(angle)
  ]
}

const INITIAL_CONNECTORS = generateConnectors();


const ConnectCirclesBoard = () => {
  const [circles] = useState(INITIAL_CIRCLES);
  const [connectors] = useState(INITIAL_CONNECTORS)
  const layerRef = useRef<LayerType | null>(null);


  function updateObjects() {
    connectors.forEach((connect) => {
      const line = layerRef.current!.findOne<ArrowType>('#' + connect.id);
      const fromNode = layerRef.current!.findOne('#' + connect.from);
      const toNode = layerRef.current!.findOne('#' + connect.to);

      const points = getConnectorPoints(
        fromNode!.position(),
        toNode!.position()
      );
      line!.points(points);
    });
  }

  useEffect(()=> { updateObjects()}, [])

  return (
    <>
    <Stage width={window.innerWidth - 300} height={window.innerHeight - 200}>
      <Layer ref={layerRef}>
        {circles.map((circle) => ( 
          <Group
            key={circle.id}
            id={circle.id}
            x={circle.x}
            y={circle.y}
            onDragMove={updateObjects}
            draggable
            >
            <Circle
              radius={circle.radius}
              fill={circle.color}
              opacity={0.8}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              />
            <Html
              divProps={{style:{
                "pointerEvents":"none",
                "translate" : "-15px -15px"
                }}}>
              {circle.icon}
            </Html>
          </Group>
        ))}
        {connectors.map(connector=> (
          <Arrow
            key={connector.id}
            stroke='black'
            id={connector.id}
            fill='black'
            points={[]} />
        ))}
      </Layer>
    </Stage>
    <p><b>Instructions : </b> Drag a circle and see connectors position update. <a href='https://github.com/frederic-lang/awesome-konva-react-demos/blob/master/src/demos/connect-circles/ConnectCirclesBoard.tsx' target='_blank'><FaGithub /></a></p>
    </>
  );
};

export default ConnectCirclesBoard;
