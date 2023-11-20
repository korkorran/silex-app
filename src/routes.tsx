import App from "./App";
import DragAStar from "./experiments/drag-a-star/DragAStar";
import ErrorPage from "./router-error-page";

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "drag-a-star",
          element: <DragAStar />
        }
      ]
    },
  ]

export default routes;