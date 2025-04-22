import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
    const sections = [
        {
            id: "google-login",
            title: "✨ Vì sao chọn vAppTV?",
            content: "Nhanh chóng và bảo mật, không cần tạo tài khoản mới. Chỉ một cú nhấp đăng nhập bằng Google là bạn có thể sử dụng ngay toàn bộ tính năng của vApp.",
            path: "/auth"
        },
        {
            id: "short-link",
            title: "🔗 Rút gọn liên kết",
            content: "Biến những đường link dài thành đơn giản, dễ nhớ và tiện lợi khi chia sẻ qua mạng xã hội, email hoặc xem trên thiết bị khó nhập liệu như TV.",
            path: "/shorten"
        },
        {
            id: "text-storage",
            title: "✍️ Lưu trữ văn bản",
            content: "Ghi chú nhanh, lưu mã code, nội dung tạm thời hoặc những gì bạn cần nhớ – chỉ cần dán và rút gọn. Dễ dàng tạo link M3U cho TV hoặc thiết bị khác.",
            path: "/shorten"
        },
        {
            id: "device",
            title: "🛠️ Quản lý thiết bị",
            content: "Tạo mã thiết bị, liên kết với tài khoản cá nhân và tuỳ ý gán nội dung hiển thị trên mỗi thiết bị đó. Áp dụng kèm ứng dụng vAppTV trên Smart TV Android.",
            path: "/device"
        },
        {
            id: "audience",
            title: "🌟 Ai nên dùng?",
            content: "Học sinh, giáo viên, nhân viên văn phòng, người hay chia sẻ nội dung, lưu trữ thông tin tạm, hoặc đơn giản là bất kỳ ai muốn trải nghiệm công cụ tiện lợi và hiệu quả."
        },
        {
            id: "get-started",
            title: "✨ Bắt đầu ngay!",
            content: "Chỉ với vài bước đơn giản: Đăng nhập bằng Google, tạo mã thiết bị (nếu cần), rút gọn link hoặc nội dung. Thế là xong!",
            path: "/shorten"
        }
    ];

    return (
        <div className="home-page bg-gray-50 min-h-screen text-gray-800">
            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map(({ id, title, content, path }) => (
                        <div key={id} className="section-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4">{title}</h2>
                            <p className="text-gray-700 mb-6">{content}</p>
                            {path && (
                                <Link
                                    to={path}
                                    className="btn btn-sm btn-info bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
                                >
                                    Truy cập tính năng
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}