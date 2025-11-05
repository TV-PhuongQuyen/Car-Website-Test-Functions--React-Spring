import React, { useState } from "react";
import 'boxicons/css/boxicons.min.css';
import '../../assets/styles/Content/ContentModels.css';
import ButtonContent from "../C-From/Button.jsx";
import sieuxe from '../../assets/images/sieuxe.png';
import sieuxe1 from '../../assets/images/sieuxe1.png';

const initialDataImgCar = [
    { id: 1, alt: "Car 1", image: sieuxe },
    { id: 2, alt: "Car 2", image: sieuxe1 },
    { id: 3, alt: "Car 3", image: sieuxe }
];

function ContentModels() {
    const [dataImgCar, setDataImgCar] = useState(initialDataImgCar);

    const HandClick = () => {
        setDataImgCar(prev => [...prev.slice(1), prev[0]]);
    };

    const BackClick = () => {
        setDataImgCar(prev => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    };

    return (
        <div>
            <div className='content-two'>
                <h2>Models</h2>
                <div>
                    <ButtonContent title="DISCOVER NOW !" />
                </div>
            </div>
            <div className="content-banner">
                <i id='back' className="bx bx-chevrons-left" onClick={BackClick}></i>
                <div className="content-banner-img">
                    <img
                        key={dataImgCar[0].id}
                        src={dataImgCar[0].image}
                        alt={dataImgCar[0].alt}
                        className='car'
                    />
                </div>
                <i id='next' className="bx bx-chevrons-right" onClick={HandClick}></i>
            </div>
        </div>
    );
}
export default ContentModels;