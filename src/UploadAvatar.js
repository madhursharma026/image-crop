import Avatar from 'react-avatar-edit';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';

function UploadAvatar() {
    const componentRef = useRef();
    const [src, setSrc] = useState(null)
    const [preview, setPreview] = useState(null)
    const [showImage, setShowImage] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onClose = () => {
        setPreview(null)
    }

    const onCrop = (view) => {
        setPreview(view)
    }

    const showFinalImage = () => {
        setShowImage(true)
        handleClose()
    }

    return (
        <>
            <h1 className='mt-4'><u>Crop an image</u></h1>
            <br />
            <br />
            <div style={{ width: "100%" }}>
                {!preview &&
                    <button className="btn btn-primary" onClick={() => handleShow()}>Upload Image</button>
                }
            </div>
            {showImage ?
                <>
                    <img src={preview} ref={componentRef} alt="#ImgNotFound" style={{ width: "50%", maxHeight: '60vh' }} />
                    <br />
                    <br />
                    <div className="row mt-3">
                        <div className="col-6" style={{ textAlign: "right" }}>
                            <button className="btn btn-primary" onClick={() => exportComponentAsPNG(componentRef)}>Download</button>
                        </div>
                        <div className="col-6" style={{ textAlign: "left" }}>
                            <button className="btn btn-secondary" onClick={() => handleShow()}>Upload New</button>
                        </div>
                    </div>
                    <br />
                    <br />
                </>
                :
                <></>
            }

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Upload an Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                        <Avatar exportAsSquare exportSize={450} width={450} height={300} onCrop={onCrop} onClose={onClose} src={src} /></div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <Button variant="secondary" className='w-100' onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                        <div className="col-6">
                            <Button variant="primary" className='w-100' onClick={showFinalImage}>
                                Done
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UploadAvatar;
