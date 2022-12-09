import { CategoryProvider } from "../../contexts/CategoryContext";
import { TodoProvider } from "../../contexts/TodoConext";
import { UserProvider } from "../../contexts/UserContext";
import { PathStateProvider } from '../../contexts/PathContext'
import  Home  from './Home'

function App() {
  return (
    <>
      <TodoProvider>
        <UserProvider>
          <CategoryProvider>
            <PathStateProvider>
              <Home/>
            </PathStateProvider>
          </CategoryProvider>
        </UserProvider>
      </TodoProvider>
    </>
  );
}

export default App;
