import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import Books from "../Pages/Books/Books";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import PrivateRoute from "./PrivateRoute";
import PleaseLogin from "../Pages/Login/PleaseLogin";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddBooks from "../Pages/Dashboard/AdminDashboard/AddBooks";
import OrderList from "../Pages/Dashboard/AdminDashboard/OrderList";
import ManageBooks from "../Pages/Dashboard/AdminDashboard/ManageBooks";
import Stats from "../Pages/Dashboard/AdminDashboard/Stats";
import SingleBook from "../Pages/Books/SingleBook";
import Message from "../Pages/Dashboard/AdminDashboard/Message";
import ManageAuthor from "../Pages/Dashboard/AdminDashboard/ManageAuthor";
import MyOrders from "../Pages/Dashboard/UserDashboard/MyOrders";
import Cart from "../Pages/Cart/Cart";
import Bkash from "../Pages/Cart/Bkash";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/books",
                element: <Books/>,
            },
            {
                path: "/book/:id",
                element: <PrivateRoute><SingleBook /></PrivateRoute>,
                loader: async ({ params }) => fetch(`http://localhost:5000/allBooks/${params.id}`),
            },
            
            {
                path: "/about",
                element:<About />, 
            },
            
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/pleaseLogin",
                element: <PleaseLogin />,
            },
            {
                path: "/register",
                element: <Register />,
            },

            {
                path: "/cart", 
                element: <Cart />,
            },

            {
                path: "/bkash",
                element: <Bkash />,
            },


        ]
    },

    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            {
                path: "DashboardHome",
                element: <DashboardHome/>
            },
            {
                path: "AddBooks",
                element: <AddBooks />
            },
            {
                path: "OrderList",
                element: <OrderList />
            },
            {
                path: "ManageBooks",
                element: <ManageBooks />
            },
            {
                path: "Stats",
                element: <Stats />
            },
            {
                path: "Message",
                element: <Message />
            },
            {
                path: "ManageAuthor",
                element: <ManageAuthor />
            },


            // User
            {
                path: "MyOrders",
                element: <MyOrders />
            },
        ]
    }



])