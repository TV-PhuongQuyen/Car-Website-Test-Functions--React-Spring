import React, { useState, useEffect } from "react";
import ButtonContent from "../C-From/Button.jsx";

const texts = [
    { p: "REVUELTO & RUBEN DIAS", h2: "PERFORMANCE AND PRECISION" },
    { p: "HURACAN EVO", h2: "POWER AND STYLE" },
    { p: "AVENTADOR S", h2: "ICONIC DESIGN" },
];
function BarIndicator() {
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSelected(prev => (prev + 1) % texts.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [selected]);

    return (
        <div className="content-overlay-container">
            <div>
                <p key={selected + "-p"} className="fade-in">{texts[selected].p}</p>
                <h2 key={selected + "-h2"} className="fade-in">{texts[selected].h2}</h2>
            </div>
            <div className='content-buttons'>
                <div className="fade-in">
                    <ButtonContent title="DISCOVER NOW !" />
                </div>
                <div className="bar-container">
                    {texts.map((item, index) => (
                        <div
                            key={index}
                            className={`bar${selected === index ? " active" : ""}`}
                            onClick={() => setSelected(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BarIndicator;