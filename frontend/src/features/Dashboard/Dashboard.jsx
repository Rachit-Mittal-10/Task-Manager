import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import DashboardAPI from "../../api/DashboardAPI";
import Table from "../../components/Table/Table.jsx";
import styles from "./Dashboard.module.scss";
import { useAuth } from "../../context/AuthContext.jsx";

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
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        const fetchData = async () => {
            try {
                const response = await DashboardAPI.getDashboard();
                setDashboard(response);
            } catch (err) {
                setError(err?.message || "Failed to load dashboard");
            }
        };
        fetchData();
    }, [isAuthenticated]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!dashboard) {
        return <div>Loading!!!</div>;
    }

    const statusRows = Object.entries(dashboard.statusCounts || {}).map(
        ([status, count]) => {
            return {
                status,
                count,
            };
        },
    );

    const priorityRows = Object.entries(dashboard.priorityCounts || {}).map(
        ([priority, count]) => {
            return {
                priority,
                count,
            };
        },
    );

    const statusLabels = statusRows.map((item) => item.status);
    const statusDataset = statusRows.map((item) => item.count);

    const priorityLabels = priorityRows.map((item) => item.priority);
    const priorityDataset = priorityRows.map((item) => item.count);

    const statusColumns = [
        { label: "Status", key: "status" },
        { label: "Count", key: "count" },
    ];

    const priorityColumns = [
        { label: "Priority", key: "priority" },
        { label: "Count", key: "count" },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h2>Dashboard</h2>
            </div>

            <div className={styles.summaryCard}>
                <h3>Total Tasks</h3>
                <p>{dashboard.totalTasks || 0}</p>
            </div>

            <div className={styles.grid}>
                <div className={styles.panel}>
                    <h3>Status Overview</h3>
                    {statusRows.length > 0 ? (
                        <>
                            <Table data={statusRows} columns={statusColumns} />
                            <div className={styles.chart}>
                                <BarChart
                                    labels={statusLabels}
                                    dataset={statusDataset}
                                />
                            </div>
                        </>
                    ) : (
                        <p>No status data available.</p>
                    )}
                </div>

                <div className={styles.panel}>
                    <h3>Priority Overview</h3>
                    {priorityRows.length > 0 ? (
                        <>
                            <Table
                                data={priorityRows}
                                columns={priorityColumns}
                            />
                            <div className={styles.chart}>
                                <BarChart
                                    labels={priorityLabels}
                                    dataset={priorityDataset}
                                />
                            </div>
                        </>
                    ) : (
                        <p>No priority data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
