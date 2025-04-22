import React, {useState, useEffect} from "react";
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "./styles.css";
import {ShortenPage, DevicePage, AuthPage, HistoryPage} from "./page";

import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import {DeviceUrlPage} from "./page";

function Layout({children}) {
    const {isLoggedIn, logout} = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <header className="bg-blue-900 text-white p-6 text-center">
                <h1 className="text-3xl font-bold">vAppTV - FreeM3U</h1>
                <p>Giải pháp chia sẻ link rút gọn và nội dung M3U8 tiện lợi</p>
            </header>
            <nav className="bg-white shadow sticky top-0 z-10">
                <ul className="flex justify-center flex-wrap space-x-4 p-3 text-sm">
                    <li>
                        <Link to="/" className="text-blue-700 hover:underline">
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="/shorten" className="text-blue-700 hover:underline">
                            Rút gọn link/Văn bản
                        </Link>
                    </li>
                    <li>
                        <Link to="/device" className="text-blue-700 hover:underline">
                            Thiết bị
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        <>

                            <li>
                                <Link to="/history" className="text-blue-700 hover:underline">
                                    Lịch sử
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="text-blue-700 hover:underline bg-transparent border-none cursor-pointer"
                                >
                                    Đăng xuất
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="text-blue-700 hover:underline">
                                Đăng nhập
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
            <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
            <footer className="text-center text-sm text-gray-500 p-4">
                &copy; 2025 vAppTV
            </footer>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<AuthPage/>}/>
                        <Route path="/shorten" element={<ShortenPage/>}/>
                        <Route path="/device" element={<DevicePage/>}/>
                        <Route path="/device/:deviceId" element={<DeviceUrlPage/>}/>
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/" element={<h2 className="text-2xl font-bold">Welcome to vApp</h2>}/>
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}