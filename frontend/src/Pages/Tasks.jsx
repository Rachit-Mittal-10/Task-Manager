import TaskAPI from "../api/TaskAPI";
import { useEffect, useState } from "react";
import { checkArrayEmpty } from "../utils/utils";
import Table from "../Components/Table";
import close from "../assets/images/close.png";

const TasksPage = () => {
    const [ tasks, setTasks ] = useState("");
    const [ error, setError ] = useState("");
    const [ dialogStatus, setDialogStatus ] = useState(false);
    const [ dialogData, setDialogData ] = useState("");

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await TaskAPI.getTasks();
                console.log(`Response: ${JSON.stringify(response)}`);
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
        console.log(id);

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
            {dialogStatus && (
                <dialog>
                    <div>
                        <div><img src={close} alt="close sign"/></div>
                    </div>
                    <div>
                        {JSON.stringify(dialogData)}
                        {/* <form>
                            <div>
                            </div>
                        </form> */}
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default TasksPage;
