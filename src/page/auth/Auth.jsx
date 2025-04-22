import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {apiRequest} from "../../utils/api";

export function AuthPage() {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            setLoading(true);
            apiRequest("/auth/google", "POST", { code })
                .then((data) => {
                    if (data?.data?.accessToken) {
                        login(data.data.accessToken);
                        let redirectPath = urlParams.get("redirect");
                        if (redirectPath) {
                            navigate(decodeURIComponent(redirectPath));
                        } else {
                            navigate("/shorten");
                        }
                        // navigate("/shorten");
                    }
                })
                .catch(() => setError("Failed to verify the authorization code."))
                .finally(() => setLoading(false));
        }
    }, [login, navigate]);

    const handleGoogleLogin = () => {
        const clientId = "297654297135-b2lm1fc8vp9coolkju4vtq0v6kkmgcb5.apps.googleusercontent.com";
        const redirectUri = "http://localhost:3000/login";
        const scope = "email profile";
        const responseType = "code";

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
        window.location.href = googleAuthUrl;
    };

    if (loading) {
        return <div className="loading">Verifying your login...</div>;
    }

    return (
        <div className="container py-5 auth-page">
            <h2 className="text-center mb-4 auth-title">Đăng nhập với Google</h2>
            <p className="text-center mb-4">
                Sử dụng tài khoản Google để đăng nhập và truy cập các tính năng.
            </p>
            {error && <p className="text-danger text-center">{error}</p>}
            <button className="btn btn-primary w-100" onClick={handleGoogleLogin}>
                Đăng nhập với Google
            </button>
        </div>
    );
}