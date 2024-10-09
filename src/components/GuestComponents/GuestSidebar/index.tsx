import { Carousel } from "antd";
import assets from "../../../assets/assets";  

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto', // Auto height for responsiveness
  objectFit: 'cover',
  borderRadius: "30px",
};

const carouselContainer: React.CSSProperties = {
  width: '85%', 
  margin: '18px auto',
  marginTop: '100px',
};

export default function GuestSideBar() {
  return (
    <div style={carouselContainer}>
      <Carousel arrows infinite={false} autoplay>
        <div>
          <img style={imgStyle} src={assets.petfood} alt="Pet Food" />
        </div>
        {/* <div>
          <img style={imgStyle} src={assets.petfood} alt="Pet Food" />
        </div>
        <div>
          <img style={imgStyle} src={assets.petfood} alt="Pet Food" />
        </div>
        <div>
          <img style={imgStyle} src={assets.petfood} alt="Pet Food" />
        </div> */}
      </Carousel>
    </div>
  );
}
