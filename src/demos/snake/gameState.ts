import { Fruit } from "./fruit.ts";
import { Snake } from "./snake.ts";

export class GameState{
  game_over: boolean;
  snake: Snake;
  freeFruit: Fruit;

  constructor(){
    this.game_over = false;
    this.snake = new Snake();
    this.freeFruit = new Fruit();
  }

  setup(){
    this.game_over = false;
    this.snake = new Snake();
    this.freeFruit = new Fruit();
  }
}

export const state = new GameState();