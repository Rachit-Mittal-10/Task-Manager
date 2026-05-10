import { useState } from "react";
import styles from "./AddDialog.module.scss";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import Button from "../../../../components/Button/Button";
import ProjectAPI from "../../../../api/ProjectAPI";

const AddDialog = (props) => {
    const dialogRef = props.dialogRef;
    const setProjects = props.setProjects;
    const [dialogData, setDialogData] = useState({});
    const [error, setError] = useState("");

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleCloseButtonClick = () => {
        closeDialog();
        setDialogData({});
        setError("");
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setDialogData({ ...dialogData, [name]: value });
    };

    const onSubmitClick = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await ProjectAPI.createProject(dialogData);
            if (response?.ok) {
                const responseNew = await ProjectAPI.getProjects();
                setProjects(responseNew);
                handleCloseButtonClick();
            } else {
                setError(response?.error || response?.message || "Failed to create project");
            }
        } catch (err) {
            setError(err?.message || "Failed to create project");
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.addDialog}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h3>Add Project</h3>
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
                                placeholder="Project title"
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
                                placeholder="Project description"
                                rows={3}
                            />
                        </div>
                        <div className={styles.submitWrapper}>
                            <Button type="submit" className={styles.submitButton}>
                                Create Project
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AddDialog;
