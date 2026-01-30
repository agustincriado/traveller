// src/components/Table.tsx
type TableProps<T extends Record<string, string | number>> = {
  title?: string;
  rows: T[];
};

export default function Table<T extends Record<string, string | number>>({
  title,
  rows,
}: TableProps<T>) {
  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (
    <div className="space-y-2">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left p-2 border-b border-gray-300 dark:border-gray-600"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {headers.map((h) => (
                <td
                  key={h}
                  className="p-2 border-b border-gray-200 dark:border-gray-700 opacity-90"
                >
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
