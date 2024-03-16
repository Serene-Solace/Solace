import "./Home.css";
import Navbar from "./Navbar.tsx";
import UploadPage from "./tab/uploadPage.tsx";
import About from "./tab/about.tsx";

const Home = () => {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <About />
      break;
    case "/about":
      component = <About />
      break;
    case "/upload":
      component = <UploadPage />
      break;
  }
  return (
    <>
      <Navbar />
      {component}
    </>
  )
}

export default Home;