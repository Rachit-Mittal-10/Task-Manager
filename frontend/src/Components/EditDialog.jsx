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

    return (
        <dialog ref={dialogRef} >
            <div>
                <button onClick={handleCloseButtonClick}>
                    <img src={close} alt="close button" />
                </button>
            </div>
            <div>
                <p>{JSON.stringify(dialogData)}</p>
            </div>
        </dialog>
    );
};

export default EditDialog;