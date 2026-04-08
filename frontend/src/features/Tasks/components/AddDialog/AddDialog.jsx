import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddDialog.module.scss";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import Button from "../../../../components/Button/Button";
import TaskAPI from "../../../../api/TaskAPI";

const AddDialog = (props) => {
    const dialogRef = props.dialogRef;
    const [ dialogData, setDialogData ] = useState({});
    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleCloseButtonClick = () => {
        closeDialog();
        setDialogData({});
    };

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setDialogData({...dialogData, [name]: value});
    };

    const onSubmitClick = (e) => {
        e.preventDefault();
        const formData = dialogData;
        console.log(formData);
        try{
            const response = TaskAPI.createTask(formData);
            closeDialog();
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.addDialog}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <CloseButton onClick={handleCloseButtonClick} />
                </div>
                <div className={styles.dataWrapper}>
                    <form>
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
                            <label htmlFor="title">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={dialogData?.status ?? "planned"}
                                onChange={onInputChange}
                            >
                                <option value="planned">Planned</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
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
                            <label htmlFor="start">Start Time:</label>
                            <input
                                type="date"
                                id="start"
                                name="start"
                                value={dialogData?.start ?? ""}
                                onChange={onInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="end">End Time:</label>
                            <input
                                type="date"
                                id="end"
                                name="end"
                                value={dialogData?.end ?? ""}
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
                        <div>
                            <Button
                                type="submit"
                                onClick={onSubmitClick}
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

export default AddDialog;