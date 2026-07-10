import React from 'react';

interface TableColumn {
  header: string;
  key: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableData {
  [key: string]: string | number | React.ReactNode;
}

interface TableTemplateProps {
  columns: TableColumn[];
  data: TableData[];
  title?: string;
  striped?: boolean;
  bordered?: boolean;
}

export function TableTemplate({
  columns,
  data,
  title,
  striped = true,
  bordered = true
}: TableTemplateProps) {
  return (
    <div className="my-6 overflow-x-auto">
      {title && (
        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          {title}
        </h4>
      )}
      <table className={`w-full ${bordered ? 'border border-gray-300 dark:border-gray-700' : ''}`}>
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`p-3 text-left font-semibold text-gray-900 dark:text-white ${
                  bordered ? 'border border-gray-300 dark:border-gray-700' : ''
                }`}
                style={{ 
                  width: column.width,
                  textAlign: column.align || 'left'
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={`
                ${striped && rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}
                hover:bg-gray-100 dark:hover:bg-gray-800
              `}
            >
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className={`p-3 ${
                    bordered ? 'border border-gray-200 dark:border-gray-800' : ''
                  }`}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}