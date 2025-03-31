import { PieChart } from '@mui/x-charts/PieChart'
import data from './data.json'

export function Dashboard() {

    // Sum category spending
    const income = []
    
    const outgoings = []

    data.forEach(transaction => {

        let chart = outgoings
        
        if (transaction.amount > 0) {
            chart = income
        }

        if (chart.find(cat => cat.label === transaction.category)) {
            chart.find(cat => cat.label === transaction.category).value += transaction.amount
        } 
        else {
            chart.push({
                label: transaction.category,
                value: transaction.amount
            })
        }
    })

    // round to 2 decimal places
    income.forEach(cat => {
        cat.value = cat.value.toFixed(2)
    })
    
    outgoings.forEach(cat => {
        cat.value = (-cat.value).toFixed(2)
    })

    return (
        <>
        <PieChart
            series={[{ data: income }]}
            width={500}
            // height={300}
            />
        <PieChart
            series={[{ data: outgoings }]}
            width={500}
            // height={300}
            />
        </>
    )
}