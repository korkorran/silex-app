import { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import PostIt from './PostIt';
import { FaGithub } from 'react-icons/fa';




const initialRectangles = [
  {
    x: 100,
    y: 100,
    text: 'Some text here',
    fontSize: 20,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
  },
];

const PostItBoard = () => {
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState<string>();

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(undefined);
    }
  };

  return (
    <>
    <Stage
      width={window.innerWidth - 280}
      height={window.innerHeight - 100}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <PostIt
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs: any) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
    <p><b>Instructions : </b> Click on post-it and resize/rotate shape. <a href='https://github.com/frederic-lang/awesome-konva-react-demos/tree/master/src/demos/post-it' target='_blank'><FaGithub /></a></p>
    </>
  );
};

export default PostItBoard;
