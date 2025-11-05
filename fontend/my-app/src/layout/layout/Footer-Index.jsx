import "../../assets/styles/Footer.css"
import logo from '../../assets/images/logosieuxe.png';
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <p>&copy; 2025 SuperCar. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <a href="#"><i className="bx bxl-facebook"></i></a>
                    <a href="#"><i className="bx bxl-instagram"></i></a>
                    <a href="#"><i className="bx bxl-youtube"></i></a>
                </div>
            </div>
            <div>
                <p>The consumption and emissions values in the website refer to your geographical IP.
                    This value might be unrealistic if you navigate using VPN or if the position of your
                    Internet provider is imprecise. If you believe you are incorrectly geolocalized,
                    contact your dealer to get valid consumption and emissions information in your area.</p>
            </div>
            <div>
                <span style={{ whiteSpace: 'pre-wrap' }}>
                    All rights reserved. VAT no. IT 00591801204
                    WARNING ABOUT ILLEGAL OFFERS OF ALLEGED SHARES OF AUTOMOBILI LAMBORGHINI S.P.A.
                    Automobili Lamborghini S.p.A. got the notice that several third parties across different countries are allegedly offering shares in Automobili
                    Lamborghini S.p.A. These offers are unlawful and originate neither from Volkswagen Aktiengesellschaft nor from any of its subsidiaries.
                </span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={logo} />
            </div>
        </footer>
    )
}
export default Footer;