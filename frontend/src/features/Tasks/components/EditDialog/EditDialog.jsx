import { useEffect, useState } from "react";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import styles from "./EditDialog.module.scss";
import TaskAPI from "../../../../api/TaskAPI";
import ProjectAPI from "../../../../api/ProjectAPI";
import { useAuth } from "../../../../context/AuthContext";
import Button from "../../../../components/Button/Button";

const EditDialog = (props) => {
    const dialogRef = props.dialogRef;
    const id = props.id;
    const setID = props.setID;
    const onTaskChange = props.onTaskChange;
    const [dialogData, setDialogData] = useState({});
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();
    const [updated, setUpdated] = useState(false);

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await ProjectAPI.getProjects();
            if (response?.ok) {
                setProjects(response?.data || []);
            }
        };

        fetchProjects();
    }, []);

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
                const taskData = response?.data || {};
                setDialogData({
                    ...taskData,
                    project_id: taskData?.project_id ? String(taskData.project_id) : "",
                });
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
        setError("");
        setUpdated(false);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setDialogData({ ...dialogData, [name]: value });
        setUpdated(true);
    };

    const onSubmitClick = async (e) => {
        e.preventDefault();
        const formData = { ...dialogData };
        if (!formData.project_id) {
            delete formData.project_id;
        } else {
            formData.project_id = Number(formData.project_id);
        }

        try {
            const response = await TaskAPI.updateTask(id, formData);
            if (response?.ok) {
                closeDialog();
                if (updated && onTaskChange) {
                    await onTaskChange();
                }
                handleCloseButtonClick();
            } else {
                setError(response?.error || response?.message || "Update failed");
            }
        } catch (err) {
            setError(err?.message || "Update failed");
        }
    };

    const onDeleteClick = async () => {
        if (!id) {
            return;
        }

        const shouldDelete = window.confirm("Delete this task?");
        if (!shouldDelete) {
            return;
        }

        try {
            const response = await TaskAPI.deleteTask(id);
            if (response?.ok) {
                if (onTaskChange) {
                    await onTaskChange();
                }
                handleCloseButtonClick();
            } else {
                setError(response?.error || response?.message || "Delete failed");
            }
        } catch (err) {
            setError(err?.message || "Delete failed");
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.editDialog}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h3>Edit Task</h3>
                    <CloseButton onClick={handleCloseButtonClick} />
                </div>
                <div className={styles.dataWrapper}>
                    {error && (
                        <p className={styles.error}>
                            {error}
                        </p>
                    )}
                    <form onSubmit={onSubmitClick}>
                        <div className={styles.field}>
                            <label htmlFor="id">ID</label>
                            <input
                                type="number"
                                id="id"
                                name="id"
                                value={dialogData?.id ?? ""}
                                onChange={onInputChange}
                                readOnly
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={dialogData?.title ?? ""}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="status">Status</label>
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
                            <label htmlFor="project_id">Project (optional)</label>
                            <select
                                id="project_id"
                                name="project_id"
                                value={dialogData?.project_id ?? ""}
                                onChange={onInputChange}
                            >
                                <option value="">No Project</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
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
                            />
                        </div>
                        <div className={styles.submitWrapper}>
                            <Button type="button" className={styles.deleteButton} onClick={onDeleteClick}>
                                Delete Task
                            </Button>
                            <Button type="submit" className={styles.submitButton}>
                                Update Task
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default EditDialog;
