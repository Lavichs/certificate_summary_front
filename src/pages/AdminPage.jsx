import React, {useState} from 'react';
import {CERTIFICATE_LOAD} from "../api/api_uri";
import UserService from "../api/UserService";
import CertificateService from "../api/CertificateService";

const AdminPage = () => {
    const [file, setFile] = useState(null);

    const sendFile = async () => {
        const formData = new FormData();
        formData.append("uploaded_file", file)

        // await axios.post(CERTIFICATE_LOAD, formData)
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // const resp = await fetch(CERTIFICATE_LOAD, {
        //     method: "POST",
        //     body: formData
        // });
        let res = await CertificateService.loadxlsx(formData)
    }

    return (
        <div>
            AdminPage
            <div>
                <input type="file" onChange={
                    (event) => {
                        const selectedFile = event.target.files[0]
                        setFile(selectedFile)
                    }
                }/>
                <button className="btn btn-success" onClick={sendFile}>Отправить</button>
            </div>

        </div>
    );
};

export default AdminPage;