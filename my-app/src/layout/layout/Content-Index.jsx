import '../../assets/styles/Content/ContentMain.css';
import ContentIntroduction from '../../components/C-Content/Content-introduction.jsx';
import ContentModels from '../../components/C-Content/Content-Models.jsx';
import ContentFour from '../../components/C-Content/Content-four.jsx';
import ContentFirst from '../../components/C-Content/Content-firt.jsx';
import ContentSix from '../../components/C-Content/Content-six.jsx';
import ContentSeven from '../../components/C-Content/Content-seven.jsx';

function Content() {

    return (
        <div className="content-container">
            <ContentIntroduction />
            <ContentModels />
            <ContentFour />
            <ContentFirst />
            <ContentSix />
            <ContentSeven />
        </div>
    )
}
export default Content
