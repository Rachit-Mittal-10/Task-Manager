import { useState } from "react";
import styles from "./AddDialog.module.scss";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import Button from "../../../../components/Button/Button";
import TaskAPI from "../../../../api/TaskAPI";

const AddDialog = (props) => {
    const dialogRef = props.dialogRef;
    const setTasks = props.setTasks;
    const [dialogData, setDialogData] = useState({
        status: "planned",
        priority: "not_set",
    });
    const [error, setError] = useState("");

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleCloseButtonClick = () => {
        closeDialog();
        setDialogData({ status: "planned", priority: "not_set" });
        setError("");
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setDialogData({ ...dialogData, [name]: value });
    };

    const onSubmitClick = async (e) => {
        e.preventDefault();
        setError("");
        const formData = dialogData;
        try {
            const response = await TaskAPI.createTask(formData);
            if (response?.ok) {
                const responseNew = await TaskAPI.getTasks();
                setTasks(responseNew);
                handleCloseButtonClick();
            } else {
                setError(response?.error || response?.message || "Failed to create task");
            }
        } catch (err) {
            setError(err?.message || "Failed to create task");
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.addDialog}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h3>Add Task</h3>
                    <CloseButton onClick={handleCloseButtonClick} />
                </div>
                <div className={styles.dataWrapper}>
                    {error && <p className={styles.error}>{error}</p>}
                    <form onSubmit={onSubmitClick}>
                        <div className={styles.field}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={dialogData?.title ?? ""}
                                onChange={onInputChange}
                                placeholder="Task title"
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="title">Status</label>
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
                        <div className={styles.field}>
                            <label htmlFor="priority">Priority</label>
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
                        <div className={styles.field}>
                            <label htmlFor="start">Start Time</label>
                            <input
                                type="date"
                                id="start"
                                name="start"
                                value={dialogData?.start ?? ""}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="end">End Time</label>
                            <input
                                type="date"
                                id="end"
                                name="end"
                                value={dialogData?.end ?? ""}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={dialogData?.description ?? ""}
                                onChange={onInputChange}
                                rows={3}
                                placeholder="Optional notes"
                            />
                        </div>
                        <div className={styles.submitWrapper}>
                            <Button type="submit" className={styles.submitButton}>
                                Create Task
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AddDialog;