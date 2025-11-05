import React from "react";
import AppRoutes from "./routes/index"; 
import { Provider } from "react-redux";
import store from "./store/store"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Provider store={store}>
      <AppRoutes />

      {/*Đặt ToastContainer ở cuối cùng của app */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </Provider>
  );
}


export default App;
