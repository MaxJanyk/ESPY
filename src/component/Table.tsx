import * as React from 'react'
import table_ from '../sass/table.module.sass'
import {useDispatch, useSelector} from '../store'
import {fetchTableData, refreshTableData} from '../store/common/actionCreator'
import {Box, Grid, Table as TableMui, TableBody, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {Pagination} from '@material-ui/lab'

// const data = {
//   list: [
//     {'environment': 'string', 'length': 0, 'key': 'string', 'secret': 'string'},
//     {'environment': 'string', 'length': 0, 'key': 'string', 'secret': 'string'},
//     {'environment': 'string', 'length': 0, 'key': 'string', 'secret': 'string'},
//     {'environment': 'string', 'length': 0, 'key': 'string', 'secret': 'string'},
//     {'environment': 'string', 'length': 0, 'key': 'string', 'secret': 'string'},
//     {'environment': 'string', 'length': 0, 'key': 'string', 'secret': 'string'},
//   ],
//   count: 100
// }

const defaultLimit = 6
const defaultOffset = 0

type Props = {
  title: string
  navigation?: any
  header: React.FC
  renderBody: (row: any, idx: number) => JSX.Element
  url?: string
  data?: any[] | null
  pagination?: boolean
}

export const Table = ({url, title, navigation: Navigation, header: Header, renderBody, pagination}: Props) => {
  const dispatch = useDispatch()

  const data = useSelector(state => state.common.tableData)
  const refresh = useSelector(state => state.common.tableRefresh)

  const doRequest = React.useCallback(() => {
    if (url) dispatch(fetchTableData(url, defaultOffset, defaultLimit))
  }, [dispatch, url])

  React.useEffect(() => {
    if (data === null) doRequest()
  }, [data, doRequest])

  React.useEffect(() => {
    if (refresh) {
      doRequest()
      dispatch(refreshTableData(false))
    }
  }, [refresh, doRequest, dispatch])

  const count = React.useMemo(() => {
    if (data?.count) return Math.ceil(data?.count / 6)
    else return 1
  }, [data])

  const handleChangePage = (event: any, page: number) => {
    const offset = (page - 1) * defaultLimit
    if (url) dispatch(fetchTableData(url, offset, defaultLimit))
  }

  return (
    <>
      <TableContainer className={table_.root}>
        <Grid className={table_.nav} container>
          <Grid className={table_.nav__title} item>{title}</Grid>
          <Grid item>{Navigation && <Navigation/>}</Grid>
        </Grid>
        <TableMui>
          <TableHead className={table_.header}>
            <TableRow>
              <Header/>
            </TableRow>
          </TableHead>
          <TableBody className={table_.body}>
            {data?.list?.map((row, idx) => (
              <TableRow key={idx}>
                {renderBody(row, idx)}
              </TableRow>
            ))}
          </TableBody>
        </TableMui>
      </TableContainer>

      {pagination && (
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box mt={2}>
              <Pagination
                className={table_.pagination}
                count={count}
                shape="rounded"
                onChange={handleChangePage}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}