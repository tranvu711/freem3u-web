import React, {useState, useEffect} from "react";
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "./styles.css";
import {ShortenPage, DevicePage, AuthPage, HistoryPage, HomePage, EditShortenPage} from "./page";

import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import {DeviceUrlPage} from "./page";
import {AppDownloadPage} from "./page";

function Layout({children}) {
    const {isLoggedIn, logout} = useContext(AuthContext);

    return (
        <>
            <div className="background-animation">
                <div className="circle" style={{width: "150px", height: "150px", top: "10%", left: "20%"}}></div>
                <div className="circle" style={{width: "200px", height: "200px", bottom: "15%", right: "25%"}}></div>
                <div className="circle" style={{width: "100px", height: "100px", top: "50%", left: "70%"}}></div>
            </div>
            <div className="min-h-screen bg-gray-50 text-gray-800">
                <header className="bg-blue-900 text-white p-6 text-center">
                    <h1 className="text-3xl font-bold">vAppTV - FreeM3U</h1>
                    <p>Giải pháp chia sẻ link rút gọn và nội dung M3U tiện lợi</p>
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
                        <li>
                            <Link to="/app" className="text-blue-700 hover:underline">
                                Tải ứng dụng
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
                                    <a href={'javascript:void(0)'}
                                       onClick={logout}
                                       className="text-blue-700 hover:underline bg-transparent border-none"
                                    >
                                        Đăng xuất
                                    </a>
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
                    <p className={"declaimer"}>
                        vAppTV không cung cấp bất kỳ nội dung nào. Chúng tôi chỉ cung cấp dịch vụ rút gọn link và chia sẻ nội dung và trình phát M3U miễn phí.
                        <br/>Tất cả nội dung đều thuộc về chủ sở hữu bản quyền của nó. Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào được chia sẻ thông qua dịch vụ của chúng tôi.
                    </p>
                </footer>
            </div>
        </>
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
                        <Route path="/shorten/edit/:code" element={<EditShortenPage/>}/>
                        <Route path="/device" element={<DevicePage/>}/>
                        <Route path="/device/:deviceId" element={<DeviceUrlPage/>}/>
                        <Route path="/history" element={<HistoryPage/>}/>
                        <Route path="/app" element={<AppDownloadPage/>}/>
                        <Route path="/" element={<HomePage/>}/>
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    )
        ;
}