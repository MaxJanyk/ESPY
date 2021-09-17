import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {format} from 'date-fns'
import Joi from 'joi'
import {useDispatch} from '../store'
import {deleteApikey} from '../store/apikey/actionCreator'
import content_ from '../sass/content.module.sass'
import {Button, Grid, TableCell, IconButton} from '@material-ui/core'
import {Edit as EditIcon, DeleteOutline as DeleteIcon} from '@material-ui/icons'
import {Page} from '../component/Page'
import {Table} from '../component/Table'
import {DialogCreateApiKey} from '../container/apikey/DialogCreate'
import {DialogEditApikey} from '../container/apikey/DialogEdit'
import {DialogAreYouSure} from '../component/DialogAreYouSure'

export function ApikeyPage() {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const [openCreate, setOpenCreate] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [editData, setEditData] = React.useState<any>(null)
  const [deleteId, setDeleteId] = React.useState<any>(null)
  const [sureDeleteOpen, setSureDeleteOpen] = React.useState(false)

  const TableHeader = () => (
    <>
      <TableCell>{t('apiKey.table.label')}</TableCell>
      <TableCell>{t('apiKey.table.environment')}</TableCell>
      <TableCell>{t('apiKey.table.created')}</TableCell>
      <TableCell style={{width: 100}}>{t('apiKey.table.action')}</TableCell>
    </>
  )

  const TableBody = (row: any, idx: number) => (
    <>
      <TableCell>{row.userPackages.package.name}</TableCell>
      <TableCell>Live</TableCell>
      <TableCell>{format(new Date(row.createdTime), 'dd.MM.yyyy')}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleEdit(row)}><EditIcon/></IconButton>
        <IconButton onClick={() => handleAskDelete(row.id)}><DeleteIcon/></IconButton>
      </TableCell>
    </>
  )

  const schemaPackage = Joi.number().required().not(0)
    .messages({'any.invalid': `"${t('apiKey.table.label')}": ${t('validation.required')}`})
  const schemaLength = Joi.number().required().min(16).max(32)

  const schemaPost = Joi.object({
    userPackagesId: schemaPackage,
    length: schemaLength,
  })

  const schemaEdit = Joi.object({
    length: schemaLength,
  })

  const handleEdit = (data: object) => {
    setOpenEdit(true)
    setEditData(data)
  }

  const handleAskDelete = (id: number) => {
    setDeleteId(id)
    setSureDeleteOpen(true)
  }

  return (
    <Page>
      <Grid container justifyContent="space-between">
        <Grid className={content_.title} item>{t('apiKey.title')}</Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => setOpenCreate(true)} disableElevation>
            {t('apiKey.createAPIkey')}
          </Button>
        </Grid>
      </Grid>

      <Table title={t('apiKey.title')} header={TableHeader} renderBody={TableBody} url="/api-keys" pagination/>

      {openCreate && <DialogCreateApiKey schema={schemaPost} handleClose={() => setOpenCreate(false)}/>}

      {openEdit && (
        <DialogEditApikey
          data={editData}
          schema={schemaEdit}
          handleClose={() => setOpenEdit(false)}
        />
      )}

      {sureDeleteOpen && (
        <DialogAreYouSure
          onYes={() => dispatch(deleteApikey(deleteId))}
          handleClose={() => setSureDeleteOpen(false)}
        />
      )}
    </Page>
  )
}