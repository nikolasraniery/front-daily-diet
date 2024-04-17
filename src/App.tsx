import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="w-full h-screen">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
