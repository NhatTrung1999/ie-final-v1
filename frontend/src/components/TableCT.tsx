import React, { Fragment, useEffect, type MouseEvent } from 'react';
import Select from 'react-select';
import {
  TABLE_HEADER,
  type ITableCtPayload,
  type ITableData,
} from '../types/tablect';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setActiveItemId, setPath } from '../features/stagelist/stagelistSlice';
import {
  confirmData,
  deleteData,
  getData,
  getDepartmentMachineType,
  saveData,
  setActiveColId,
  setUpdateAverage,
} from '../features/tablect/tablectSlice';
import { setCurrentTime } from '../features/controlpanel/controlpanelSlice';

const TableCT = () => {
  const { tablect, activeColId, machineTypes } = useAppSelector(
    (state) => state.tablect
  );
  const { activeItemId, activeTabId } = useAppSelector(
    (state) => state.stagelist
  );
  const { auth } = useAppSelector((state) => state.auth);
  const category = localStorage.getItem('category');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getDepartmentMachineType());
  }, []);

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
    rowId: string,
    item: ITableData
  ) => {
    e.stopPropagation();
    const { Nva, Va } = item;
    const avgNva = Nva.Average;
    const avgVa = Va.Average;
    // console.log(avgNva, avgVa);
    if (!activeItemId) return;
    if (rowId !== activeItemId) return;
    if (avgNva && avgVa) return;

    dispatch(setActiveColId(colId));
  };

  const handleDone = (
    e: React.MouseEvent<HTMLDivElement>,
    item: ITableData
  ) => {
    e.stopPropagation();
    dispatch(
      setUpdateAverage({
        category,
        payload: item,
      })
    );
    dispatch(setActiveColId(null));
    dispatch(setCurrentTime(0));
  };

  const handleSync = () => {
    console.log('Sync');
  };
  const handleConfirm = () => {
    const newTablect: ITableCtPayload[] = tablect
      .filter((item) => item.ConfirmId === null)
      .map((item) => ({
        ...item,
        Nva: JSON.stringify(item.Nva),
        Va: JSON.stringify(item.Va),
        ConfirmId: auth?.UserID || '',
      }));
    dispatch(confirmData(newTablect));
  };
  const handleExcelLSA = () => {
    console.log('Excel LSA');
  };
  const handleExcelTimeStudy = () => {
    console.log('Excel Time Study');
  };

  const handleSave = (
    e: React.MouseEvent<HTMLDivElement>,
    item: ITableData
  ) => {
    e.stopPropagation();
    dispatch(
      saveData({
        Id: item.Id,
        No: item.No,
        ProgressStagePartName: item.ProgressStagePartName,
        Area: item.Area,
        Path: item.Path,
        Nva: JSON.stringify(item.Nva),
        Va: JSON.stringify(item.Va),
        MachineType: item.MachineType,
        IsSave: true,
        CreatedBy: 'admin',
      })
    );
    dispatch(setActiveItemId(null));
    dispatch(setPath(''));
    // dispatch(historyplaybackCreate(historyplayback));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, Id: string) => {
    e.stopPropagation();
    dispatch(deleteData(Id));
  };

  const handleCheckAction = (item: ITableData) => {
    // console.log(item);
    const avgNva = item.Nva.Average;
    const avgVa = item.Va.Average;
    if (avgNva > 0 && avgVa > 0) {
      if (item.IsSave) {
        return (
          <button
            className={`bg-red-500 px-2 py-1 text-white font-medium rounded-md ${
              item.ConfirmId !== null
                ? 'cursor-not-allowed opacity-70'
                : 'cursor-pointer'
            }`}
            onClick={(e) => handleDelete(e, item.Id)}
            disabled={item.ConfirmId !== null ? true : false}
          >
            Delete
          </button>
        );
      }
      return (
        <div
          className="bg-blue-500 px-2 py-1 text-white font-medium rounded-md"
          onClick={(e) => handleSave(e, item)}
        >
          Save
        </div>
      );
    }
    return (
      <div
        className="bg-green-500 px-2 py-1 text-white font-medium rounded-md"
        onClick={(e) => handleDone(e, item)}
      >
        Done
      </div>
    );
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
            <button
              className={`bg-blue-500 px-2 py-1 font-semibold rounded-md  ${
                tablect.length === 0
                  ? 'cursor-not-allowed opacity-70'
                  : 'cursor-pointer hover:opacity-70'
              }`}
              onClick={handleConfirm}
              disabled={tablect.length === 0 ? true : false}
            >
              Confirm
            </button>
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
            {tablect
              .filter((item) => item.Area === activeTabId)
              .map((item) => (
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
                          `${item.Id}_${i}` === activeColId
                            ? 'bg-amber-200'
                            : ''
                        }`}
                        key={i}
                        onClick={(e) =>
                          handleClickColumn(e, `${item.Id}_${i}`, item.Id, item)
                        }
                      >
                        {Number(ct.toFixed(2))}
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
                        // <select className="border w-full py-1 rounded-md border-gray-400">
                        //   <option value="">May 1</option>
                        //   <option value="">May 2</option>
                        //   <option value="">May 3</option>
                        //   <option value="">May 4</option>
                        // </select>
                        <Select
                          options={machineTypes}
                          menuPlacement="auto"
                          menuPortalTarget={document.body}
                          menuPosition="absolute"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                        />
                      )}
                    </td>
                    <td
                      className="text-center border border-t-0 border-gray-400"
                      rowSpan={2}
                    >
                      {item.ConfirmId}
                    </td>
                    <td
                      className="text-center border border-r-0 border-t-0 border-gray-400 p-2"
                      rowSpan={2}
                    >
                      {handleCheckAction(item)}
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
                          `${item.Id}_${i}` === activeColId
                            ? 'bg-amber-200'
                            : ''
                        }`}
                        key={i}
                        onClick={(e) =>
                          handleClickColumn(e, `${item.Id}_${i}`, item.Id, item)
                        }
                      >
                        {Number(ct.toFixed(2))}
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
