import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Carousel() {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '14px',
    slidesToShow: 1,
    speed: 500,
    dots: true,
    arrows: false,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="px-1">
          <div className="bg-amber-200 flex justify-center items-center h-[160px] rounded-xl shadow cursor-pointer">
            <h3 className="text-center">1</h3>
          </div>
        </div>
        <div className="px-1">
          <div className="bg-amber-500 flex justify-center items-center h-[160px] rounded-xl shadow cursor-pointer">
            <h3 className="text-center">2</h3>
          </div>
        </div>
        <div className="px-1">
          <div className="bg-amber-700 flex justify-center items-center h-[160px] rounded-xl shadow cursor-pointer">
            <h3 className="text-center">3</h3>
          </div>
        </div>
      </Slider>
    </div>
  );
}
