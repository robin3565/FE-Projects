import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { PostProvider } from "../context/postContext";
import { AuthProvider } from "../context/authContext";

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
