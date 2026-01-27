import React from "react"
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = ({ isShowConfirm, hideConfirm, callback, title, message }) => {
    return (
        <Modal
            size={"lg"}
            show={isShowConfirm}
            onHide={hideConfirm}
            backdrop="static"
            keyboard={false}
            className="bg-dark">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <div className='w-100 d-flex justify-content-around'>
                    <button type="button" className="btn btn-secondary w-25" onClick={hideConfirm}>Нет</button>
                    <button type="button" className="btn btn-danger w-25" onClick={callback}>Да</button>
                </div>
            </Modal.Footer>
        </Modal >
    )
};

export default ConfirmModal;
