import styles from "./AddDialog.module.scss";
import { useState } from "react";
import CloseButton from "./CloseButton";
import Button from "./Button";
import TaskAPI from "../api/TaskAPI";
import { useNavigate } from "react-router-dom";

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