import React, { useState, useMemo } from 'react'
import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import OverviewChart from 'components/OverviewChart'
import { useGetSalesQuery } from 'state/api'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
const Daily = () => {
    const [startDate, setStartDate] = useState(new Date("2021-02-01"))
    const [endDate, setEndDate] = useState(new Date("2021-03-01"))
    const {data} = useGetSalesQuery()
    const theme = useTheme()
    const [formattedData] = useMemo(()=>{

    },[data]) //eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>Daily</div>
    )
}

export default Daily