import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import ProductAll from './pages/ProductAll';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';

// 1. 전체 상품 페이지, 로그인 페이지, 상품 상세 페이지
// + Navigation 만들기
// 2. 전체 상품 페이지에서는 전체 상품을 볼 수 있다.
// 3. 로그인 버튼을 누르면 로그인 페이지가 나온다.
// 4. 상품 디테일을 눌렀으나, 로그인이 안되있을 경우에는 로그인 페이지가 먼저 나온다.
// 5. 로그인이 되어 있을 경우에는, 상품 디테일 페이지를 볼 수 있다.
// 6. 로그아웃 버튼을 누르면 로그아웃이 된다.
// 7. 로그아웃이 되면 상품 디테일 페이지를 볼 수 없다. (다시 로그인 페이지로 이동)
// 8. 로그인을 하면 로그아웃 아이콘이 보이고, 반대도 되어야 함.
// 9. 상품을 검색할 수 있다.

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
