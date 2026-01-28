import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Route } from "./components/Route.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { Page404 } from "./pages/404.jsx";

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="*" component={Page404} />
      <Footer />
    </>
  );
}

export default App;
