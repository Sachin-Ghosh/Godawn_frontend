import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-10">
      {children}
      </div>
      <Footer />
    </>
  );
};
export default Layout;