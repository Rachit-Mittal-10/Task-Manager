import { useEffect, useState, useRef } from "react";
import TaskAPI from "../../api/TaskAPI";
import { checkArrayEmpty } from "../../utils/utils";
import Table from "../../components/Table/Table";
import EditDialog from "./components/EditDialog/EditDialog";
import styles from "./Tasks.module.scss";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import AddDialog from "./components/AddDialog/AddDialog";

const TasksPage = () => {
    const [tasks, setTasks] = useState(null);
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
                const response = await TaskAPI.getTasks();
                setTasks(response);
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

    const taskRows = tasks.data || [];

    const columns = [
        { label: "ID", key: "id" },
        { label: "Title", key: "title" },
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
                <p>Manage and update your work items from one place.</p>
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
                    <AddDialog dialogRef={addDialogRef} setTasks={setTasks} />
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
                    setTasks={setTasks}
                />
            </div>
        </div>
    );
};

export default TasksPage;
