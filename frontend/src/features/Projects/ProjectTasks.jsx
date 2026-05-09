import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ProjectAPI from "../../api/ProjectAPI.js";
import TaskAPI from "../../api/TaskAPI.js";
import Table from "../../components/Table/Table.jsx";
import { checkArrayEmpty } from "../../utils/utils.js";
import Button from "../../components/Button/Button.jsx";
import styles from "./ProjectTasks.module.scss";

const ProjectTasksPage = () => {
    const { projectId } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [error, setError] = useState("");

    const parsedProjectId = useMemo(() => Number(projectId), [projectId]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        if (Number.isNaN(parsedProjectId)) {
            setError("Invalid project id");
            return;
        }

        const fetchData = async () => {
            try {
                const [projectResponse, tasksResponse] = await Promise.all([
                    ProjectAPI.getProject(parsedProjectId),
                    TaskAPI.getTasks(),
                ]);

                if (!projectResponse?.ok) {
                    setError(projectResponse?.error || projectResponse?.message || "Failed to load project");
                    return;
                }

                if (!tasksResponse?.ok) {
                    setError(tasksResponse?.error || tasksResponse?.message || "Failed to load tasks");
                    return;
                }

                setProject(projectResponse.data || null);
                setTasks(tasksResponse.data || []);
            } catch (err) {
                setError(err?.message || "Failed to load project tasks");
            }
        };

        fetchData();
    }, [isAuthenticated, parsedProjectId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!project || !tasks) {
        return <div>Loading!!!</div>;
    }

    const projectTasks = tasks.filter((task) => Number(task.project_id) === parsedProjectId);

    const columns = [
        { label: "ID", key: "id" },
        { label: "Title", key: "title" },
        { label: "Status", key: "status" },
        { label: "Priority", key: "priority" },
    ];

    return (
        <div className={styles.projectTasks}>
            <div className={styles.header}>
                <h2>Project Tasks</h2>
                <p>{project.name || "Untitled project"}</p>
            </div>

            <div className={styles.actionRow}>
                <Button className={styles.backButton} onClick={() => navigate("/projects")}>
                    Back to Projects
                </Button>
            </div>

            <div className={styles.summaryCard}>
                <h3>Associated Tasks</h3>
                <p>{projectTasks.length}</p>
            </div>

            {!checkArrayEmpty(projectTasks) ? (
                <div className={styles.tableWrapper}>
                    <Table data={projectTasks} columns={columns} uniqueKey={"id"} />
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>No tasks are associated with this project yet.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectTasksPage;
