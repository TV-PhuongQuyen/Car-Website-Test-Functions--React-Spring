import bgVideo from '../assets/sound/banner giới thiệu.mp4';
import '../assets/styles/Login.css';
import logo from '../assets/images/logosieuxe.png';
import Input from '../components/C-From/Input.jsx';
import { useNavigate } from 'react-router-dom';
import ButtonContent from '../components/C-From/Button.jsx';
import { useState } from 'react';
import { registration } from '../services/userService.js';
import { menuConfigLogin } from '../configurations/menuConfigurations.js';

function Register() {
    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const loginItem = menuConfigLogin.find(item => item.action === "login");
    const homeItem = menuConfigLogin.find(item => item.action === "home");
    const registerItem = menuConfigLogin.find(item => item.action === "register");
    const navigate = useNavigate();

    const handleRegisterClick = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await registration(username, password);
            if (response.data && response.data.trueCode && response.data.trueCode.message) {
                alert(response.data.trueCode.message);
            }
        } catch (error) {
            const errorResponse = error.response ? error.response.data.message : "An error occurred during registration.";
            alert(errorResponse);
        }
    }

    return (
        <div className="Login">
            <div className="Login_container">
                <div className="Login_audio">
                    <video autoPlay muted loop className='background-video'>
                        <source src={bgVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="Login">
                    <div className="Login_logo">
                        <img src={logo} alt="Logo" />
                    </div>
                </div>
                <form className='Login_form_container'>
                    <div className="Login_form">
                        <div className=' Login_form_content'>
                            <div className='title_text_logo'>Đăng ký</div>
                            <div className="Login_form_group">
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Input
                                    type="password"
                                    name="ConfirmPassword"
                                    placeholder="Confirm Password"
                                    label="Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <ButtonContent
                                    type="submit"
                                    title="Đăng Ký"
                                    className="Login_button"
                                    onClick={handleRegisterClick}
                                />
                            </div>
                            <div className='Login_form_footer'>
                                <p>Đã có tài khoản? <span onClick={() => { navigate(loginItem.path) }}>{loginItem.label}</span></p>
                            </div>
                            <div className='Login_form_footer_text'>
                                <div onClick={() => { navigate(homeItem.path) }}>----------------{homeItem.label}----------------</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register;