import { useEffect, useState } from "react";
import close from "../assets/images/close.png";
import styles from "./EditDialog.module.scss";
import TaskAPI from "../api/TaskAPI";


const EditDialog = (props) => {
    const dialogRef = props.dialogRef;
    const id = props.id;
    const setID = props.setID;
    const [ dialogData, setDialogData ] = useState({});

    useEffect(() => {
        const fetchData = async (id) => {
            if(!id){
                if(dialogRef.current){
                    dialogRef.current.close();
                }
                return;
            }
            try{
                const response = await TaskAPI.getTask(id);
                console.log(response);
                setDialogData(response);
            }
            catch(err){
                console.log(err);
                if(dialogRef.current){
                    dialogRef.current.close();
                }
            }
        }
        fetchData(id);
    },[id])

    const handleCloseButtonClick = () => {
        if(dialogRef.current){
            dialogRef.current.close();
        }
        setID(null);
        setDialogData({});
    };

    const onInputChange = (e) => {
        const [name, value] = e.target;
        setDialogData({...dialogData, name:value});
        console.log(dialogData[name]);
        console.log(value);
    };

    const onSubmitClick = () => {};

    return (
        <dialog ref={dialogRef} className={styles.editDialog} >
            <div className={styles.header}>
                <button onClick={handleCloseButtonClick} className={styles.closeButton}>
                    <img src={close} alt="close button" className={styles.closeImage} />
                </button>
            </div>
            <div className={styles.dataWrapper}>
                <form>
                    <div>
                        <label htmlFor="id">ID:</label>
                        <input type="number" id="id" name="id" value={dialogData?.data?.id ?? ""} onChange={onInputChange} />
                    </div>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={dialogData?.data?.title ?? ""} onChange={onInputChange} />
                    </div>
                    <div>
                        <label htmlFor="status">Status:</label>
                        <input type="text" id="status" name="status" value={dialogData?.data?.status ?? ""} onChange={onInputChange} />
                    </div>
                    <div>
                        <label htmlFor="priority">Priority:</label>
                        <input type="text" id="priority" name="priority" value={dialogData?.data?.priority ?? ""} onChange={onInputChange} />
                    </div> 
                    <div>
                        <label htmlFor="start_time">Start Time:</label>
                        <input type="date" id="start_time" name="start_time" value={dialogData?.data?.start_time ?? ""} onChange={onInputChange} />
                    </div>
                    <div>
                        <label htmlFor="end_time">End Time:</label>
                        <input type="date" id="end_time" name="end_time" value={dialogData?.data?.end_time ?? ""} onChange={onInputChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" value={dialogData?.data?.description ?? ""} onChange={onInputChange} />
                    </div>
                    <div className={styles.submitWrapper}>
                        <button className={styles.submitButton}>Submit</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditDialog;