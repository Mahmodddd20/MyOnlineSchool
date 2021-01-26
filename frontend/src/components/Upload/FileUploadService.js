import api from "../../api";

const upload = (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    return api.fileUpload( formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};


export default {
    upload,
    // getFiles,
};
