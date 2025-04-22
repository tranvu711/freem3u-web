import React from "react";

export function Modal({ isOpen, title, message, onClose, footer, type }) {
    if (!isOpen) return null;

    // Define color classes based on the modal type
    const typeClasses = {
        success: "modal-success",
        error: "modal-error",
        warning: "modal-warning",
        info: "modal-info",
        confirm: "modal-confirm",
        alert: "modal-alert",
    };

    const modalClass = typeClasses[type] || "modal-default";

    return (
        <div
            className={`modal fade show d-block`}
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className={`modal-header ${modalClass}`}>
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">{message}</div>
                    {footer && <div className="modal-footer">{footer}</div>}
                </div>
            </div>
        </div>
    );
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onClose }) {
    if (!isOpen) return null;
    return (
        <Modal
            isOpen={isOpen}
            title={title}
            message={message}
            onClose={onClose}
            type="confirm"
            footer={
                <>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Hủy
                    </button>
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>
                        Xác nhận
                    </button>
                </>
            }
        />
    );
}

export function AlertModal({ isOpen, title, message, onClose }) {
    if (!isOpen) return null;
    return (
        <Modal
            isOpen={isOpen}
            title={title}
            message={message}
            onClose={onClose}
            type="alert"
            footer={
                <button type="button" className="btn btn-danger" onClick={onClose}>
                    Ok
                </button>
            }
        />
    );
}

export function InfoModal({ isOpen, title, message, onClose }) {
    if (!isOpen) return null;
    return (
        <Modal
            isOpen={isOpen}
            title={title}
            message={message}
            onClose={onClose}
            type="info"
            footer={
                <button type="button" className="btn btn-info" onClick={onClose}>
                    Ok
                </button>
            }
        />
    );
}

export function SuccessModal({ isOpen, title, message, onClose }) {
    if (!isOpen) return null;
    return (
        <Modal
            isOpen={isOpen}
            title={title}
            message={message}
            onClose={onClose}
            type="success"
            footer={
                <button type="button" className="btn btn-success" onClick={onClose}>
                    Ok
                </button>
            }
        />
    );
}

export function ErrorModal({ isOpen, title, message, onClose }) {
    if (!isOpen) return null;
    return (
        <Modal
            isOpen={isOpen}
            title={title}
            message={message}
            onClose={onClose}
            type="error"
            footer={
                <button type="button" className="btn btn-danger" onClick={onClose}>
                    Ok
                </button>
            }
        />
    );
}

export function WarningModal({ isOpen, title, message, onClose }) {
    if (!isOpen) return null;
    return (
        <Modal
            isOpen={isOpen}
            title={title}
            message={message}
            onClose={onClose}
            type="warning"
            footer={
                <button type="button" className="btn btn-warning" onClick={onClose}>
                    Ok
                </button>
            }
        />
    );
}