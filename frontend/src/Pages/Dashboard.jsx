import { useEffect } from "react";
import DashboardAPI from "../api/DashboardAPI";
import { useState } from "react";

const DashboardPage = async () => {
    const [ dashboard, setDashboard ] = useState(null);
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

    console.log(dashboard);
    
    if(!dashboard){
        return (
            <div>Loading!!!</div>
        );
    }
    
    return (
        <div className="dashboard" >
            <div>
                <h2>Dashboard Page</h2>
            </div>
            <div>
                <p>Total Count: {dashboard && dashboard.totalCount}</p>
            </div>
        </div>
    );
};

export default DashboardPage;
