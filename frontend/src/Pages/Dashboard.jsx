import { useEffect } from "react";
import DashboardAPI from "../api/DashboardAPI";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(CategoryScale,LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: "Count By Status",
                data: props.dataset,
                backgroundColor: 'rgba(75,192,192,0.5)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Count By Status'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />
};

const Table = (props) => {
    const data = props.data;
    return (
        <table border="1" style={{width: "100%", borderCollapse: "collapse"}}>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Time Lapsed</th>
                    <th>Balanced Time</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.status}</td>
                        <td>{row.priority}</td>
                        <td>{row.Time_Lapsed}</td>
                        <td>{row.Balanced_Time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

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

    const labels = dashboard.countStatusresult.map((item)=>item.status);
    const dataset = dashboard.countStatusresult.map((item)=>item.COUNT);

    return (
        <div className="dashboard" >
            <div>
                <h2>Dashboard Page</h2>
            </div>
            <div>
                <p>Message: {dashboard && dashboard.message}</p>
                <p>Total Count: {dashboard && dashboard.totalCount}</p>
            </div>
            <div>
                <Table data={dashboard.timeLapsedResult}/>
            </div>
            <div className="count-chart">
                <BarChart
                    labels={labels}
                    dataset={dataset}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
