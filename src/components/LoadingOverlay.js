import React from "react";

export function LoadingOverlay({ isLoading }) {
    if (!isLoading) return null;

    return (
        <div className="loading-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="spinner border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
        </div>
    );
}