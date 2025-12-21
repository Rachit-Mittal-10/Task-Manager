import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export type WriteOutput = ResultSetHeader | ResultSetHeader[];
export type ReadOutput = RowDataPacket[] | RowDataPacket[][];

export type QueryOutput = WriteOutput | ReadOutput;

export type ExecuteOutput =[
    QueryOutput,
    FieldPacket | FieldPacket[]
];


