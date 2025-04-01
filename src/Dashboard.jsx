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

    // sort by value
    income.sort((a, b) => b.value - a.value)
    outgoings.sort((a, b) => b.value - a.value)

    return (
        <div className='p-8 flex justify-center gap-8 md:gap-20'>
            <div className='flex flex-col gap-8 items-center'>
                <p className='text-lg font-bold underline'>Income</p>
                <div className='w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96'>
                    <PieChart
                        series={[{ data: income }]}
                        slotProps={{ legend: { hidden: true}}}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-8 items-center'>
                <p className='text-lg font-bold underline'>Outgoings</p>
                <div className='w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96'>
                    <PieChart
                        series={[{ data: outgoings }]}
                        slotProps={{ legend: { hidden: true}}}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}