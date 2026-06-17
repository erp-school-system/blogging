import Navbar from "./Navbar";
import AdSlot from "./AdSlot";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>

      <AdSlot
        id="div-gpt-ad-sticky-footer"
        className="ad-banner sticky-footer-ad"
        label="Sponsored"
      />
    </>
  );
};

export default Layout;
