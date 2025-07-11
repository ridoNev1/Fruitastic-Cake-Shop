import { Outlet } from "react-router-dom";
import Header from "./components/header";
import FruitasticFooter from "./components/footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <section>
        <FruitasticFooter />
      </section>
    </>
  );
}

export default App;
