import { IData } from "#common/types/IData.js";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export type WriteOutput = number | number[];
export type ReadOutput = IData[] | IData[][];

export type QueryOutput = WriteOutput | ReadOutput;