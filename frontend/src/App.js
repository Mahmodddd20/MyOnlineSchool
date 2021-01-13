import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./components/Upload/FileUpload";


export default function App(){
    return(
        <div className="container" style={{ width: "600px" }}>
            <FileUpload />
        </div>
    )
}