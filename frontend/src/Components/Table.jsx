const Table = (props) => {
    const data = props.data;
    const columns = props.columns;
    return (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    {columns.map((columns, index) => (
                        <th key={index}>{columns.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
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
