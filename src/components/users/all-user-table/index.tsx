import { observer } from "mobx-react";
import  { memo, useMemo, useRef, useState } from "react";
import { getAllUsersUrl } from "@api/const";
import style from './style.module.scss'
import Table from "@components/common-components/table";
import { allUsersColumnsData } from "../json-data";

const AllUsersTable = observer(() => {
  const [totalRecordRemaining, setTotalRecordRemaining] = useState(0);
  const [resetTable, setResetTable] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshTable, setRefreshTable] = useState(false);
  const tableRef = useRef(null);

  const columns = useMemo(() => allUsersColumnsData, [allUsersColumnsData])


  return (
    <div className={style.allUsersTable}>
      <Table
        ref={tableRef}
        className={style.tableStyle}
        dataUrl={getAllUsersUrl}
        columns={columns}
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
        setPageNumber={(data) => setPageNumber(data)}
        resetTable={resetTable}
        setResetTable={setResetTable}
        setTotalRecordRemaining={setTotalRecordRemaining}
      />
    </div>
  );
});

export default memo(AllUsersTable);
