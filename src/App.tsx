import { Outlet } from "react-router-dom";
import Header from "./components/header";
import FruitasticFooter from "./components/footer";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <section>
        <FruitasticFooter />
      </section>
      <Toaster richColors />
    </>
  );
}

export default App;
