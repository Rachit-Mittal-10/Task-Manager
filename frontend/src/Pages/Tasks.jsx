import TaskAPI from "../api/TaskAPI";
import { useEffect, useState, useRef } from "react";
import { checkArrayEmpty } from "../utils/utils";
import Table from "../Components/Table";
import EditDialog from "../Components/EditDialog";
import { useAuth } from "../context/AuthContext";
import styles from "./Tasks.module.scss";

const TasksPage = () => {
    const [ tasks, setTasks ] = useState("");
    const [ error, setError ] = useState("");
    const [ id, setID ] = useState(null);
    const dialogRef = useRef(null);
    const { isAuthenticated } = useAuth();

    useEffect(()=>{
        if(!isAuthenticated){
            return;
        }
        const fetchData = async () => {
            try{
                const response = await TaskAPI.getTasks();
                setTasks(response);
            }
            catch(err){
                setError(err);
            }
        };
        fetchData();
    },[isAuthenticated]);
    // Lovely: 9560070430

    if(!tasks){
        return (
            <div>
                Loading!!!
            </div>
        );
    }

    const columns = [
        {label: "ID", key: "id"},
        {label: "Title", key: "title"},
        {label: "Status", key: "status"},
        {label: "Priority", key: "priority"},
    ];

    const onRowClick = (id) => {
        setID(id);
        if(dialogRef.current){
            dialogRef.current.showModal();
        }
    };

    return (
        <div className={styles.tasks} >
            <div>
                <h2>Tasks Page</h2>
            </div>
            {!checkArrayEmpty(tasks.data) && (
                <div className={styles.tableWrapper} >
                    <Table data={tasks.data} columns={columns} onRowClick={onRowClick} uniqueKey={"id"}/>
                </div>
            )}
            <div className={styles.dialogOverlay} >
                <EditDialog dialogRef={dialogRef} id={id} setID={setID} setTasks={setTasks}/>
            </div>
        </div>
    );
};

export default TasksPage;
