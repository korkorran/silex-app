import { Stage, Layer, Rect, Group} from 'react-konva';
import { FaGithub } from "react-icons/fa";
import { BLOCK_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, SNAKE_INITIAL_LENGTH } from './constant';
import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { IFrame } from 'konva/lib/types';
import { Rect as RectType } from 'konva/lib/shapes/Rect';
import { GameState } from './gameState';
import { Layer as LayerType} from 'konva/lib/Layer';
import { Stage as StageType} from 'konva/lib/Stage';
import { Group as GroupType } from 'konva/lib/Group';
import './SnakeGame.scss'
import { Fruit } from './fruit';
import { Text } from 'konva/lib/shapes/Text';



const SnakeGame = () => {

  const stageRef = useRef<StageType>(null)
  const layerRef = useRef<LayerType>(null)
  const stateRef = useRef<GameState>(new GameState())
  const lastFrameDraw = useRef(0);

  function animate(frame?:IFrame) {
    const frameDraw = Math.floor(frame!.time/500) 
    if (frameDraw !== lastFrameDraw.current && !stateRef.current.game_over) {
      lastFrameDraw.current = frameDraw
      stateRef.current.snake.move();
      stateRef.current.snake.dir_lock = false;
      // if snake eat fruit
      if(stateRef.current.snake.collide(stateRef.current.freeFruit.x, stateRef.current.freeFruit.y)) {
        console.log('collide');
        stateRef.current.snake.length += 1;
        stateRef.current.freeFruit = new Fruit();
        stageRef.current?.findOne('#fruit')?.destroy();
        layerRef.current?.add(new RectType({
          x: stateRef.current.freeFruit.x,
          y: stateRef.current.freeFruit.y,
          width: BLOCK_SIZE,
          height: BLOCK_SIZE,
          fill: 'green',
          id: 'fruit'
        }))
      }
      // if snake collide with himself
      if(stateRef.current.snake.collide(stateRef.current.snake.x, stateRef.current.snake.y)) {
        stateRef.current.game_over = true;
        stageRef.current?.findOne('#fruit')?.destroy();
        stageRef.current?.findOne('#snake')?.destroy();
        const game_over = new Text({
          x: (CANVAS_WIDTH / 2) - 55,
          y: (CANVAS_HEIGHT / 2) - 20,
          text : 'GAME OVER',
          fontSize: 20,
          fontFamily: 'Calibri',
          fill: 'gray'
        });
        const score = new Text({
          x: (CANVAS_WIDTH / 2) - 60,
          y: (CANVAS_HEIGHT / 2) + 10,
          text : `Your score is : ${(stateRef.current.snake.length - SNAKE_INITIAL_LENGTH)*10}`,
          fontSize: 20,
          fontFamily: 'Calibri',
          fill: 'gray'
        });
        layerRef.current?.add(game_over);
        layerRef.current?.add(score)
      }
      // redraw snake
      stageRef.current?.findOne('#snake')?.destroy();
      const snake = new GroupType({id:'snake'});
      stateRef.current.snake.tail.forEach(square => {
        snake.add(new RectType({
          x: square.x,
          y: square.y,
          width: BLOCK_SIZE,
          height: BLOCK_SIZE,
          fill: 'red'
        }))
      })
      layerRef.current?.add(snake)
    }
  };

  useEffect(() => {

    const anim = new Konva.Animation(animate, layerRef.current);

    anim.start();

    const container = stageRef.current?.container();
    container!.tabIndex= 1;
    container?.focus();

    container!.addEventListener('keydown', function (e) {
      if (e.keyCode === 37) {
        stateRef.current.snake.turn('left');
      } else if (e.keyCode === 38) {
        stateRef.current.snake.turn('up');
      } else if (e.keyCode === 39) {
        stateRef.current.snake.turn('right');
      } else if (e.keyCode === 40) {
        stateRef.current.snake.turn('down');
      } else {
        return;
      }
      e.preventDefault();
    });

    return () => {
      anim.stop();
    };
  }, []);


  return (
    <div className='container'>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={stageRef} >
        <Layer ref={layerRef}>
          <Rect x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill='black' />
          <Rect x={stateRef.current.freeFruit.x} y={stateRef.current.freeFruit.y} width={10} height={10} fill='green' id='fruit' />
          <Group id='snake'>
            {stateRef.current.snake.tail.map(square => (
              <Rect x={square.x} y={square.y} width={BLOCK_SIZE} height={BLOCK_SIZE} fill='red' />
            ))}
          </Group>
        </Layer>
      </Stage>
      <p><b>Instructions : </b> Use arrows keys to conduct snake <a href='https://github.com/frederic-lang/awesome-konva-react-demos/blob/master/src/demos/snake' target='_blank'><FaGithub /></a></p>
    </div>
  );
};

export default SnakeGame;
