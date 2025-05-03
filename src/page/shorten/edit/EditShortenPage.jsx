import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {apiRequest} from "../../../utils/api";
import {ErrorModal} from "../../../components/Modal";

export function EditShortenPage() {
    const {code} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(null);
    const [editInput, setEditInput] = useState("");
    const [type, setType] = useState("url"); // Default type
    const [isError, setIsError] = useState("");

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const data = await apiRequest(`/user/shorten/${code}`);
            setDetails(data.data);
            setType(data.data.type || "url");
            if (data.data.type === "url") {
                setEditInput(data.data.originalUrl);
            } else {
                setEditInput(data.data.content);
            }
        } catch (error) {
            console.error("Failed to fetch details:", error);
            setIsError("Failed to fetch details.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await apiRequest(`/user/shorten/${code}`, "PUT", {
                type,
                originalUrl: type === "url" ? editInput : "",
                content: type === "content" ? editInput : "",
            });
            navigate("/history");
        } catch (error) {
            setIsError("Failed to save changes.\r\n" + error.message);
            console.error("Failed to save changes:", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [code]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="edit-page main-page">
            <h2 className={"shorten-title"}>Edit Shortened URL</h2>
            {details ? (
                <div>
                    <label htmlFor="code-input">Code:</label>
                    <input
                        id="code-input"
                        type="text"
                        className="shorten-input"
                        value={details.shortenedCode}
                        readOnly
                    />

                    <label htmlFor="type-select">Type:</label>
                    <select
                        id="type-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="shorten-select"
                    >
                        <option value="url">URL</option>
                        <option value="content">Content</option>
                    </select>

                    {type === "url" ? (
                        <input
                            type="text"
                            className="shorten-input"
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            placeholder="Enter URL"
                        />
                    ) : (
                        <textarea
                            className="shorten-input"
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            placeholder="Enter Content"
                        />
                    )}
                    <div className={"button-container"}>
                        <button className="bg-green-600 text-white px-4 py-2 mr-5 rounded" onClick={handleSave}>
                            Lưu
                        </button>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded ml-5 rounded"
                            onClick={() => navigate("/history")}
                        >Hủy
                        </button>
                    </div>
                </div>
            ) : (
                <p>Details not found.</p>
            )}
            <ErrorModal
                isOpen={isError !== ""}
                title="Error"
                message={isError}
                onClose={() => {
                    setIsError("")
                }}
            />
        </div>
    );
}