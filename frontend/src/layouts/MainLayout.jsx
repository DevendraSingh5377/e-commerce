import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageContainer from "../components/layout/PageContainer";
import { useLocation } from "react-router-dom";

const MainLayout = ({
  children,
}) => {
  const location =
    useLocation();

  const isHomePage =
    location.pathname === "/";

return (
  <div className="layout-wrapper">
    <Navbar />

    <div className="layout-content">
      <PageContainer
        fluid={isHomePage}
      >
        {children}
      </PageContainer>
    </div>

    <Footer />
  </div>
);
};

export default MainLayout;