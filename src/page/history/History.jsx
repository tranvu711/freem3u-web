import React, {useState, useEffect, useContext} from "react";
import {apiRequest} from "../../utils/api";
import {AuthContext} from "../../context/AuthContext";
import {LoadingOverlay} from "../../components/LoadingOverlay";
import {AlertModal} from "../../components/Modal";
import {useNavigate} from "react-router-dom";

export function HistoryPage() {
    const {isLoggedIn} = useContext(AuthContext);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [shortenedUrls, setShortenedUrls] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    };

    const fetchShortenedUrls = async () => {
        setLoading(true);
        try {
            const data = await apiRequest(`/user/shorten?page=${page}`);
            setShortenedUrls(data.data?.data || []);
            setTotalPages(data?.data.totalPage);
        } catch (error) {
            console.error("Failed to fetch shortened URLs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            setShortenedUrls([]);
            return;
        }
        fetchShortenedUrls();
    }, [page, isLoggedIn]);

    const handleEdit = (code) => {
        navigate(`/shorten/edit/${code}`);
    };

    return (
        <div className="history-page main-page">
            <h2 className="shorten-title">Lịch sử</h2>
            <LoadingOverlay loading={loading} />
            <AlertModal
                isOpen={showLoginPopup}
                title="Yêu cầu đăng nhập"
                message="Bạn cần đăng nhập để truy cập trang này."
                onClose={handleLoginRedirect}
            />
            <div className="history-page__table-container overflow-x-auto">
                <table className="history-page__table w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="history-page__header border border-gray-300 px-4 py-2">Code</th>
                        <th className="history-page__header border border-gray-300 px-4 py-2">Shortened URL</th>
                        <th className="history-page__header border border-gray-300 px-4 py-2">Type</th>
                        <th className="history-page__header border border-gray-300 px-4 py-2">Original Data</th>
                        <th className="history-page__header border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shortenedUrls.length > 0 ? (
                        shortenedUrls.map((url) => (
                            <tr key={url.id} className="history-page__row">
                                <td className="history-page__cell border border-gray-300 px-4 py-2">{url.shortenedCode}</td>
                                <td className="history-page__cell border border-gray-300 px-4 py-2">
                                    <a
                                        href={url.shortenedUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {url.shortenedUrl}
                                    </a>
                                </td>
                                <td className="history-page__cell border border-gray-300 px-4 py-2">{url.type}</td>
                                <td className="history-page__cell border border-gray-300 px-4 py-2">
                                    {url.originalUrl || url.content}
                                </td>
                                <td className="history-page__cell border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleEdit(url.shortenedCode)}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="history-page__empty text-center py-4">
                                No shortened URLs found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className="history-page__pagination pagination mt-4 flex justify-center space-x-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="bg-gray-300 px-4 py-2 rounded"
                    disabled={page === 1 || loading}
                >
                    Trang trước
                </button>
                <span className="text-gray-700">Page {page} / {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className="bg-gray-300 px-4 py-2 rounded"
                    disabled={page === totalPages || loading}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}