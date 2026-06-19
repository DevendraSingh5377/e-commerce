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
    <>
      <Navbar />

      <PageContainer
        fluid={isHomePage}
      >
        {children}
      </PageContainer>

      <Footer />
    </>
  );
};

export default MainLayout;