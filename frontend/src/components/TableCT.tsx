const TableCT = () => {
  return (
    <div className="mt-2 border border-gray-500">
      <div className="bg-gray-500 text-white">
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="font-bold">TableCT</div>
          <div className="flex items-center gap-2">
            <div className="bg-red-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:opacity-70">
              Sync
            </div>
            <div className="bg-blue-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:opacity-70">
              Confirm
            </div>
            <div className="bg-green-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:opacity-70">
              Excel LSA
            </div>
            <div className="bg-green-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:opacity-70">
              Excel Time Study
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto max-h-[450px]">
        <table className="w-full min-w-max">
          <thead className=" bg-gray-400 sticky top-0 text-white z-10">
            <tr>
              <th className="px-4 py-4">No</th>
              <th className="px-4 py-4">Progress Stage Part Name</th>
              <th className="px-4 py-4">Type</th>
              <th className="px-4 py-4">CT1</th>
              <th className="px-4 py-4">CT2</th>
              <th className="px-4 py-4">CT3</th>
              <th className="px-4 py-4">CT4</th>
              <th className="px-4 py-4">CT5</th>
              <th className="px-4 py-4">CT6</th>
              <th className="px-4 py-4">CT7</th>
              <th className="px-4 py-4">CT8</th>
              <th className="px-4 py-4">CT9</th>
              <th className="px-4 py-4">CT10</th>
              <th className="px-4 py-4">Average</th>
              <th className="px-4 py-4">Machine Type</th>
              <th className="px-4 py-4">Confirm</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <>
                <tr key={i}>
                  <td
                    className="text-center border border-l-0 border-t-0 border-gray-400"
                    rowSpan={2}
                  >
                    No
                  </td>
                  <td
                    className="text-center border border-t-0 border-gray-400"
                    rowSpan={2}
                  >
                    Progress Stage Part Name
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    NVA
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td
                    className="text-center border border-t-0 border-gray-400 px-2"
                    rowSpan={2}
                  >
                    <select className="border w-full py-1 rounded-md border-gray-400">
                      <option value="">May 1</option>
                      <option value="">May 2</option>
                      <option value="">May 3</option>
                      <option value="">May 4</option>
                    </select>
                  </td>
                  <td
                    className="text-center border border-t-0 border-gray-400"
                    rowSpan={2}
                  >
                    LYV26324
                  </td>
                  <td
                    className="text-center border border-r-0 border-gray-400 p-2"
                    rowSpan={2}
                  >
                    <div className="bg-green-500 px-2 py-1 text-white font-medium rounded-md">
                      Save
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center border border-t-0 border-gray-400">
                    VA
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    0
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCT;
