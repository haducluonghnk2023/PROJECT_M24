import "../../styles/user/user.scss";

import CarouselComponent from "./Carousel";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Navbar from "./Navbar";

export default function User() {
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <CarouselComponent />
      <Content></Content>
      <Footer></Footer>
    </div>
  );
}
