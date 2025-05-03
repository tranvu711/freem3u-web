import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {apiRequest} from "../../utils/api";
import {AlertModal, ConfirmModal} from "../../components/Modal";
import {LoadingOverlay} from "../../components/LoadingOverlay";
import {AuthContext} from "../../context/AuthContext";


export function DeviceUrlPage() {
    const {isLoggedIn, logout} = useContext(AuthContext);
    const {deviceId} = useParams();
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // State for adding new URL
    const [newUrl, setNewUrl] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [newUrlName, setNewUrlName] = useState("");

    // State for modal and confirmation
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // State for editing URL
    const [urlToDelete, setUrlToDelete] = useState(null);
    const [editUrl, setEditUrl] = useState(null); // Track the URL being edited

    // State for editing URL
    const [updatedUrl, setUpdatedUrl] = useState(""); // Track the updated URL value
    const [updatedIsActive, setUpdatedIsActive] = useState(false); // Track the updated is_active value
    const [updatedUrlName, setUpdatedUrlName] = useState(""); // Track the updated URL name
    const [showLoginPopup, setShowLoginPopup] = useState(false); // State for login popup

    const navigate = useNavigate();

    const fetchUrls = async (currentPage) => {
        setLoading(true);
        setError("");
        try {
            const data = await apiRequest(`/user/device/${deviceId}/urls?page=${currentPage}`);
            setUrls(data?.data?.data || []);
            setTotalPages(data?.data?.totalPage || 1);
        } catch (err) {
            setError("Failed to fetch URLs.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddUrl = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await apiRequest(`/user/device/${deviceId}/urls`, "POST", {
                url: newUrl,
                is_active: isActive,
                name: newUrlName,
            });
            setNewUrl("");
            setIsActive(false);
            setShowModal(false);
            await fetchUrls(page);
        } catch (err) {
            setError("Failed to add URL.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUrl = async () => {
        setLoading(true);
        setError("");
        try {
            await apiRequest(`/user/device/${deviceId}/url/${urlToDelete}`, "DELETE");
            await fetchUrls(page); // Refresh the list after deletion
            setUrlToDelete(null);
            setShowConfirmModal(false);
        } catch (err) {
            setError("Failed to delete URL.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (urlId, currentStatus) => {
        setLoading(true);
        setError("");
        try {
            await apiRequest(`/user/device/${deviceId}/url/${urlId}`, "PUT", {
                is_active: !currentStatus,
            });
            await fetchUrls(page); // Refresh the list after updating
        } catch (err) {
            setError("Failed to update URL status.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditUrl = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await apiRequest(`/user/device/${deviceId}/url/${editUrl.deviceUrlId}`, "PUT", {
                url: updatedUrl,
                is_active: updatedIsActive,
                name: updatedUrlName,
            });
            setEditUrl(null); // Close the edit form
            setUpdatedUrl(""); // Reset the updated URL
            setUpdatedIsActive(false); // Reset the updated is_active
            await fetchUrls(page); // Refresh the list
        } catch (err) {
            setError("Failed to update URL.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            setUrls([]);
            return;
        }
        fetchUrls(page);
    }, [deviceId, page, isLoggedIn]);

    return (
        <div className="device-url-page main-page">
            <AlertModal
                isOpen={showLoginPopup}
                title="Yêu cầu đăng nhập"
                message="Bạn cần đăng nhập để truy cập trang này."
                onClose={handleLoginRedirect}
            />
            <ConfirmModal
                title="Xác nhận xóa URL"
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteUrl}
                message="Bạn có chắc chắn muốn xóa URL này không?"
            />
            <div className="flex justify-between items-center mb-6">
                <h2 className="shorten-title">Danh sách URLs</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Thêm mới URL
                </button>
            </div>

            {showModal && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content bg-white p-6 rounded shadow-lg" style={{width: "500px"}}>
                        <h3 className="text-xl font-bold mb-4">Thêm mới URL</h3>
                        <form onSubmit={handleAddUrl}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Enter URL"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newUrlName}
                                    onChange={(e) => setNewUrlName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Tên gợi nhớ"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <div className="checkbox-container">
                                    <input type="checkbox"
                                           checked={isActive}
                                           onChange={(e) => setIsActive(e.target.checked)}

                                    />
                                    <label htmlFor="active">Active</label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Thêm mới
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Đóng
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            {error && <p className="text-red-600">{error}</p>}

            <LoadingOverlay isLoading={loading}/>
            <div className="table-container overflow-x-auto">
                <table className="table-fixed w-full border-collapse border border-gray-300"
                       style={{width: "100%", marginTop: "20px"}}>
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="w-1/4 border border-gray-300 px-2 py-1 text-left">Tên</th>
                        <th className="w-2/4 border border-gray-300 px-2 py-1 text-left">URL</th>
                        <th className="w-1/8 border border-gray-300 px-2 py-1 text-center">Trạng thái</th>
                        <th className="w-1/8 border border-gray-300 px-2 py-1 text-center">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {urls.length > 0 ? (
                        urls.map((url) => (
                            <tr key={url.deviceId}>
                                <td className="w-1/4 border border-gray-300 px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap text-blue-600 hover:underline">
                                    {url.name}
                                </td>
                                <td className="w-2/4 border border-gray-300 px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap text-blue-600 hover:underline">
                                    {url.url}
                                </td>
                                <td className="w-1/8 border border-gray-300 px-2 py-1 text-center">
                                    <label className="device-url-switch">
                                        <input
                                            type="checkbox"
                                            checked={url.isActive}
                                            onChange={() => handleToggleActive(url.deviceUrlId, url.isActive)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="w-1/8 border border-gray-300 px-2 py-1 flex text-center space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditUrl(url);
                                            setUpdatedUrl(url.url);
                                            setUpdatedIsActive(url.isActive);
                                        }}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => {
                                            setUrlToDelete(url.deviceUrlId);
                                            setShowConfirmModal(true);
                                        }}
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border border-gray-300 px-2 py-1 text-center">
                                No URLs found for this device.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="pagination mt-4 flex justify-center space-x-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="bg-gray-300 px-4 py-2 rounded"
                    disabled={page === 1 || loading}
                >
                    Trang trước
                </button>
                <span className="text-gray-700 pagination-info">Trang {page} / {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className="bg-gray-300 px-4 py-2 rounded"
                    disabled={page === totalPages || loading}
                >
                    Trang sau
                </button>
            </div>

            {editUrl && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content text-black p-6 rounded shadow-lg rounded-2" style={{width: "500px"}}>
                        <h3 className="shorten-title">Sửa URL</h3>
                        <form onSubmit={handleEditUrl}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={updatedUrl}
                                    onChange={(e) => setUpdatedUrl(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Enter new URL"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={updatedUrlName}
                                    onChange={(e) => setUpdatedUrlName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Enter new URL name"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={updatedIsActive}
                                        onChange={(e) => setUpdatedIsActive(e.target.checked)}
                                    />
                                    <label htmlFor="active" className="ml-2">Active (xem trên thiết bị liên kết)</label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Lưu
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditUrl(null)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Đóng
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}