import { PieChart } from '@mui/x-charts/PieChart'
import data from './data.json'
import { useState, useEffect } from 'react'

export function Dashboard() {

    const [dateRange, setDateRange] = useState({
        selection: 'Month',
        start: new Date(0),
        end: new Date(Date.now())
    })

    // set initial date range to the month of the last transaction
    useEffect(() => {

        const dates = data.map(transcation => Date.parse(transcation.date))

        const end = new Date(dates.reduce((max, cur) => cur > max ? cur : max))

        const start = new Date(end)

        start.setDate(1)

        setDateRange({
            selection: 'Month',
            start: start,
            end: end
        })
    }, [])

    // Sum category spending
    const income = []
    const outgoings = []

    data.forEach(transaction => {

        const date = Date.parse(transaction.date)

        // skip if not in date range
        if (date < dateRange.start || date > dateRange.end) {
            return
        }

        // set the right chart (outgoings or income)
        let chart = outgoings

        if (transaction.amount > 0) {
            chart = income
        }

        // check if category already exists, otherwise create it
        const cat = chart.find(cat => cat.label === transaction.category)
        
        if (cat) {
            cat.value += transaction.amount
        }
        else {
            chart.push({ label: transaction.category, value: transaction.amount })
        }
    })

    // sort
    income.sort((a, b) => b.value - a.value)
    outgoings.sort((a, b) => a.value - b.value)

    // total
    const incomeTotal = income.reduce((acc, cur) => acc + cur.value, 0)
    const outgoingsTotal = outgoings.reduce((acc, cur) => acc + cur.value, 0)
    const netTotal = incomeTotal + outgoingsTotal

    const totals = { incomeTotal, outgoingsTotal, netTotal }

    // round
    income.forEach(cat => { cat.value = cat.value.toFixed(2) })
    outgoings.forEach(cat => { cat.value = (-cat.value).toFixed(2) })


    return (
        <div className='p-8 flex flex-col gap-8'>
            <DateRange
                dateRange={dateRange}
                setDateRange={setDateRange}
            />
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
                <DashboardTable
                    income={income}
                    outgoings={outgoings}
                    totals={totals}
                />
            </div>
        </div>
    )
}

function DateRange({ dateRange, setDateRange }) {

    const [label, setLabel] = useState('')

    useEffect(() => {
        updateLabel(dateRange)
    }, [dateRange])


    // Update the label based on the date range selection
    function updateLabel({ selection, start, end }) {

        const monthFormat = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        })

        const weekFormat = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short'
        })

        switch (selection) {
            case 'Day':
                setLabel(end.toDateString())
                break
            case 'Week':
                setLabel(`${weekFormat.format(start)} - ${weekFormat.format(end)}`)
                break
            case 'Month':
                setLabel(monthFormat.format(start))
                break
            case 'Year':
                setLabel(end.getFullYear())
                break
        }
    }


    // Update the date range state and the label state
    function updateDateRange(selection) {

        let start = new Date(dateRange.start)
        let end = new Date(dateRange.end)

        switch (selection) {
            case 'Day':
                start = end
                end = end
                break
            case 'Week':
                start.setDate(end.getDate() - end.getDay())
                end.setDate(start.getDate() + 6)
                break
            case 'Month':
                start.setMonth(end.getMonth())
                start.setDate(1)
                end.setMonth(end.getMonth() + 1)
                end.setDate(0)
                break
            case 'Year':
                const year = end.getFullYear()
                start = new Date(year, 0, 1)
                end = new Date(year, 11, 31)
                break
        }

        setDateRange({
            selection: selection,
            start: start,
            end: end
        })
    }


    function toggleLeft() {
        
        let start = new Date(dateRange.start)
        let end = new Date(dateRange.end)

        switch (dateRange.selection) {
            case 'Day':
                start.setDate(start.getDate() - 1)
                end.setDate(end.getDate() - 1)
                break
            case 'Week':
                start.setDate(start.getDate() - 7)
                end.setDate(end.getDate() - 7)
                break
            case 'Month':
                start.setMonth(start.getMonth() - 1)
                end.setMonth(end.getMonth() - 1)
                break
            case 'Year':
                start.setFullYear(start.getFullYear() - 1)
                end.setFullYear(end.getFullYear() - 1)
                break
        }

        setDateRange({
            selection: dateRange.selection,
            start: start,
            end: end
        })
    }

    function toggleRight() {

        let start = new Date(dateRange.start)
        let end = new Date(dateRange.end)

        switch (dateRange.selection) {
            case 'Day':
                start.setDate(start.getDate() + 1)
                end.setDate(end.getDate() + 1)
                break
            case 'Week':
                start.setDate(start.getDate() + 7)
                end.setDate(end.getDate() + 7)
                break
            case 'Month':
                start.setMonth(start.getMonth() + 1)
                end.setMonth(end.getMonth() + 1)
                break
            case 'Year':
                start.setFullYear(start.getFullYear() + 1)
                end.setFullYear(end.getFullYear() + 1)
                break
        }

        setDateRange({
            selection: dateRange.selection,
            start: start,
            end: end
        })
    }

    return (
        <div>
            <div className='flex justify-center'>
                <DateRangeButton name='Day' selection={dateRange.selection} updateDateRange={updateDateRange} />
                <DateRangeButton name='Week' selection={dateRange.selection} updateDateRange={updateDateRange} />
                <DateRangeButton name='Month' selection={dateRange.selection} updateDateRange={updateDateRange} />
                <DateRangeButton name='Year' selection={dateRange.selection} updateDateRange={updateDateRange} />
                <DateRangeButton name='Custom' selection={dateRange.selection} updateDateRange={updateDateRange} />
            </div>
            <div className='flex justify-center items-center mt-4 gap-4'>
                <button className='w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer hover:brightness-90 active:brightness-75' onClick={toggleLeft}>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <p className='w-48 text-center'>{label}</p>
                <button className='w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer hover:brightness-90 active:brightness-75' onClick={toggleRight}>
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>
    )
}

function DateRangeButton({ name, selection, updateDateRange }) {
    return (
        <div className={`w-20 p-2 text-center cursor-pointer hover:brightness-90 active:brightness-75 ${selection === name ? 'bg-blue-300' : 'bg-gray-200'}`}
            onClick={() => updateDateRange(name)}>
            {name}
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
                    <td className='px-4 py-2 font-bold' style={{ 'color': totals.netTotal > 0 ? 'green' : 'red' }}>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(totals.netTotal.toFixed(2))}</td>
                </tr>

            </tbody>
        </table>
    )
}