import OverallStat from "../model/OverallStat.js"
import Transaction from "../model/Transaction.js"
import User from "../model/User.js"

export const getUser = async (req, res)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}
export const getDashboardStats = async (req, res)=>{
    try{
        const currentMonth = "November"
        const currentYear = 2021
        const currentDay = "2021-11-15"

        const transactions = await Transaction.find().limit(50).sort({createOn: -1})
        const overallStat = await OverallStat.find({year: currentYear})
        const {
            totalCustomers, 
            yearlyTotalSoldUnits, 
            yearlySalesTotal, 
            monthlyData, 
            salesByCategory
        }= overallStat[0]

        const thisMonthStats = overallStat[0].monthlyData.find(({month})=>{
            return month === currentMonth
        })
        const dayStats = overallStat[0].dailyData.find(({date})=>{
            return date === currentDay
        })
        res.status(200).json({
            totalCustomers, 
            yearlyTotalSoldUnits, 
            yearlySalesTotal, 
            monthlyData, 
            salesByCategory,
            thisMonthStats,
            dayStats,
            transactions
        })

    }catch(error){
        res.status(200).json({message: error.message})
    }
}