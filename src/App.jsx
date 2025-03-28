import { Routes, Route } from "react-router"
import { Layout } from "./Layout"
import { About } from "./About"
import { Transactions } from "./Transactions"

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/finance-dashboard/' element={<Dashboard />} />
                <Route path="/finance-dashboard/about" element={<About />} />
                <Route path='/finance-dashboard/transactions' element={<Transactions />} />
            </Routes>
        </Layout>
    )
}

function Dashboard() {
    return (
        <p>Dashboard</p>
    )
}