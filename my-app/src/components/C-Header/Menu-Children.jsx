import "../../assets/styles/menuChildren.css"
import { useNavigate } from "react-router-dom";

function MenuChildren() {
    const navigate = useNavigate();
    return (
        <div className="menuChildren">
            <div className="menuChildren_container">
                <div className="menuChildren_list">
                    <div className="menuChildren_content">
                        <a href=""><div className="a_menu">MODELS</div></a>
                        <a href=""><div className="a_menu">BEYOND</div></a>
                        <a href=""><div className="a_menu">MUSEUM</div></a>
                    </div>
                    <div className="menuChildren_content">
                        <a href=""><div className="a_menu">BLOG</div></a>
                        <a href="" onClick={() => { navigate("/post") }}><div className="a_menu">POST</div></a>
                        <a href=""><div className="a_menu">STORE</div></a>
                    </div>
                    <div className="menuChildren_content">
                        <a href=""><div className="a_menu">DEALERSHIPS</div></a>
                        <a href=""><div className="a_menu">MOTORSPORT</div></a>
                        <a href=""><div className="a_menu">NEWS</div></a>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default MenuChildren;