import bgVideo from '../../assets/sound/Gintani Equipped Lamborghini Aventador SVJ - 4K.mp4';
import BarIndicator from './BarIndicator.jsx';
import "../../assets/styles/Content/ContentIntroduction.css";
function ContentIntroduction() {
    return (
        <div className='content-introduction'>
            <video autoPlay muted loop className='background-video'>
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content-overlay">
                <BarIndicator />
            </div>
        </div>
    );
}
export default ContentIntroduction;