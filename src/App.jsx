import { Routes, Route } from "react-router"
import { Layout } from "./Layout"
import { Dashboard } from "./Dashboard"
import { About } from "./About"
import { Transactions } from "./Transactions"
import { Trends } from "./Trends"

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/finance-dashboard/' element={<Dashboard />} />
                <Route path='/finance-dashboard/trends' element={<Trends />} />
                <Route path='/finance-dashboard/transactions' element={<Transactions />} />
                <Route path="/finance-dashboard/about" element={<About />} />
            </Routes>
        </Layout>
    )
}