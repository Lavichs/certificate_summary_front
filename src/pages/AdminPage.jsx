import React, {useState} from 'react';
import CertificateService from "../api/CertificateService";

const AdminPage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [finishLoading, setFinishLoading] = useState(false)

    const sendFile = async () => {
        const formData = new FormData();
        formData.append("uploaded_file", file)

        setLoading(true)
        let res = await CertificateService.loadxlsx(formData)
        setLoading(false)
        setFinishLoading(true)
        // setTimeout(() => setFinishLoading(false), 2000)
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
            {
                loading &&
                <p className="text-primary">Загрузка....</p>
            }
            {
                finishLoading &&
                <p className="text-success">Загрузка завершена</p>
            }

        </div>
    );
};

export default AdminPage;