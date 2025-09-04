const ButtonContent = ({ title, ...props }) => {
    return (
        <div>
            <button {...props}>{title}</button>
        </div>
    );

};
export default ButtonContent;