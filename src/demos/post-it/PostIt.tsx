import { Context } from "konva/lib/Context";
import { Shape } from "konva/lib/Shape";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { useEffect, useRef } from "react";
import { Text, Transformer } from 'react-konva';

declare module "konva/lib/Shape" {
  interface Shape {
    _sceneFunc: (c:Context) => void
  }
};

type PostItProps = {
  shapeProps : any, isSelected : any, onSelect : any, onChange : any
}

const PostIt = ({ shapeProps, isSelected, onSelect, onChange } : PostItProps) => {
  const shapeRef = useRef<Shape>();
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current!.nodes([shapeRef.current!]);
      trRef.current!.getLayer()!.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(_) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node!.scaleX();
          const scaleY = node!.scaleY();

          // we will reset it back
          node!.scaleX(1);
          node!.scaleY(1);
          onChange({
            ...shapeProps,
            x: node!.x(),
            y: node!.y(),
            // set minimal value
            width: Math.max(5, node!.width() * scaleX),
            height: Math.max(node!.height() * scaleY),
          });
        }}
        sceneFunc={function(context, shape) {
          context.fillStyle = 'rgb(255,255,204)';
          context.fillRect(0,0,shape.width(),shape.height());
          (shape)._sceneFunc(context);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default PostIt;