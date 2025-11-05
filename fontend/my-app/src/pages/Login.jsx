import bgVideo from '../assets/sound/banner giới thiệu.mp4';
import '../assets/styles/Login.css';
import logo from '../assets/images/logosieuxe.png';
import logoGoogle from '../assets/images/iconGoogle.png';
import logoFacebook from '../assets/images/iconFacebook.png';
import logoGithub from '../assets/images/github-logo.png';
import { useState, useEffect, useRef } from 'react';
import Input from '../components/C-From/Input.jsx';
import { useNavigate } from 'react-router-dom';
import ButtonContent from '../components/C-From/Button.jsx';
import { login, getTokened } from '../services/authService.js';
import { menuConfigLogin } from '../configurations/menuConfigurations.js';
import { OAuthCogfig } from '../configurations/configuration.js';

function Login() {
    console.log('🔄 Login component rendered');

    const navigate = useNavigate();
    const homeItem = menuConfigLogin.find(item => item.action === "home");
    const registerItem = menuConfigLogin.find(item => item.action === "register");

    // Thêm ref để track login state
    const isLoggingIn = useRef(false);
    const hasCheckedToken = useRef(false);
    const submitCount = useRef(0);

    const handleGoogleLogin = () => {
        const authUrl = OAuthCogfig.authUri;
        const googleClientId = OAuthCogfig.clientID;
        const callbackUrl = OAuthCogfig.redirect;

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&prompt=select_account`;

        console.log(targetUrl);
        window.location.href = targetUrl;
    }

    // Fix useEffect với logging
    useEffect(() => {
        console.log('🔍 useEffect triggered - hasCheckedToken:', hasCheckedToken.current);

        if (hasCheckedToken.current) {
            console.log('⏭️ Token already checked, skipping');
            return;
        }

        const token = getTokened();
        console.log('🎟️ Current token:', token ? 'EXISTS' : 'NOT_FOUND');

        if (token && homeItem?.path) {
            console.log('🏠 Navigating to home:', homeItem.path);
            hasCheckedToken.current = true;
            navigate(homeItem.path, { replace: true });
        }
    }, [navigate, homeItem?.path]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        submitCount.current += 1;
        console.log(`📝 Form submitted - Attempt #${submitCount.current}`);
        console.log('🔒 isLoggingIn.current:', isLoggingIn.current);

        // Prevent double submission
        if (isLoggingIn.current) {
            console.log('❌ Login already in progress, blocking duplicate');
            return;
        }

        try {
            isLoggingIn.current = true;
            console.log('🚀 Starting login request...');

            const response = await login(username, password);
            console.log("✅ Login response:", response);

            // Navigate với replace để tránh back button issues
            if (homeItem?.path) {
                console.log('🏠 Navigating to home after login:', homeItem.path);
                navigate(homeItem.path, { replace: true });
            }
        } catch (error) {
            console.log('❌ Login error:', error);
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                console.error("Login error:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại.");
            }
        } finally {
            isLoggingIn.current = false;
            console.log('🔓 Login process completed, isLoggingIn reset to false');
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
                <form className='Login_form_container' onSubmit={handleSubmit}>
                    <div className="Login_form">
                        <div className=' Login_form_content'>
                            <div className='title_text_logo'>Đăng Nhập</div>
                            <div className="Login_form_group">
                                <Input
                                    type="text"
                                    value={username}
                                    placeholder="Username"
                                    label="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Input
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    label="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <div className='Login_form_forgot_container'>
                                    <a href="/forgot-password" className='Login_form_forgot'>Quên mật khẩu?</a>
                                </div>
                                <ButtonContent
                                    type="submit"
                                    title="Đăng Nhập"
                                    className="Login_button"
                                    disabled={isLoggingIn.current}
                                />

                                <div className='Login_form_social'>
                                    <ButtonContent onClick={handleGoogleLogin} title={<img src={logoGoogle} alt="Google Logo" />} id="google" className="Login_button" />
                                    <ButtonContent title={<img src={logoGithub} alt="Github Logo" />} id="github" className="Login_button" />
                                    <ButtonContent title={<img src={logoFacebook} alt="Facebook Logo" />} id="facebook" className="Login_button" />
                                </div>
                            </div>
                            <div className='Login_form_footer'>
                                <p>Chưa có tài khoản? <span onClick={() => { navigate(registerItem?.path) }}>{registerItem?.label}</span></p>
                            </div>
                            <div onClick={() => { navigate(homeItem?.path) }} className='Login_form_footer_text'>
                                <div >----------------{homeItem?.label}----------------</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}
export default Login;