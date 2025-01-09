import TaskAPI from "../api/TaskAPI";
import { useEffect, useState, useRef } from "react";
import { checkArrayEmpty } from "../utils/utils";
import Table from "../Components/Table";
import EditDialog from "../Components/EditDialog";

const TasksPage = () => {
    const [ tasks, setTasks ] = useState("");
    const [ error, setError ] = useState("");
    const [ id, setID ] = useState(null);
    const dialogRef = useRef(null);
    
    useEffect(()=>{
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
    },[]);
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
        <div className="task-page">
            <div>
                <h2>Tasks Page</h2>
            </div>
            {!checkArrayEmpty(tasks.data) && (
                <div className="table-wrapper">
                    <Table data={tasks.data} columns={columns} onRowClick={onRowClick} uniqueKey={"id"}/>
                </div>
            )}
            <EditDialog dialogRef={dialogRef} id={id} setID={setID} />
        </div>
    );
};

export default TasksPage;
