import ConnectCirclesBoard from "./demos/connect-circles/ConnectCirclesBoard";
import DragAStar from "./demos/drag-a-star/DragAStar";
import PostItBoard from "./demos/post-it/PostItBoard";
import WheelOfFortune from "./demos/wheel-of-fortune/WheelOfFortune";
import { FaPaste, FaStar } from "react-icons/fa";
import { RxColorWheel } from "react-icons/rx";
import { SlLink } from "react-icons/sl";
import dragAStarUrl from './assets/screenshot-drag-a-star.png';
import wheelOfFortuneUrl from './assets/screenshot-wheel-of-fortune.png';
import postItUrl from './assets/screenshot-post-it.png';
import connectCirclesUrl from './assets/screenshot-connect-circles.png';

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
    }
];

export const disqusSortname = 'awesome-konva-react-demos';