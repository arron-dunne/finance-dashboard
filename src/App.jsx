import { Layout } from "./Layout"
import { Routes, Route } from "react-router"

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

function Transactions() {
    return (
        <p>Transactions</p>
    )
}

function Dashboard() {
    return (
        <p>Dashboard</p>
    )
}

function About() {
    return (
        <p>About Page</p>
    )
}
