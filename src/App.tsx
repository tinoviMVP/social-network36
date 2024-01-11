import React from "react";
import { Header } from "./components/UI/Header/Header";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";

const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<LoginPage/>
    },
    {
      path:"/main-page",
      element:<MainPage/>
    },
    {
      path:"/registration-page",
      element:<RegistrationPage/>
    },
    {
      path:"/profile-page",
      element:<ProfilePage/>
    }
  ])

  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
};

export default App;
