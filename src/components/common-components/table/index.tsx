import {useState, useEffect, useRef, forwardRef, useImperativeHandle, memo} from 'react';
import {Pagination, Table as AntdTable} from 'antd';
import styled from 'styled-components';
import {BaseApi} from '@api/baseApi';
import {AxiosResponse} from 'axios';
import {usePrevious} from '@utils/hooks/usePrevious';
import {getAuthorizationHeader} from '@api/common-utils';
import {ColumnType, TableProps} from 'antd/lib/table';
import { SkeletonHorizontalLoaderGray } from '../skeleton/horizontal-loader';
import { observer } from 'mobx-react';
import { catchApiError } from '@utils/common-functions';

interface Props extends TableProps<any> {
  dataUrl?: string;
  className?: string;
  responseDataParam?: string;
  responseCountParam?: string;
  columns: ColumnType<any>[];
  refreshTable?: boolean;
  resetTable?: boolean;
  queryParam?: object;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
  setResetTable?: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalRecordRemaining?: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
}

interface TableResponse {
  results: any;
  responseDataParam: any[];
  responseCountParam: number;
  count: number;
  isCancel?: boolean;
}

const Table = observer(forwardRef(({dataUrl, className, responseDataParam='',setPageNumber, responseCountParam='',refreshTable=false, columns, queryParam, resetTable, ...props}: Props, ref) => {
  const defaultParams = {
    ...queryParam,
    page_size: 10,
    page: 1
  };

  const sortedColumns = columns.find(e =>e.defaultSortOrder);
  if (sortedColumns && sortedColumns['sortField']) {
    const sortOrder = sortedColumns.defaultSortOrder === 'descend' ? '-': '';
    defaultParams['ordering'] = `${sortOrder}${sortedColumns['sortField']}`;
  }

  const [dataSource, setDataSource] = useState<any>([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);
  const [params, setParams] = useState(defaultParams);
  const baseApi = useRef(new BaseApi());
  const prevDataUrl = usePrevious(dataUrl);

  const generateLoadingColumns = () => {
    return columns.map(column => {
      return {
        ...column,
        render: () => {
          return (
            <div style={{width: column.width}}>
              <SkeletonHorizontalLoaderGray lightLoader width={column.width as number - (column.width as number * 0.35)} height='auto' skeletonHeight='10px' align={column.align} />
            </div>
          );
        },
      };
    });
  };

  const setPage =  pageNumber=>{
    setParams({...defaultParams, ...queryParam, page: pageNumber});
    if(setPageNumber)
      setPageNumber(pageNumber)
  }

  useEffect(() => {
    if(refreshTable){
      getTableData();
      props.setRefreshTable(false)
    }
  }, [refreshTable])

  useEffect(() => { 
    if(resetTable){
      setPage(1)
      getTableData();
      props.setResetTable(false)
    }
  }, [resetTable])

  useEffect(() => {
    setParams({...defaultParams, ...queryParam, page_size: params.page_size});
  }, [queryParam])

  const getTableData = async () => {
    if(dataUrl){
      try {
        setLoading(true);
        const {data}: AxiosResponse<TableResponse> = await baseApi.current.axios.get(
          dataUrl,
          {
            params: {...params},
            headers: {Authorization: await getAuthorizationHeader()},
            cancelToken: baseApi.current.cancelToken,
          });
        if (data.isCancel) {
          return false
        }
        else{
          setDataSource(responseDataParam ? data[responseDataParam] : data?.results?.docs);
          setTotal(responseCountParam ? data[responseCountParam] : data.results?.limit);
          props?.setTotalRecordRemaining && props?.setTotalRecordRemaining((responseDataParam ? data[responseDataParam] : data.results?.docs).length % params?.page_size);
          setLoading(false);

        }
      } catch (err) {
        catchApiError(err, "Common Table API Call Data")
        setLoading(false);
      } finally {
        setLoading(false)
      }
    }
    else{
      setLoading(false)
    }
  };

  const handlePaginationChange = (page, pageSize) => {
    if(setPageNumber)
      setPageNumber(page)
    setParams({...params, page, page_size: pageSize});
  };

  const handleTableChange = () => {
    setParams({...params});
  };

  useEffect(() => {
    if (prevDataUrl !== dataUrl) {
      setParams({...params, page: 1});
    }
    getTableData();
  }, [params, dataUrl]);

  useImperativeHandle(ref, () => ({
    reloadTable() {
      if (prevDataUrl !== dataUrl) {
        setParams({...params, page: 1});
      }
      getTableData();
    },
    getResults() {
      if (dataSource?.length) {
        return dataSource;
      }
    },
  }));

  return (
    <Wrapper className={className} isPagination={!dataSource.length}>
      <AntdTableStyled
        dataSource={dataSource}
        columns={loading ? generateLoadingColumns() : columns}
        pagination={false}
        onChange={handleTableChange}
        scroll = {{x: 'auto'}}
        {...props}
      >
      </AntdTableStyled>
      <PaginationStyled
        onChange={handlePaginationChange}
        total={total}
        pageSize={params['page_size']}
        current={params['page']}
      />
    </Wrapper>
  );
}))

export default memo(Table)

interface PaginationPropsTyps {
 isPagination: any;
}

const Wrapper = styled.div<PaginationPropsTyps>`
  background-color: #fff;
  padding: 10px;
  
  .ant-pagination{
      display: ${props => props.isPagination ? 'none' : 'visible'};
    }

  .common-component-input {
    background-color: #fff !important;
    &::placeholder {
      background-color: #fff !important;
    }
  }
`;

const AntdTableStyled = styled(AntdTable)`
  .ant-table-column-title {
    font-weight: 600;
    font-size: 12px;
  }

  .ant-table-thead {
    background: #F7F7F7;
    border-radius: 8px;
  }

  {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .ant-table-container table > thead > tr:last-child th:last-child {
    // border-top-right-radius: 8px;
    // border-bottom-right-radius: 8px;
  }

  .ant-table-column-sorters {
    display: inline-flex !important;
    ::before {
      width: 0;
    }
  }
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td {
    padding-top : 10px !important;
    padding-bottom : 10px !important;
  }
 
  .ant-table-tbody > tr:last-child td {
    border-bottom: transparent !important;
    margin-right:0 !important;
    
  }

  .ant-table-tbody > tr:first-child td {
    border-top: transparent !important;
  }
   .ant-table-container table > tbody > tr > td {
    height: 60px;
    padding: 5px 15px !important;
    border-bottom:1px solid #F4F4F4;
    margin:0 25px !important;
  }

  .ant-table-container table > tbody > tr:nth-child(2) td {
    padding-top: 30px;
    padding-bottom:10px;
    margin-left:0 !important;
    
  }

  .ant-table-container table > tbody > tr:nth-child(1) td {
    border-bottom:transparent !important;
  }

  .ant-table-container table > tbody > tr td:first-child {
    margin: 0 5px;  
    font-size:12px !important;
    padding-left:5px !important;
  }
  
  .ant-table-column-sorter {
    margin-left: 5px;
  }
  tr{
    box-shadow: none;
  }
`;

const PaginationStyled = styled(Pagination)`
  padding: 12px 25px;  
  text-align: right;
  margin-top: 10px;
  border-top: 1px solid #E8E8E8!important;

  .ant-pagination-item{
    min-width: 25px !important;
    height:25px !important;
  }
  .ant-pagination-prev {
    width:25px !important;
  height:25px !important;
  }
  .ant-pagination-next{
    width:25px !important;
  height:25px !important;
  }
  .ant-pagination-disabled{
    min-width: 25px !important;
  height:25px !important;
  }
  .ant-pagination-item-link  span  svg {
    display:flex;
    margin-bottom:2px;
    align-items:center;
    justify-content:center;
  }
  .ant-pagination-prev{
    min-width:25px !important;
    max-height:25px !important;
  }
  .ant-pagination-next{
    min-width:25px !important;
    max-height:25px !important;
  }
  .ant-pagination-options{
    height:25px;
  }
  .ant-pagination{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top:10px;
    margin-right:15px;
    
  }
`;
