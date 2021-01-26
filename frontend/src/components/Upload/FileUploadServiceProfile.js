import api from "../../api";

const upload = (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    return api.profilePictureUpload( formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};


export default {
    upload,
};
