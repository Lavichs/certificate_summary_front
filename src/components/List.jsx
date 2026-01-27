import React, {useEffect, useState} from 'react';
import CertificateService from "../api/CertificateService";
import Modal from 'react-bootstrap/Modal';
import {ACTIONS} from "../consts";
import {Form} from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";


const List = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    // for modal
    const [isShow, setIsShow] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [validated, setValidated] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);

    const showConfirm = () => setIsShowConfirm(true);
    const hideConfirm = () => setIsShowConfirm(false);

    // Функци загрузки списка сертификатов с сервера
    const fetchData = async () => {
        const all_data = await CertificateService.getAll();
        setData(all_data);
    };

    // Загрузка списка сертификатов с сервера (при первой загрузке страницы)
    useEffect(() => {
        fetchData();
        const timer = setInterval(() => {
            fetchData();
        }, 5000);
        // Очистка таймера при размонтировании
        return () => {
            clearInterval(timer);
        };
    }, [])

    // Форматирование даты
    const dateHelp = (date_str) => {
        const [year, month, day] = date_str.split("T")[0].split("-");
        return `${day}.${month}.${year}`
    };

    // Применение поискового фильтра
    useEffect(() => {
        setFilteredData(data.filter((item) => {
            // Объединяем все значения в строку и делаем ее lower case для поиска
            const values = Object.values(item).join(' ').toLowerCase();
            return values.includes(searchTerm.toLowerCase());
        }))
    }, [data, searchTerm]);

    // for modal
    const openItem = (item) => {
        console.log(item)
        setIsShow(true)
        setCurrentItem(item)
    }

    const hideModal = () => setIsShow(false);

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(event.target.cuks.value)
        console.log(event.target.fio.value)
        console.log(event.target.post.value)
        console.log(event.target.organization.value)
        console.log(event.target.dateInput.value)
        console.log(event.target.inputGroupSelect01.value)
        console.log(event.target.comment.value)

        const dataToSend = {
            "cert_center": event.target.cuks.value,
            "fio": event.target.fio.value,
            "post": event.target.post.value,
            "organization": event.target.organization.value,
            "expire_date": event.target.dateInput.value,
            "status": event.target.inputGroupSelect01.value,
            "comment": event.target.comment.value
        }

        const response = await CertificateService.update(currentItem.id, dataToSend)
        //     ......
    }

    const deleteItem = async () => {
        try {
            const response = await CertificateService.delete(currentItem.id)
        } catch (e) {

        }
        hideConfirm();
        hideModal();
    }


    return (
        <>
            <div className="container">
                <input type="text"
                       className="form-control mb-3"
                       placeholder="Поиск..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div>
                <ul className="list-group">
                    <li className="list-group-item text-center"
                        style={{cursor: 'pointer'}}>
                        <div className="d-flex w-100 justify-content-between">
                            <div className="w-50 d-flex w-100 justify-content-around">
                                <strong className="mx-1 w-25 text-wrap">ЦУКС</strong>
                                <strong className="mx-1 w-25 text-wrap">ФИО</strong>
                                <strong className="mx-1 w-25 text-wrap">Должность</strong>
                            </div>
                            <div className="w-50 d-flex w-100 justify-content-around">
                                <strong className="mx-1 w-25">Подразделение</strong>
                                <strong className="mx-1 w-25">Конец срока действия</strong>
                                <strong className="mx-1 w-25">Статус</strong>
                                <strong className="mx-1 w-25 text-break text-wrap">Комментарий</strong>
                            </div>
                        </div>
                    </li>
                    {filteredData.map((item) => {
                        return (
                            <li className="list-group-item btn btn-primary"
                                type="button"
                                data-bs-toggle="modal"
                                key={item.id}
                                id={item.id}
                                onClick={() => openItem(item)}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="w-50 d-flex w-100 justify-content-around">
                                        <p className="mx-1 w-25 text-wrap">{item?.cert_center !== null ? item?.cert_center : "—"}</p>
                                        <p className="mx-1 w-25 text-wrap">{item?.fio}</p>
                                        <p className="mx-1 w-25">{item?.post}</p>
                                    </div>
                                    <div className="w-50 d-flex w-100 justify-content-around">
                                        <p className="mx-1 w-25">{item?.organization}</p>
                                        <p className="mx-1 w-25">{
                                            item?.expire_date !== null ? dateHelp(item?.expire_date) : "—"
                                        }</p>
                                        <p className="mx-1 w-25">{item?.status}</p>
                                        <p className="mx-1 w-25 text-break text-wrap">{item?.comment}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <Modal
                size={"lg"}
                show={isShow}
                backdrop="static"
                keyboard={false}
                className="bg-transparent"
                onHide={hideModal}>

                <Modal.Header closeButton>
                    <Modal.Title>{
                        // action === ACTIONS.edit
                        //     ? "Редактирование данных сертификата"
                        //     : action === ACTIONS.create
                        //         ? "Создание сертификата"
                        //         : ""
                        "Сертификат"
                    }</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{currentItem?.cert_center}</p>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">ЦУКС</span>
                            <input name="cert_center"
                                   type="text"
                                   className="form-control"
                                   placeholder="ЦУКС"
                                   id="cuks"
                                   aria-label="Username"
                                   aria-describedby="basic-addon1"
                                   defaultValue={currentItem?.cert_center}/>
                            <div className="invalid-feedback">
                                Это обязательное поле
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">ФИО</span>
                            <input name="fio"
                                   type="text"
                                   className="form-control"
                                   placeholder="ФИО"
                                   id="fio"
                                   aria-label="Username"
                                   aria-describedby="basic-addon1"
                                   defaultValue={currentItem?.fio}
                                   required/>
                            <div className="invalid-feedback">
                                Это обязательное поле
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Должность</span>
                            <input name="post"
                                   type="text"
                                   className="form-control"
                                   placeholder="Должность"
                                   id="post"
                                   aria-label="Username"
                                   aria-describedby="basic-addon1"
                                   defaultValue={currentItem?.post}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Подразделение</span>
                            <input name="organization"
                                   type="text"
                                   className="form-control"
                                   placeholder="Подразделение"
                                   id="organization"
                                   aria-label="Username"
                                   aria-describedby="basic-addon1"
                                   defaultValue={currentItem?.organization}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Дата</span>
                            <input name="expire_date"
                                   type="date"
                                   className="form-control"
                                   id="dateInput"
                                   defaultValue={String(currentItem?.expire_date).slice(0, 10)}/>
                            <div className="invalid-feedback">
                                Это обязательное поле
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect01">Статус</label>
                            <select name="status"
                                    defaultValue={currentItem?.status}
                                    className="form-select"
                                    id="inputGroupSelect01">
                                <option value={null}>—</option>
                                <option value="Подано заявление">Подано заявление</option>
                                <option value="Повторно подано заявление">Повторно подано заявление</option>
                                <option value="Пришло приглашение в МИАЦ">Пришло приглашение в МИАЦ</option>
                                <option value="Получен сертификат">Получен сертификат</option>
                                <option value="Выдан">Выдан</option>
                                <option value="Установлен">Установлен</option>
                                <option value="Направлен в МИАЦ">Направлен в МИАЦ</option>
                                <option value="Приглашен для получения">Приглашен для получения</option>
                                <option value="Создан черновик">Создан черновик</option>
                                <option value="Отозван">Отозван</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">Комментарий</span>
                            <textarea id="comment"
                                      name="comment"
                                      className="form-control"
                                      aria-label="Комментарий"
                                      defaultValue={
                                          currentItem?.comment !== null
                                              ? String(currentItem?.comment) === "None"
                                                  ? ""
                                                  : currentItem?.comment
                                              : ""}
                            ></textarea>
                        </div>

                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-danger me-2" onClick={showConfirm}>Удалить</button>
                            <p></p>
                            <div>
                                <button type="button"
                                        className="btn btn-secondary me-2"
                                        data-bs-dismiss="modal"
                                        onClick={hideModal}>Отмена
                                </button>
                                <button type="submit" className="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <ConfirmModal
                isShowConfirm={isShowConfirm}
                hideConfirm={hideConfirm}
                callback={deleteItem}
                title={"Подтверждение удаления"}
                message={"Вы действительно хотите удалить сертификат?"}
            />
        </>
    );
};

export default List;