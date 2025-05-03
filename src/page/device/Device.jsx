import React, {useState, useEffect, useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import {LoadingOverlay} from "../../components/LoadingOverlay";
import {AlertModal, ConfirmModal} from "../../components/Modal";
import {AuthContext} from "../../context/AuthContext";

export function DevicePage() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirm modal
    const [showLoginPopup, setShowLoginPopup] = useState(false); // State for login popup
    const [deviceToDelete, setDeviceToDelete] = useState(null); // Track the device to delete

    const navigate = useNavigate();
    const location = useLocation();

    const fetchDevices = async (currentPage) => {
        setLoading(true);
        setError("");
        try {
            const data = await apiRequest(`/user/devices?page=${currentPage}`);
            setDevices(data?.data?.data || []);
            setTotalPages(data?.data?.totalPage || 1);
        } catch (err) {
            setError("Failed to fetch devices.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    };

    const handleDeleteDevice = async () => {
        if (!deviceToDelete) return;
        setLoading(true);
        setError("");
        try {
            await apiRequest(`/user/device/${deviceToDelete}`, "DELETE");
            await fetchDevices(page);
        } catch (err) {
            setError("Failed to delete device.");
        } finally {
            setLoading(false);
            setShowConfirmModal(false);
            setDeviceToDelete(null);
        }
    };

    const openConfirmModal = (deviceId) => {
        setDeviceToDelete(deviceId);
        setShowConfirmModal(true);
    };

    const handleViewUrls = (deviceId) => {
        navigate(`/device/${deviceId}`);
    };

    const handleAddDevice = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await apiRequest("/user/device", "POST", { });
            await fetchDevices(1); // Refresh the device list
        } catch (err) {
            setError("Failed to add device.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            setDevices([]);
            return;
        }
        fetchDevices(page);
    }, [page, isLoggedIn]);

    return (
        <div className="device-page main-page">
            <LoadingOverlay isLoading={loading}/>
            <AlertModal
                isOpen={showLoginPopup}
                title="Yêu cầu đăng nhập"
                message="Bạn cần đăng nhập để truy cập trang này."
                onClose={handleLoginRedirect}
            />
            <ConfirmModal
                isOpen={showConfirmModal}
                title="Xác nhận xóa thiết bị"
                message="Bạn có chắc chắn muốn xóa thiết bị này không?"
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteDevice}
            />
            <div className="flex justify-between items-center mb-6">
                <h2 className="shorten-title">Danh sách thiết bị</h2>
                <button
                    onClick={handleAddDevice}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    Thêm thiết bị
                </button>
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <div className="device-list">
                <div className="device-list-header flex justify-between items-center font-bold border-b pb-2 mb-2 gap-4">
                    <span className="w-1/2 pl-4 py-2">Mã thiết bị</span>
                    <span className="w-1/2 text-right pr-4 py-2">Hành động</span>
                </div>
                {devices.map((device) => (
                    <div
                        key={device.deviceId}
                        className="device-list-item flex justify-between items-center"
                    >
                        <span className="w-1/2">{device.deviceCode}</span>
                        <div className="w-1/2 flex justify-end space-x-2">
                            <button
                                onClick={() => handleViewUrls(device.deviceId)}
                                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mb-2"
                                disabled={loading}
                            >
                                Xem URLs
                            </button>
                            <button
                                onClick={() => openConfirmModal(device.deviceId)}
                                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                disabled={loading}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination mt-4 flex justify-center space-x-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="bg-gray-300 px-4 py-2 rounded"
                    disabled={page === 1 || loading}
                >
                    Trang trước
                </button>
                <span className="text-gray-700">Trang {page} / {totalPages}</span>
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