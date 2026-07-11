import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SolutionsPage from "./pages/SolutionsPage";
import SolutionDetailPage from "./pages/SolutionDetailPage";
import OurWorkPage from "./pages/OurWorkPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ClientsPage from "./pages/ClientsPage";
import ProcessPage from "./pages/ProcessPage";
import CataloguePage from "./pages/CataloguePage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/our-work/:slug" element={<ProjectDetailPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
