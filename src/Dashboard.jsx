import { PieChart } from '@mui/x-charts/PieChart'

export function Dashboard() {

    return (
        <PieChart
            series={[{
                data: [
                    {value: 2, lable: 'Entertainment'},
                    {value: 5, lable: 'Groceries'}
                ]    
            }]}
            width={500}
            height={300}
        />
    )
}