import { useEffect, useState, useRef } from "react";
import TaskAPI from "../../api/TaskAPI";
import { checkArrayEmpty } from "../../utils/utils";
import Table from "../../Components/Table/Table";
import EditDialog from "../../Components/EditDialog/EditDialog";
import styles from "./Tasks.module.scss";
import { useAuth } from "../../context/AuthContext";
import Button from "../../Components/Button/Button";
import AddDialog from "../../Components/AddDialog/AddDialog";

const TasksPage = () => {
    const [tasks, setTasks] = useState("");
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
                setError(err);
            }
        };
        fetchData();
    }, [isAuthenticated]);

    if (!tasks) {
        return <div>Loading!!!</div>;
    }

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
        if(addDialogRef.current){
            addDialogRef.current.showModal();
        }
    };

    return (
        <div className={styles.tasks}>
            <div>
                <h2>Tasks Page</h2>
            </div>
            <div className={styles.buttonWrapper}>
                <div>
                    <Button onClick={onAddClick}>
                        Add
                    </Button>
                </div>
                <div className={styles.dialogOverlay}>
                    <AddDialog
                        dialogRef={addDialogRef}
                    />
                </div>
            </div>
            {!checkArrayEmpty(tasks.data) && (
                <div className={styles.tableWrapper}>
                    <Table
                        data={tasks.data}
                        columns={columns}
                        onRowClick={onRowClick}
                        uniqueKey={"id"}
                    />
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
