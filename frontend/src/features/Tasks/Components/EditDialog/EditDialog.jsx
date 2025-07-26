import { useEffect, useState } from "react";
import CloseButton from "../../../../Components/CloseButton/CloseButton";
import styles from "./EditDialog.module.scss";
import TaskAPI from "../../../../api/TaskAPI";
import { useAuth } from "../../../../context/AuthContext";
import Button from "../../../../Components/Button/Button";

const EditDialog = (props) => {
    const dialogRef = props.dialogRef;
    const id = props.id;
    const setID = props.setID;
    const setTasks = props.setTasks;
    const [dialogData, setDialogData] = useState({});
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();
    const [updated, setUpdated] = useState(false);

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        const fetchData = async (id) => {
            if (!id) {
                closeDialog();
                return;
            }
            try {
                const response = await TaskAPI.getTask(id);
                setDialogData(response?.data || {});
                setUpdated(false);
            } catch (err) {
                setError(err);
                closeDialog();
            }
        };
        fetchData(id);
    }, [id, isAuthenticated]);

    const handleCloseButtonClick = () => {
        closeDialog();
        setID(null);
        setDialogData({});
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setDialogData({ ...dialogData, [name]: value });
        setUpdated(true);
    };

    const onSubmitClick = async (e) => {
        e.preventDefault();
        const formData = {
            task: dialogData,
        };
        try {
            const response = await TaskAPI.updateTask(id, formData);
            if (response.message) {
                closeDialog();
                if (updated) {
                    const responseNew = await TaskAPI.getTasks();
                    setTasks(responseNew);
                }
            } else {
                setError(response);
            }
        } catch (err) {
            setError(err);
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.editDialog}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <CloseButton onClick={handleCloseButtonClick} />
                </div>
                <div className={styles.dataWrapper}>
                    <form>
                        <div>
                            <label htmlFor="id">ID:</label>
                            <input
                                type="number"
                                id="id"
                                name="id"
                                value={dialogData?.id ?? ""}
                                onChange={onInputChange}
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={dialogData?.title ?? ""}
                                onChange={onInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={dialogData?.status ?? "not_set"}
                                onChange={onInputChange}
                            >
                                <option value="planned">Planned</option>
                                <option value="pending">Pending</option>
                                <option value="finished">Finished</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="priority">Priority:</label>
                            <select
                                id="priority"
                                name="priority"
                                value={dialogData?.priority ?? ""}
                                onChange={onInputChange}
                            >
                                <option value="not_set">Not Set</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="start_time">Start Time:</label>
                            <input
                                type="date"
                                id="start_time"
                                name="start_time"
                                value={dialogData?.start_time ?? ""}
                                onChange={onInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="end_time">End Time:</label>
                            <input
                                type="date"
                                id="end_time"
                                name="end_time"
                                value={dialogData?.end_time ?? ""}
                                onChange={onInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={dialogData?.description ?? ""}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className={styles.submitWrapper}>
                            <Button
                                onClick={onSubmitClick}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default EditDialog;
