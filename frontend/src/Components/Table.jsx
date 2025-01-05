import styles from "./Table.module.scss";

const Table = (props) => {
    const data = props.data;
    const columns = props.columns;
    const onRowClick = props.onRowClick;
    const uniqueKey = props.uniqueKey;

    const handleRowClick = (row) => {
        if(onRowClick){
            onRowClick(row[uniqueKey]);
        }
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((columns, index) => (
                        <th key={index}>{columns.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} onClick={() => {handleRowClick(row)}}>
                        {columns.map((column, index) => (
                            <td key={index}>{row[column.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
