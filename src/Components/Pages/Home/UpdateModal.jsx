import React from 'react'
import { Modal } from 'react-bootstrap'
import Button from "react-bootstrap/Button";


const UpdateModal = ({ show, handleCloseModal, currentPost, handleChangedData, handleUpdatePost }) => {
    return (
        <div>
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentPost.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-post-form">
                        <input
                            type="text"
                            className='form-control mb-2'
                            placeholder='Title'
                            value={currentPost.title}
                            onChange={(e) => {
                                handleChangedData({ ...currentPost, title: e.target.value });
                            }}
                        />
                        <textarea
                            className='form-control mb-2'
                            placeholder='Body'
                            value={currentPost.body}
                            onChange={(e) => {
                                handleChangedData({ ...currentPost, body: e.target.value });
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalFooter">
                    <Button
                        variant="secondary"
                        onClick={handleCloseModal}>Close</Button>
                    <Button
                        variant="primary"
                        onClick={handleUpdatePost}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateModal
