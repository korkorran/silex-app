import ConnectCirclesBoard from "./demos/connect-circles/ConnectCirclesBoard";
import DragAStar from "./demos/drag-a-star/DragAStar";
import PostItBoard from "./demos/post-it/PostItBoard";
import WheelOfFortune from "./demos/wheel-of-fortune/WheelOfFortune";
import { FaPaste, FaStar, FaCube } from "react-icons/fa";
import { RxColorWheel } from "react-icons/rx";
import { SlLink } from "react-icons/sl";
import { GiSnakeTongue } from "react-icons/gi";
import dragAStarUrl from './assets/screenshot-drag-a-star.png';
import wheelOfFortuneUrl from './assets/screenshot-wheel-of-fortune.png';
import postItUrl from './assets/screenshot-post-it.png';
import connectCirclesUrl from './assets/screenshot-connect-circles.png';
import snakeUrl from './assets/screenshot-snake.png';
import SnakeGame from "./demos/snake/SnakeGame";
import ThreeDcubesUrl from './assets/screenshot-3Dcubes.png';
import ThreeDcubes from "./demos/3Dcubes/3Dcubes";

export const demosDetails = [
    {
      path: "/demos/drag-a-star",
      element: <DragAStar />,
      title: 'Drag a Star',
      icon: <FaStar />,
      screenshotUrl: dragAStarUrl
    },
    { 
      path: "/demos/wheel-of-fortune",
      element: <WheelOfFortune />,
      title: 'Wheel of Fortune',
      icon: <RxColorWheel />,
      screenshotUrl: wheelOfFortuneUrl
    },
    {
      path: '/demos/post-it',
      element: <PostItBoard />,
      title: 'Post-it',
      icon: <FaPaste />,
      screenshotUrl: postItUrl
    },
    {
      path: '/demos/connect-circles',
      element: <ConnectCirclesBoard />,
      title: 'Connect Circles',
      icon: <SlLink />,
      screenshotUrl: connectCirclesUrl
    },
    {
      path: '/demos/snake',
      element: <SnakeGame />,
      title: 'Snake',
      icon: <GiSnakeTongue />,
      screenshotUrl: snakeUrl
    },
    {
      path: '/demos/3Dcubes',
      element: <ThreeDcubes/>,
      title: '3D Cubes',
      icon: <FaCube />,
      screenshotUrl: ThreeDcubesUrl
    }
  ]