import "./App.css";
import { RegPage } from "./containers/RegPage";
import LoginPage from "./containers/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./containers/IndexPage";
import { AddTodoForm } from "./components/form/AddTodoForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reg" element={<RegPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<IndexPage />} />
        <Route path="/todo/add" element={<AddTodoForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
