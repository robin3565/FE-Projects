import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from '../context/authContext';
import { PostProvider } from "../context/postContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <Router />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
