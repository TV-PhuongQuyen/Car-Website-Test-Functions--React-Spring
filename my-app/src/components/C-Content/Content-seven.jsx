import React, { useRef } from "react";
import ButtonContent from "../C-From/Button.jsx";
import '../../assets/styles/Content/ContentSeven.css';
import dataContentSeven from '../../AIPtest/dataContentSeven.js';

function ContentSeven() {
    const containerRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDown.current = true;
        startX.current = e.pageX - containerRef.current.offsetLeft;
        scrollLeft.current = containerRef.current.scrollLeft;
        containerRef.current.style.cursor = "grabbing";
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1; // tốc độ kéo
        containerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        isDown.current = false;
        containerRef.current.style.cursor = "grab";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            className="content-seven"
            ref={containerRef}
            style={{ cursor: "grab" }}
            onMouseDown={handleMouseDown}
        >
            <div className="content_seven_container">
                {dataContentSeven.map((item, index) => (
                    <div className="content_seven_content" key={index}>
                        <div className="content_seven_image">
                            <img src={item.img} alt="New Car" />
                        </div>
                        <div className="content_seven_button_container">
                            <ButtonContent title={item.btnTitle1} />
                            <ButtonContent title={item.btnTitle2} />
                        </div>
                        <div className="content_seven_text">
                            <span className="content_seven_span">{item.span}</span>
                            <h1 className="content_seven_h1">{item.h1}</h1>
                            <p className="content_seven_p">{item.p}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentSeven;