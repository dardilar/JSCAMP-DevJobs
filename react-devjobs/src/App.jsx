import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { Page404 } from "./pages/404.jsx";

function App() {
  const currentPath = window.location.pathname;

  let page = <Page404 />;

  if (currentPath === "/") {
    page = <HomePage />;
  } else if (currentPath === "/search") {
    page = <SearchPage />;
  }

  return (
    <>
      <Header />
      { page }
      <Footer />
    </>
  );
}

export default App;
