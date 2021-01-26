import React, { useState } from "react";
import UploadService from "./FileUploadService";
import {Button, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";

const UploadFiles = () => {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);




    const [fileInfos, setFileInfos] = useState('');
    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };
    const upload = () => {
        let currentFile = selectedFiles[0];

        setCurrentFile(currentFile);

        UploadService.upload(currentFile, (event) => {
        })
            .then((response) => {
                setMessage(response.data.message);
                let img= response.data.file

                setFileInfos(img)
                setShow(true);
            })
            .catch(() => {
                setMessage("This Type Of Files Not Allowed!");
                setShow2(true);


            });

        setSelectedFiles(undefined);
    };

    return (
        <div className='d-flex flex-row'>
            <button
                className="btn btn-success  btn-sm col-auto ml-0 mr-1 mt-0 h-50"
                disabled={!selectedFiles}
                onClick={upload}
            >
                Upload
            </button>

            <label  className=" col-10 ml-0 mr-1 overflow-auto">

                <OverlayTrigger
                            key='top'
                            placement='top'
                            overlay={
                                <Tooltip id='top'>
                                    Allowed files is jpg, jpeg, png, bmp, tiff,
                                     doc, docx, html, htm, odt, pdf,
                                    xls, xlsx, ods, ppt, pptx, and txt
                                </Tooltip>
                            }
                        >
                    <input type="file" onChange={selectFile} />
                </OverlayTrigger>
                <div className="form-text text-muted">
                    Maximum size is 5mb.
                </div>

            </label>




    <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header className='w-100' closeButton>
                        <Modal.Title>{message}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='h-100'>
                        <p className='warning'>Please Copy The URL Before Closing This Tap</p>
                        <div className='bg-warning text-break'  dangerouslySetInnerHTML={{__html: fileInfos}}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
    </>
            <>
                <Modal
                    show={show2}
                    onHide={handleClose2}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header className='w-100' closeButton>
                        <Modal.Title>{message}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='h-100'>
                        <p className='bg-warning'>
                            Allowed files is jpg, jpeg, png, bmp, tiff,
                            doc, docx, html, htm, odt, pdf,
                            xls, xlsx, ods, ppt, pptx, and txt

                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose2}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>




        </div>

    );
};

export default UploadFiles;
