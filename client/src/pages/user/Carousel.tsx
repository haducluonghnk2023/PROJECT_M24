import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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
        <img src="https://via.placeholder.com/800x300" alt="Slide 1" />
        <p className="legend">Slide 1</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/800x300" alt="Slide 2" />
        <p className="legend">Slide 2</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/800x300" alt="Slide 3" />
        <p className="legend">Slide 3</p>
      </div>
    </Carousel>
  );
}
