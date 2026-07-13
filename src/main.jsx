import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// ==================CSS========================

import "./assets/css/layout.css";
import "./assets/css/components.css";
import "./assets/css/dashboard.css";
import "./assets/css/forms.css";
import "./assets/css/project.css";
import "./assets/css/theme.css";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </BrowserRouter>,
);
