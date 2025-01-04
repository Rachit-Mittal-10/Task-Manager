import { useEffect } from "react";
import DashboardAPI from "../api/DashboardAPI";
import { useState } from "react";

const DashboardPage = () => {

    const [ dashboard, setDashboard ] = useState("");
    const [ error, setError ] = useState("");

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await DashboardAPI.getDashboard();
                setDashboard(response.data);
            }
            catch(err){
                setError(err);
            }
        };
        fetchData();
    },[]);
    
    if(!dashboard){
        return (
            <div>Loading!!!</div>
        );
    }
    console.log(dashboard);
    return (
        <div className="dashboard" >
            <div>
                <h2>Dashboard Page</h2>
            </div>
            <div>
                <p>Message: {dashboard && dashboard.message}</p>
                <p>Total Count: {dashboard && dashboard.totalCount}</p>
                <p>Time Lapsed: {dashboard && JSON.stringify(dashboard.timeLapsedResult)}</p>
                <p>Count Status: {dashboard && JSON.stringify(dashboard.countStatusresult)}</p>
                <p></p>
            </div>
        </div>
    );
};

export default DashboardPage;
