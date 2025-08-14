"use client";
import React from "react";
import styles from "./table.module.scss";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  customClass?: string;
  showTitle?: boolean | undefined;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  customNoDataMsg?: string;
}

function Table<T extends object>({
  columns,
  data,
  onRowClick,
  customNoDataMsg,
}: TableProps<T>): React.ReactElement {
  return (
    <div className={styles.Table}>
      <table className={styles.Table_table}>
        <thead className={styles.Table_table_head}>
          <tr className={styles.Table_table_head_row}>
            {columns.map((col) => (
              <td
                key={String(col.key)}
                className={`${styles.Table_table_head_data}`}
              >
                {col.header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className={styles.Table_table_body}>
          {data.map((row, index) => (
            <tr
              key={index}
              className={styles.Table_table_body_row}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`${styles.Table_table_body_row_data} ${col?.customClass}`}
                  title={col?.showTitle ? row[col.key as keyof T] : ""}
                >
                  {col.render
                    ? col.render(row)
                    : col.key in row
                    ? (row[col.key as keyof T] as React.ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className={styles.noData}>
                {customNoDataMsg ?? "No data available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
