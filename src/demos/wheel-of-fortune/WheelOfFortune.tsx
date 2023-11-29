import { Stage, Layer, Group, Text, Wedge } from 'react-konva';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Group as GroupType } from 'konva/lib/Group';
import WheelWedge from './WheelWedge';

Konva.angleDeg = false;


/* 
    // add listeners to container
    stage.addEventListener(
        'mouseup touchend',
        function () {
        controlled = false;
        angularVelocity = getAverageAngularVelocity() * 5;

        if (angularVelocity > 20) {
            angularVelocity = 20;
        } else if (angularVelocity < -20) {
            angularVelocity = -20;
        }

        angularVelocities = [];
        },
        false
    );

    stage.addEventListener(
        'mousemove touchmove',
        function (evt) {
        var mousePos = stage.getPointerPosition();
        if (controlled && mousePos && target) {
            var x = mousePos.x - wheel.getX();
            var y = mousePos.y - wheel.getY();
            var atan = Math.atan(y / x);
            var rotation = x >= 0 ? atan : atan + Math.PI;
            var targetGroup = target.getParent();

            wheel.rotation(
            rotation - targetGroup.startRotation - target.angle() / 2
            );
        }
        },
        false
    );

    var anim = new Konva.Animation(animate, layer);

    // wait one second and then spin the wheel
    setTimeout(function () {
        anim.start();
    }, 1000);
} */

const WheelOfFortune = () => {

    const width = window.innerWidth - 260;
    const height = window.innerHeight;
    const wheelRef = useRef<GroupType>(null);
    const layerRef = useRef(null);
    const pointerRef = useRef(null);
    const stageRef = useRef(null);
    const activeWedgeRef = useRef(null);

    const angularVelocity = useRef(1);
    const angularVelocities = useRef< number[]>([]);
    const lastRotation = useRef(0);
    const numWedges = 25;
    const angularFriction = 0.4;
    const finished = useRef(false);

/*     const onMouseDownWheel = (evt) => {
        angularVelocity.current = 0;
        controlled.current = true;
        target.current = evt.target;
        finished.current = false;
    }

    const onMouseUpStage = () => {
        controlled.current = false;
        angularVelocity.current = getAverageAngularVelocity() * 5;

        if (angularVelocity.current > 20) {
            angularVelocity.current = 20;
        } else if (angularVelocity.current < -20) {
            angularVelocity.current = -20;
        }

        angularVelocities.current = [];
    };

    const onMouseMoveStage = (evt) => {
        const mousePos = stageRef.current!.getPointerPosition();
        if (controlled.current && mousePos && target.current) {
            const x = mousePos.x - wheelRef.current!.getX();
            const y = mousePos.y - wheelRef.current!.getY();
            const atan = Math.atan(y / x);
            const rotation = x >= 0 ? atan : atan + Math.PI;
            const targetGroup = target.current.getParent();

            wheelRef.current!.rotation(
                rotation - targetGroup.startRotation - target.current.angle() / 2
            );
        }
    }; */

    /* function getAverageAngularVelocity() {
        var total = 0;
        var len = angularVelocities.current.length;
        if (len === 0) {
            return 0;
        }
        for (var n = 0; n < len; n++) {
            total += angularVelocities.current[n];
        }
        return total / len;
    } */


    function animate(frame) {
        // handle wheel spin
        const angularVelocityChange =
            (angularVelocity.current * frame.timeDiff * (1 - angularFriction)) / 1000;
        angularVelocity.current -= angularVelocityChange;

        // activate / deactivate wedges based on point intersection
        const shape = stageRef.current!.getIntersection({
            x: stageRef.current!.width() / 2,
            y: 100,
        });

        const diff = (frame.timeDiff * angularVelocity.current) / 1000;
        if (diff > 0.0001) {
        wheelRef.current!.rotate(diff);
        } else if (!finished.current) {
            if (shape) {
                const text = shape.getParent().findOne('Text').text();
                const price = text.split('\n').join('');
                alert('Your price is ' + price);
            }
            angularVelocity.current = 0;
            finished.current = true;
        }

        lastRotation.current = wheelRef.current!.rotation();

        if (shape) {
            if (shape && (!activeWedgeRef.current || shape._id !== activeWedgeRef.current!._id)) {
            pointerRef.current!.y(20);

            new Konva.Tween({
                node: pointerRef.current!,
                duration: 0.3,
                y: 30,
                easing: Konva.Easings.ElasticEaseOut,
            }).play();

            if (activeWedgeRef.current) {
                activeWedgeRef.current.fillPriority('radial-gradient');
            }
            shape.fillPriority('fill');
            activeWedgeRef.current = shape;
            }
        }
        console.log(wheelRun);
    }

    const [wheelRun, setWheelRun] = useState(0);

  useEffect(() => {
    /* var period = 300; */

    var anim = new Konva.Animation(animate, wheelRef.current!.getLayer());

    anim.start();
    return () => {
      anim.stop();
    };
  }, [wheelRun]);

  return (
    <>
{/*     <div className="card">
        <button onClick={() => setWheelRun(wr => wr+1)}>
        Turn Wheel
        </button>
    </div> */}
    <Stage 
        width={width} 
        height={height-100} 
        ref={stageRef}
/*         onMouseUp={onMouseUpStage}
        onTouchEnd={onMouseUpStage}
        onMouseMove={onMouseMoveStage}
        onTouchMove={onMouseMoveStage} */
        >
      <Layer ref={layerRef}>
        {/* Wheel */}
        <Group 
          x= {width / 2} 
          y={410} 
          ref={wheelRef}
/*           onMouseDown={onMouseDownWheel}
          onTouchStart={onMouseDownWheel} */
          >
            { Array(numWedges).fill(0).map((_,i) => (
                <WheelWedge n={i} key={i} numWedges={numWedges}/>
            ))}
        </Group>
        {/* Pointer */}
        <Wedge
            fillRadialGradientStartPointX={0}
            fillRadialGradientStartRadius={0}
            fillRadialGradientEndPointX={0}
            fillRadialGradientEndRadius={30}
            fillRadialGradientColorStops={[0, 'white', 1, 'red']}
            stroke={'white'}
            strokeWidth={2}
            lineJoin={'round'}
            angle={1}
            radius={30}
            x={width / 2}
            y={33}
            rotation={-90}
            shadowColor={'black'}
            shadowOffsetX={3}
            shadowOffsetY={3}
            shadowBlur={2}
            shadowOpacity={0.5}
            ref={pointerRef}
        />
      </Layer>
    </Stage>
    </>
  );
};

export default WheelOfFortune;
