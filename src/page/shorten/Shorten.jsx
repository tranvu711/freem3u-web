import React, {useContext, useState} from "react";
import {shorten} from "../../utils/api";
import {SuccessModal, ErrorModal} from "../../components/Modal";
import {AuthContext} from "../../context/AuthContext";

export function ShortenPage() {

    const {isLoggedIn} = useContext(AuthContext);
    const [type, setType] = useState("url");
    const [input, setInput] = useState("");
    const [short, setShort] = useState("");
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleShorten = async () => {
        try {
            const payload = {
                type,
                original_url: type === "url" ? input : undefined,
                content: type === "text" ? input : undefined,
            };
            const result = await shorten(payload);
            setShort(result.data?.shortenedUrl);
            setShowSuccessModal(true);
        } catch (error) {
            setError(error.message || "An error occurred while shortening the URL.");
            setShowErrorModal(true);
        }
    };

    return (
        <div className="shorten-page">
            <h2 className="shorten-title">Rút gọn liên kết hoặc văn bản</h2>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${type === "url" ? "active" : ""}`}
                        type="button"
                        role="tab"
                        onClick={() => setType("url")}
                    >
                        Link
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${type === "text" ? "active" : ""}`}
                        type="button"
                        role="tab"
                        onClick={() => setType("text")}
                    >
                        Văn bản
                    </button>
                </li>
            </ul>
            <div className="shorten-tab-content">
                <div
                    className={`shorten-tab-pane ${type === "url" ? "show active" : ""}`}
                    role="tabpanel"
                >
                    <textarea
                        className="shorten-input"
                        placeholder="Nhập URL cần rút gọn"
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <p className="shorten-description">
                        Nhập liên kết bạn muốn rút gọn vào ô bên dưới. Chúng tôi sẽ tạo một liên kết ngắn cho bạn.
                    </p>

                </div>
                <div
                    className={`shorten-tab-pane ${type === "text" ? "show active" : ""}`}
                    role="tabpanel"
                >
                    <textarea
                        className="shorten-input"
                        placeholder="Nhập văn bản cần rút gọn"
                        rows={10}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <p className="shorten-description">
                        Nhập văn bản bạn muốn rút gọn vào ô bên dưới. Chúng tôi sẽ tạo một liên kết ngắn cho bạn. Dễ dàng chia sẻ và lưu trữ cũng như xem trên tivi
                    </p>
                </div>
            </div>
            <button className="shorten-button" onClick={handleShorten}>
                Rút gọn
            </button>
            {short && (
                <p className="shorten-result">
                    <strong>Shortened:</strong> {short}
                </p>
            )}

            <SuccessModal
                isOpen={showSuccessModal}
                title="Success"
                message={<p>Shortened successfully: <b>{short}</b></p>}
                onClose={() => setShowSuccessModal(false)}
            />

            <ErrorModal
                isOpen={showErrorModal}
                title="Error"
                message={<p>{error}</p>}
                onClose={() => setShowErrorModal(false)}
            />
        </div>
    );
}