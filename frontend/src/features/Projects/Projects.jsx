import { useEffect, useState, useRef } from "react";
import ProjectAPI from "../../api/ProjectAPI.js";
import { checkArrayEmpty } from "../../utils/utils.js";
import Table from "../../components/Table/Table.jsx";
import EditDialog from "./components/EditDialog/EditDialog.jsx";
import styles from "./Projects.module.scss";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";
import AddDialog from "./components/AddDialog/AddDialog.jsx";

const ProjectsPage = () => {
    const [projects, setProjects] = useState(null);
    const [error, setError] = useState("");
    const [id, setID] = useState(null);
    const editDialogRef = useRef(null);
    const addDialogRef = useRef(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        const fetchData = async () => {
            try {
                const response = await ProjectAPI.getProjects();
                setProjects(response);
            } catch (err) {
                setError(err?.message || "Failed to load projects");
            }
        };
        fetchData();
    }, [isAuthenticated]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!projects) {
        return <div>Loading!!!</div>;
    }

    const projectRows = projects.data || [];

    const columns = [
        { label: "ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
    ];

    const onRowClick = (id) => {
        setID(id);
        if (editDialogRef.current) {
            editDialogRef.current.showModal();
        }
    };

    const onAddClick = () => {
        if (addDialogRef.current) {
            addDialogRef.current.showModal();
        }
    };

    return (
        <div className={styles.projects}>
            <div className={styles.header}>
                <h2>Projects</h2>
            </div>

            <div className={styles.summaryCard}>
                <h3>Total Projects</h3>
                <p>{projectRows.length}</p>
            </div>

            <div className={styles.buttonWrapper}>
                <div className={styles.buttonInner}>
                    <Button onClick={onAddClick} className={styles.addButton}>
                        Add Project
                    </Button>
                </div>
                <div className={styles.dialogOverlay}>
                    <AddDialog dialogRef={addDialogRef} setProjects={setProjects} />
                </div>
            </div>

            {!checkArrayEmpty(projectRows) ? (
                <div className={styles.tableWrapper}>
                    <Table
                        data={projectRows}
                        columns={columns}
                        onRowClick={onRowClick}
                        uniqueKey={"id"}
                    />
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>No projects found. Create your first project.</p>
                </div>
            )}

            <div className={styles.dialogOverlay}>
                <EditDialog
                    dialogRef={editDialogRef}
                    id={id}
                    setID={setID}
                    setProjects={setProjects}
                />
            </div>
        </div>
    );
};

export default ProjectsPage;
