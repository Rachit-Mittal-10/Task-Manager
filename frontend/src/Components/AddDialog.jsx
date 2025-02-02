import styles from "./AddDialog.module.scss";
import { useEffect, useState } from "react";
import CloseButton from "./CloseButton";
import Button from "./Button";

const AddDialog = (props) => {
    const dialogRef = props.dialogRef;
    const [ dialogData, setDialogData ] = useState({});
    const [ error, setError ] = useState("");

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleCloseButtonClick = () => {
        closeDialog();
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
                            />
                        </div>
                        <div>
                            <label htmlFor="title">Status:</label>
                            <select
                                id="status"
                                name="status"
                            >
                                <option value="not_set">Not Set</option>
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
                            >
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
                            />
                        </div>
                        <div>
                            <label htmlFor="end_time">End Time:</label>
                            <input
                                type="date"
                                id="end_time"
                                name="end_time"
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                            />
                        </div>
                        <div>
                            <Button type="submit" text="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AddDialog;