import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterComponent from "./component/register";
import LoginComponent from "./component/login";
//import HomeComponent from "./component/home/index";
import ProductComponent from "./component/product/index";
import DetailProductComponent from './component/detailProduct/index';
import UserComponent from './component/users/index';
import UserComponentEdit from './component/users/edit';
import CartComponent from './component/cart/index';
import CartSaveComponent from './component/cart/save';

const router = createBrowserRouter([
  {
    path : "/",
    element: <LoginComponent/>
  },
  {
    path : "/user/edit/:id",
    element :<UserComponentEdit />
  },
  {
    path : "/login",
    element: <LoginComponent/>
  },
  {
    path : "/register",
    element: <RegisterComponent/>
  },
  {
    path: "/product/:id",
    element: <DetailProductComponent />,
  },
  {
    path: "/product",
    element: <ProductComponent/>,
  }
  ,{
    path : "/user/:id",
    element: <UserComponent/>
  }
  ,{
    path : "/cart",
    element: <CartComponent/>
  }  
  ,{
    path : "/cart/save",
    element: <CartSaveComponent/>
  }    
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);