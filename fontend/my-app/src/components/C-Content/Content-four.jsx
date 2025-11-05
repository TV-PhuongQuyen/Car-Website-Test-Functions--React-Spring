import ButtonContent from "../C-From/Button.jsx";
import '../../assets/styles/Content/ContentFour.css';
function ContentFour() {
    return (
        <div className='content-four'>
            <div className="btn-temerario "><ButtonContent
                title="TEMERARIO"
            /></div>
            <div className='content-four-bottom'>
                <div className=" btn-explorer"><ButtonContent
                    title="EXPLORER THE MODELS"
                /></div>
                <div className=" btn-download">
                    <ButtonContent
                        title="DOWNLOAD THE APP"
                    />
                </div>
            </div>
            <div className="content-four-text">
                <p>Combined energy consumption: 26,8 kWh/100 Km plus 11,2 l/100km; Combined CO2 emissions:
                    272 g/km; Combined CO2 efficiency class: G; CO2 class
                    with discharged battery: G; Combined fuel consumption with
                    discharged battery: 14 l/100km</p>
            </div>
        </div>
    );
}
export default ContentFour;