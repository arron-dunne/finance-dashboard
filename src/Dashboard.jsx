import { PieChart } from '@mui/x-charts/PieChart'
import data from './data.json'
import { useState } from 'react'

export function Dashboard() {

    // const [dateRange, setDateRange] = useState({
    //     start:,
    //     end:
    // })

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

    // sort
    income.sort((a, b) => b.value - a.value)
    outgoings.sort((a, b) => b.value - a.value)

    // total
    const incomeTotal = income.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
    const outgoingsTotal = outgoings.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
    const netTotal = incomeTotal + outgoingsTotal

    const totals = { incomeTotal, outgoingsTotal, netTotal }

    // round
    income.forEach(cat => {
        cat.value = cat.value.toFixed(2)
    })

    outgoings.forEach(cat => {
        cat.value = (-cat.value).toFixed(2)
    })

    return (
        <div className='p-8 flex flex-col gap-8'>
            <DateRange />
            <div className='flex justify-center gap-8 md:gap-20'>
                <div className='flex flex-col gap-8 items-center'>
                    <p className='text-lg font-bold underline'>Income</p>
                    <div className='w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96'>
                        <PieChart
                            series={[{ data: income }]}
                            slotProps={{ legend: { hidden: true } }}
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
                            slotProps={{ legend: { hidden: true } }}
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
            <div className='flex justify-center'>
                <DashboardTable income={income} outgoings={outgoings} totals={totals} />
            </div>
        </div>
    )
}

function DateRange() {
    return(
        <div className='flex justify-center'>
            <div className='w-20 p-2 bg-blue-300 text-center'>Day</div>
            <div className='w-20 p-2 bg-blue-300 text-center'>Week</div>
            <div className='w-20 p-2 bg-blue-300 text-center'>Month</div>
            <div className='w-20 p-2 bg-blue-300 text-center'>Year</div>
            <div className='w-20 p-2 bg-blue-300 text-center'>Custom</div>

        </div>
    )
}

function DashboardTable({ income, outgoings, totals }) {
    return (
        <table>
            <tbody>
                <tr className='border'>
                    <td className='px-4 py-2 font-bold'>Income</td>
                    <td className='px-4 py-2 font-bold'>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(totals.incomeTotal.toFixed(2))}</td>
                </tr>
                {income.map((transaction, index) => (
                    <tr key={index} className='border'>
                        <td className="px-4 py-2">{transaction.label}</td>
                        <td className="px-4 py-2">{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(transaction.value)}</td>
                    </tr>
                ))}

                <tr className='border'>
                    <td className='px-4 py-2 font-bold'>Outgoings</td>
                    <td className='px-4 py-2 font-bold'>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(totals.outgoingsTotal.toFixed(2))}</td>
                </tr>
                {outgoings.map((transaction, index) => (
                    <tr key={index} className='border'>
                        <td className="px-4 py-2">{transaction.label}</td>
                        <td className="px-4 py-2">{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(transaction.value)}</td>

                    </tr>
                ))}

                <tr className='border'>
                    <td className='px-4 py-2 font-bold'>Total</td>
                    <td className='px-4 py-2 font-bold' style={{ 'color': totals.netTotal > 0 ? 'green' : 'red'}}>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(totals.netTotal.toFixed(2))}</td>
                </tr>

            </tbody>
        </table>
    )
}