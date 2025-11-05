import '../../assets/styles/Content/ContentModels.css';
import ButtonContent from "../C-From/Button.jsx";
import NewCar from '../../assets/images/New car.jpg';
import "../../assets/styles/Content/ContentSix.css";
function ContentSix() {
    return (
        <div>
            <div className='content-two'>
                <h2>News car world</h2>
                <div><ButtonContent
                    title="RED MORE!"
                /></div>
            </div>
            <div className='content-six-image'>
                <img src={NewCar} alt="New Car" />
            </div>
            <div className='content-six-text'>
                <div className='content-six-text-buttons'>
                    <div><ButtonContent
                        title="AD PERSONAM"
                    /></div>
                    <div><ButtonContent
                        title="STORIES"
                    /></div>
                </div>
                <div className='content-six-text-info'>
                    <span>11 June 2025</span>
                    <h1>Verde Scandal: the genesis of an Automobili Lamborghini color</h1>
                    <p>Combined energy consumption: 10,1 kWh/100 Km plus 11,86 l/100km; Combined CO2 emissions: 276 g/km; Combined CO2 efficiency class: G; CO2 class with discharged battery: G; Combined fuel consumption with discharged battery: 17,8 l/100km</p>
                </div>
            </div>
        </div>
    );
}
export default ContentSix;