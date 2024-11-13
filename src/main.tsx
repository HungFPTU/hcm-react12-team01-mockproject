import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContent";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Provider } from "react-redux";
import { store } from "./app/store"; // Ensure this path is correct

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
