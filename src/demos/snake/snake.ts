import { BLOCK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, SNAKE_INITIAL_LENGTH } from "./constant.tsx";
import { state } from "./gameState.ts"

type Direction = 'right' | 'left' | 'down' | 'up';

export class Snake {
  x:number;
  y:number;
  dir: Direction;
  speed: number;
  color: string;
  length: number;
  tail:{x:number, y:number}[];
  dir_lock: boolean;
  dirX: number;
  dirY: number;


  constructor() {
      this.x = 0;
      this.y = 0;
      this.dir = "right";
      this.dirX=1;
      this.dirY=0;
      this.turn(this.dir)
      this.color = 'red';

      this.speed = BLOCK_SIZE;
      this.length = SNAKE_INITIAL_LENGTH;
      this.tail = [];
      this.dir_lock = false;
  }

/*   draw() {
      fill(...this.color.get());
      rect(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
      //console.log(this.tail)
      this.tail.forEach(square =>
          rect(square.x, square.y, BLOCK_SIZE, BLOCK_SIZE)
      )
      this.dir_lock = false;
  } */

  move() {
      if(this.tail.length <= this.length) this.tail.push({x:this.x, y:this.y})
      if(this.tail.length > this.length) this.tail.shift();

      if(this.collide(this.x + this.dirX * this.speed, this.y + this.dirY * this.speed)) {
          this.speed = 0;
          this.color = 'red';
          state.game_over = true
          return;
      }
      else {
          this.x += this.dirX * this.speed;
          this.y += this.dirY * this.speed;
      }

      if (this.x >= CANVAS_WIDTH) this.x = 0;
      else if (this.x < 0) this.x = CANVAS_WIDTH-BLOCK_SIZE;

      if (this.y >= CANVAS_HEIGHT) this.y = 0;
      else if (this.y < 0) this.y = CANVAS_HEIGHT-BLOCK_SIZE;

      //console.log(this.x, this.y, this.collide(this.x, this.y))

      
  }

  turn(dir: Direction) {
      if(this.dir_lock) return;
      switch (dir) {
          case "up":
              if (this.dir == "down") return;
              this.dirX = 0;
              this.dirY = -1;
              break;
          case "down":
              if (this.dir == "up") return;
              this.dirX = 0;
              this.dirY = 1;
              break;
          case "left":
              if (this.dir == "right") return;
              this.dirX = -1;
              this.dirY = 0;
              break;
          case "right":
              if (this.dir == "left") return;
              this.dirX = 1;
              this.dirY = 0;
              break;
      }
      this.dir=dir;
      this.dir_lock = true;
  }

  collide(x: number, y: number) {
      let r = false
      this.tail.forEach(square =>
          { if (square.x == x && square.y == y) r=true; }
      )
      return r;
  }
}