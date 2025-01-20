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
} from "chart.js";
import Table from "../Components/Table.jsx";
import { checkArrayEmpty } from "../utils/utils.js";
import styles from "./Dashboard.module.scss";
import { useAuth } from "../context/AuthContext.jsx";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: "Count By Status",
                data: props.dataset,
                backgroundColor: "rgba(75,192,192,0.5)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Count By Status",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

const DashboardPage = () => {
    const [dashboard, setDashboard] = useState("");
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        const fetchData = async () => {
            try {
                const response = await DashboardAPI.getDashboard();
                setDashboard(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchData();
    }, [isAuthenticated]);

    if (!dashboard) {
        return <div>Loading!!!</div>;
    }

    const labels = dashboard.countStatusresult.map((item) => item.status);
    const dataset = dashboard.countStatusresult.map((item) => item.COUNT);

    const columns = [
        { label: "Status", key: "status" },
        { label: "Priority", key: "priority" },
        { label: "Balanced Time", key: "Balanced_Time" },
        { label: "Time Lapsed", key: "Time_Lapsed" },
    ];

    return (
        <div className={styles.dashboard}>
            <div>
                <h2>Dashboard Page</h2>
            </div>
            <div>
                <p>Total Count: {dashboard && dashboard.totalCount}</p>
            </div>
            {!checkArrayEmpty(dashboard.timeLapsedResult) && (
                <>
                    <div>
                        <Table
                            data={dashboard.timeLapsedResult}
                            columns={columns}
                        />
                    </div>
                </>
            )}
            {!checkArrayEmpty(dashboard.countStatusresult) && (
                <>
                    <div className="count-chart">
                        <BarChart labels={labels} dataset={dataset} />
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardPage;
