import React from "react";

export function AppDownloadPage() {
    return (
        <div className="app-download-page bg-gray-50 text-gray-800">
            <main className="max-w-4xl mx-auto px-6 py-10 text-center">
                <p className="text-lg text-gray-700 mb-6">
                    Tải xuống ứng dụng vAppTV để quản lý liên kết, thiết bị và nội dung của bạn mọi lúc mọi nơi.
                    Ứng dụng giúp bạn dễ dàng chia sẻ và lưu trữ nội dung, đồng thời xem trên TV một cách tiện lợi.
                </p>
                <a
                    href="/static/vAppTV.apk"
                    download
                    className="btn btn-primary btn-download bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 inline-block"
                >
                    Download APK
                </a>
            </main>
        </div>
    );
}