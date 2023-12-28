import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateOrder from "./pages/CreateOrder";
import Wallet from "./pages/Wallet";
import ViewAllOrders from "./pages/ViewAllOrders";
import UpdateOrder from "./pages/UpdateOrder";
import ViewOrder from "./pages/ViewOrder";
import DeleteOrder from "./pages/DeleteOrder";

import "./App.css";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null,
  });

  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account });
  };
  const router = createBrowserRouter([
    { path: "/", element: <Wallet saveState={saveState} /> },
    { path: "/view-all-orders", element: <ViewAllOrders /> },
    { path: "/create-order", element: <CreateOrder state={state} /> },
    { path: "/view-task", element: <ViewOrder /> },
    { path: "/update-order", element: <UpdateOrder state={state} /> },
    { path: "/delete-task", element: <DeleteOrder state={state} /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
