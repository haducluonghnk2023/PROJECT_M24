import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../styles/user/carousel.scss";
export default function CarouselComponent() {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      showThumbs={false}
      showStatus={false}
    >
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ptit-b42bf.appspot.com/o/images%2Fanh10.jpg?alt=media&token=be323c70-9d79-45a2-89d4-503e58db9fab"
          alt="Slide 3"
        />
        <p className="legend">Slide 1</p>
      </div>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ptit-b42bf.appspot.com/o/images%2Fanhthi.png?alt=media&token=a7c9d83a-c59a-40d2-8409-ea9b64cea632"
          alt="Slide 2"
        />
        <p className="legend">Slide 2</p>
      </div>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ptit-b42bf.appspot.com/o/images%2Fthicu.jpg?alt=media&token=154abf9f-c642-4af5-bca8-0b837bb1bc32"
          alt="Slide 1"
        />
        <p className="legend">Slide 3</p>
      </div>
    </Carousel>
  );
}
