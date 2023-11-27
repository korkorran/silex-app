import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './router-error-page.tsx';
import DragAStar from './demos/drag-a-star/DragAStar.tsx';
import WheelOfFortune from './demos/wheel-of-fortune/WheelOfFortune.tsx';
import PostItBoard from './demos/post-it/PostItBoard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "drag-a-star",
        element: <DragAStar />
      },
      { 
        path: "wheel-of-fortune",
        element: <WheelOfFortune />
      },
      {
        path: 'post-it',
        element: <PostItBoard />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />  
  </React.StrictMode>,
)
