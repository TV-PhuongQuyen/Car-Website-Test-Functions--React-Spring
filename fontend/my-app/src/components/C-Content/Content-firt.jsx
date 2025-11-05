import "../../assets/styles/Content/ContentFirst.css";
import ButtonContent from "../C-From/Button.jsx";
function ContentFirst() {
    return (
        <div className="content-first">
            <div className="content-first-container">
                <h1>Dealer Locator</h1>
                <ButtonContent
                    title={"Find Your Dealer"}
                />
            </div>
        </div>
    );
}
export default ContentFirst;