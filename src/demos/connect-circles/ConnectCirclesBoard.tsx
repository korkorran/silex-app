import { Layer as LayerType } from 'konva/lib/Layer';
import { Util } from 'konva/lib/Util';
import { Arrow as ArrowType } from 'konva/lib/shapes/Arrow';
import { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Stage, Layer,Circle, Arrow} from 'react-konva';

function generateTargets() {
  return [...Array(10)].map((_, i) => ({
    id: 'target-' + i.toString(),
    x: Math.random() * (window.innerWidth-280),
    y: Math.random() * (window.innerHeight - 100),
    color: Util.getRandomColor(),
    radius: 20 + (Math.random() * 20)
  }));
}

const INITIAL_CIRCLES = generateTargets();

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

function getConnectorPoints(from: any, to: any) {
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
    <Stage width={window.innerWidth - 280} height={window.innerHeight - 100}>
      <Layer ref={layerRef}>
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            id={circle.id}
            x={circle.x}
            y={circle.y}
            radius={circle.radius}
            fill={circle.color}
            opacity={0.8}
            draggable
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            onDragMove={updateObjects}
          />
        ))}
        {connectors.map(connector=> (
          <Arrow
            stroke='black'
            id={connector.id}
            fill='black'
            points={getConnectorPoints(connector.from, connector.to)} />
        ))}
      </Layer>
    </Stage>
    <p><b>Instructions : </b> Drag a circle and see connectors position update. <a href='https://github.com/frederic-lang/awesome-konva-react-demos/blob/master/src/demos/connect-circles/ConnectCirclesBoard.tsx' target='_blank'><FaGithub /></a></p>
    </>
  );
};

export default ConnectCirclesBoard;
