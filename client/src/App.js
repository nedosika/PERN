import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./components/SignIn";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="*" element={<Navigate to="signin" />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
