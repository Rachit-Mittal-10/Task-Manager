import { useEffect, useState, useRef } from "react";
import TaskAPI from "../../api/TaskAPI.js";
import ProjectAPI from "../../api/ProjectAPI.js";
import { checkArrayEmpty } from "../../utils/utils.js";
import Table from "../../components/Table/Table.jsx";
import EditDialog from "./components/EditDialog/EditDialog.jsx";
import styles from "./Tasks.module.scss";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";
import AddDialog from "./components/AddDialog/AddDialog.jsx";

const TasksPage = () => {
    const [tasks, setTasks] = useState(null);
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");
    const [id, setID] = useState(null);
    const editDialogRef = useRef(null);
    const addDialogRef = useRef(null);
    const { isAuthenticated } = useAuth();

    const refreshTasks = async () => {
        const response = await TaskAPI.getTasks();
        setTasks(response);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        const fetchData = async () => {
            try {
                const [tasksResponse, projectsResponse] = await Promise.all([
                    TaskAPI.getTasks(),
                    ProjectAPI.getProjects(),
                ]);

                setTasks(tasksResponse);
                setProjects(projectsResponse?.data || []);
            } catch (err) {
                setError(err?.message || "Failed to load tasks");
            }
        };
        fetchData();
    }, [isAuthenticated]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!tasks) {
        return <div>Loading!!!</div>;
    }

    const projectTitleMap = projects.reduce((map, project) => {
        map[project.id] = project.title;
        return map;
    }, {});

    const taskRows = (tasks.data || []).map((task) => ({
        ...task,
        project: task.project_id ? projectTitleMap[task.project_id] || "Unknown Project" : "No Project",
    }));

    const columns = [
        { label: "ID", key: "id" },
        { label: "Title", key: "title" },
        { label: "Project", key: "project" },
        { label: "Status", key: "status" },
        { label: "Priority", key: "priority" },
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
        <div className={styles.tasks}>
            <div className={styles.header}>
                <h2>Tasks</h2>
            </div>

            <div className={styles.summaryCard}>
                <h3>Total Tasks</h3>
                <p>{taskRows.length}</p>
            </div>

            <div className={styles.buttonWrapper}>
                <div className={styles.buttonInner}>
                    <Button onClick={onAddClick} className={styles.addButton}>
                        Add Task
                    </Button>
                </div>
                <div className={styles.dialogOverlay}>
                    <AddDialog dialogRef={addDialogRef} onTaskChange={refreshTasks} />
                </div>
            </div>

            {!checkArrayEmpty(taskRows) ? (
                <div className={styles.tableWrapper}>
                    <Table
                        data={taskRows}
                        columns={columns}
                        onRowClick={onRowClick}
                        uniqueKey={"id"}
                    />
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>No tasks found. Create your first task.</p>
                </div>
            )}

            <div className={styles.dialogOverlay}>
                <EditDialog
                    dialogRef={editDialogRef}
                    id={id}
                    setID={setID}
                    onTaskChange={refreshTasks}
                />
            </div>
        </div>
    );
};

export default TasksPage;
