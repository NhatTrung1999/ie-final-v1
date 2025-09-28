import { Fragment, type MouseEvent } from 'react';
import { TABLE_HEADER, type ITableData } from '../types/tablect';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setActiveItemId, setPath } from '../features/stagelist/stagelistSlice';
import { setActiveColId } from '../features/tablect/tablectSlice';

const TableCT = () => {
  const { tablect, activeColId } = useAppSelector((state) => state.tablect);
  const { activeItemId } = useAppSelector((state) => state.stagelist);
  const dispatch = useAppDispatch();

  const handleClickRow = (item: ITableData) => {
    const rowId = item.Id;
    if (rowId === activeItemId) {
      dispatch(setPath('null'));
      dispatch(setActiveItemId(null));
    } else {
      dispatch(setPath(item.Path));
      dispatch(setActiveItemId(rowId));
    }
    dispatch(setActiveColId(null));
  };

  const handleClickColumn = (
    e: MouseEvent<HTMLDivElement>,
    colId: string,
    rowId: string
  ) => {
    e.stopPropagation();
    if (!activeItemId) return;
    if (rowId !== activeItemId) return;
    dispatch(setActiveColId(colId));
  };

  const handleSync = () => {
    console.log('Sync');
  };
  const handleConfirm = () => {
    console.log('Confirm');
  };
  const handleExcelLSA = () => {
    console.log('Excel LSA');
  };
  const handleExcelTimeStudy = () => {
    console.log('Excel Time Study');
  };
  return (
    <div className="mt-2 border border-gray-500">
      <div className="bg-gray-500 text-white">
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="font-bold">TableCT</div>
          <div className="flex items-center gap-2">
            <div
              className="bg-red-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:opacity-70"
              onClick={handleSync}
            >
              Sync
            </div>
            <div
              className="bg-blue-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:opacity-70"
              onClick={handleConfirm}
            >
              Confirm
            </div>
            <div
              className="bg-green-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:opacity-70"
              onClick={handleExcelLSA}
            >
              Excel LSA
            </div>
            <div
              className="bg-green-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:opacity-70"
              onClick={handleExcelTimeStudy}
            >
              Excel Time Study
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto max-h-[450px]">
        <table className="w-full min-w-max">
          <thead className=" bg-gray-400 sticky top-0 text-white z-10">
            {TABLE_HEADER.map((item, i) => (
              <tr key={i}>
                <th className="px-4 py-4">{item.No}</th>
                <th className="px-4 py-4">{item.ProgressStagePartName}</th>
                <th className="px-4 py-4">{item.Type}</th>
                {Array.from({ length: item.Cts }).map((_, i) => (
                  <th key={i} className="px-4 py-4">
                    CT{i + 1}
                  </th>
                ))}
                <th className="px-4 py-4">{item.Average}</th>
                <th className="px-4 py-4">{item.MachineType}</th>
                <th className="px-4 py-4">{item.Confirm}</th>
                <th className="px-4 py-4">{item.Action}</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {tablect.map((item) => (
              <Fragment key={item.Id}>
                <tr
                  className={`cursor-pointer ${
                    item.Id === activeItemId ? 'bg-gray-300' : ''
                  }`}
                  onClick={() => handleClickRow(item)}
                >
                  <td
                    className="text-center border border-l-0 border-t-0 border-gray-400"
                    rowSpan={2}
                  >
                    {item.No}
                  </td>
                  <td
                    className="text-center border border-t-0 border-gray-400"
                    rowSpan={2}
                  >
                    {item.ProgressStagePartName}
                  </td>
                  <td className="text-center border border-t-0 border-gray-400">
                    {item.Nva.Type}
                  </td>
                  {item.Nva.Cts.map((ct, i) => (
                    <td
                      className={`text-center border border-t-0 border-gray-400 ${
                        `${item.Id}-${i + 1}` === activeColId
                          ? 'bg-amber-200'
                          : ''
                      }`}
                      key={i}
                      onClick={(e) =>
                        handleClickColumn(e, `${item.Id}-${i + 1}`, item.Id)
                      }
                    >
                      {ct}
                    </td>
                  ))}
                  <td className="text-center border border-t-0 border-gray-400">
                    {item.Nva.Average}
                  </td>
                  <td
                    className="text-center border border-t-0 border-gray-400 px-2"
                    rowSpan={2}
                  >
                    {item.MachineType ? (
                      item.MachineType
                    ) : (
                      <select className="border w-full py-1 rounded-md border-gray-400">
                        <option value="">May 1</option>
                        <option value="">May 2</option>
                        <option value="">May 3</option>
                        <option value="">May 4</option>
                      </select>
                    )}
                  </td>
                  <td
                    className="text-center border border-t-0 border-gray-400"
                    rowSpan={2}
                  >
                    {item.Confirm}
                  </td>
                  <td
                    className="text-center border border-r-0 border-t-0 border-gray-400 p-2"
                    rowSpan={2}
                  >
                    <div className="bg-green-500 px-2 py-1 text-white font-medium rounded-md">
                      Save
                    </div>
                  </td>
                </tr>
                <tr
                  className={`cursor-pointer ${
                    item.Id === activeItemId ? 'bg-gray-300' : ''
                  }`}
                  onClick={() => handleClickRow(item)}
                >
                  <td className="text-center border border-t-0 border-gray-400">
                    {item.Va.Type}
                  </td>
                  {item.Va.Cts.map((ct, i) => (
                    <td
                      className={`text-center border border-t-0 border-gray-400 ${
                        `${item.Id}-${i + 1}` === activeColId
                          ? 'bg-amber-200'
                          : ''
                      }`}
                      key={i}
                      onClick={(e) =>
                        handleClickColumn(e, `${item.Id}-${i + 1}`, item.Id)
                      }
                    >
                      {ct}
                    </td>
                  ))}
                  <td className="text-center border border-t-0 border-gray-400">
                    {item.Va.Average}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCT;
