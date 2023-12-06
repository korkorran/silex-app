
import { BLOCK_SIZE } from "./constant.js";

export class Fruit {
  x:number;
  y:number;
  color:string;

  constructor() {
      this.x = Math.floor(Math.random()*50)*BLOCK_SIZE;
      this.y = Math.floor(Math.random()*30)*BLOCK_SIZE;
      this.color = "green";
      //console.log(`Fruit created at ${this.x}, ${this.y}`)
  }
}