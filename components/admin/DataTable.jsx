"use client";

export default function DataTable({ columns, data, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D48C71]"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl md:rounded-3xl p-10 md:p-16 text-center text-gray-500 shadow-sm border border-gray-50 mx-4 md:mx-0">
        <p className="text-base font-medium text-gray-400">No records found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-50 overflow-hidden w-full">
      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              {columns.map((col, idx) => (
                <th key={idx} className="px-5 py-4 md:px-6 md:py-5 text-xs font-bold text-[#4B5E50] uppercase tracking-wider whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50/40 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-5 py-3.5 md:px-6 md:py-4 text-xs md:text-sm text-gray-600">
                    {/* Render function if present; else standard key */}
                    {col.render ? col.render(row) : row[col.key] || <span className="text-gray-300">-</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}