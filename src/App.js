import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Login from "./pages/login";
import Main from "./pages/main";
import Detail from "./pages/detail";
import Search from "./pages/search";

/**
 * 디즈니 플러스 앱의 메인 컴포넌트
 * 네비게이션과 배너를 포함한 메인 레이아웃을 구성
 */
const Layout = () => {
  console.log("?")
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="main" element={<Main />} />
          <Route path=":movieId" element={<Detail />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
