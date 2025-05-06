import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import { Layout } from "./Layout"
import { Dashboard } from "./Dashboard"
import { About } from "./About"
import { Transactions } from "./Transactions"
import { Trends } from "./Trends"
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/finance-dashboard/' element={<Dashboard />} />
                    <Route path='/finance-dashboard/trends' element={<Trends />} />
                    <Route path='/finance-dashboard/transactions' element={<Transactions />} />
                    <Route path="/finance-dashboard/about" element={<About />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </StrictMode>
)
