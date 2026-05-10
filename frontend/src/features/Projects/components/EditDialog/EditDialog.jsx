import { useEffect, useState } from "react";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import styles from "./EditDialog.module.scss";
import ProjectAPI from "../../../../api/ProjectAPI";
import { useAuth } from "../../../../context/AuthContext";
import Button from "../../../../components/Button/Button";

const EditDialog = (props) => {
    const dialogRef = props.dialogRef;
    const id = props.id;
    const setID = props.setID;
    const setProjects = props.setProjects;
    const [dialogData, setDialogData] = useState({});
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();
    const [updated, setUpdated] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

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
                const response = await ProjectAPI.getProject(id);
                setDialogData(response?.data || {});
                setUpdated(false);
                setDeleteConfirm(false);
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
        setDeleteConfirm(false);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setDialogData({ ...dialogData, [name]: value });
        setUpdated(true);
    };

    const onSubmitClick = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await ProjectAPI.updateProject(id, dialogData);
            if (response?.ok) {
                closeDialog();
                if (updated) {
                    const responseNew = await ProjectAPI.getProjects();
                    setProjects(responseNew);
                }
            } else {
                setError(response?.error || response?.message || "Update failed");
            }
        } catch (err) {
            setError(err?.message || "Update failed");
        }
    };

    const onDeleteClick = async () => {
        if (!deleteConfirm) {
            setDeleteConfirm(true);
            return;
        }
        setError("");
        try {
            const response = await ProjectAPI.deleteProject(id);
            if (response?.ok) {
                const responseNew = await ProjectAPI.getProjects();
                setProjects(responseNew);
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
                    <h3>Edit Project</h3>
                    <CloseButton onClick={handleCloseButtonClick} />
                </div>
                <div className={styles.dataWrapper}>
                    {error && (
                        <p className={styles.error}>
                            {typeof error === "string" ? error : error?.message || error?.error || "An error occurred"}
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
                                required
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
                        <div className={styles.actionsWrapper}>
                            <Button
                                type="button"
                                className={deleteConfirm ? styles.confirmDeleteButton : styles.deleteButton}
                                onClick={onDeleteClick}
                            >
                                {deleteConfirm ? "Confirm Delete" : "Delete Project"}
                            </Button>
                            <Button type="submit" className={styles.submitButton}>
                                Update Project
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default EditDialog;
