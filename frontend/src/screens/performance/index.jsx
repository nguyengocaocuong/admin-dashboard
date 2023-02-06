import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import React from 'react'
import CustomColumnMenu from 'components/CustomColumnMenu'
import { useGetPerformanceQuery } from 'state/api'
import { useSelector } from 'react-redux'
const Performance = () => {
    const userId = useSelector(state => state.global.userId)
    const { data, isLoading } = useGetPerformanceQuery(userId)
    console.log(data)
    const theme = useTheme()
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params)=> params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 0.5,
            renderCell: (params)=> `$${Number(params.value).toFixed(2)}`
        }
    ]
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PERFORMANCE" subtitle="Track your Afiliate Sales here" />
            <Box
                mt="30px" height="68vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    }
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    rows={data && data.sales|| []}
                    getRowId={(row) => row._id}
                    columns={columns}
                    components={{
                        ColumnMenu: CustomColumnMenu
                    }}
                />
            </Box>
        </Box>
    )
}

export default Performance