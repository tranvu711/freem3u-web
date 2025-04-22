// src/utils/api.js
const API_BASE_URL = "https://freem3u.xyz/api"; // Base URL for your API

// Function to get the access token (e.g., from localStorage)
function getAccessToken() {
    return localStorage.getItem("accessToken");
}

// Centralized API request function
export async function apiRequest(endpoint, method = "GET", body = null) {
    const token = getAccessToken();
    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response) {
            throw new Error("Network response was not ok");
        }
        let responseData = await response.json();
        if (responseData?.code < 200 || responseData?.code >= 300) {
            throw new Error(responseData?.message || "API request failed");
        }
        return responseData;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}

// src/utils/api.js
export async function shorten(data) {
    return apiRequest("/shorten", "POST", data);
}