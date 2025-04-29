import { useState } from 'react'
import { Dashboard } from './Dashboard'
import { Trends } from './Trends'
import { Transactions } from './Transactions'
import { About } from './About'

export function App({ children }) {

    // TODO: make setPage useContect so it doesnt need to be passed all the way down
    const [page, setPage] = useState('Dashboard')

    return (
        <div className="w-screen h-screen box-border">
            <Navbar page={page} setPage={setPage}/>
            { page === 'Dashboard' ? <Dashboard /> : null }
            { page === 'Trends' ? <Trends /> : null }
            { page === 'Transactions' ? <Transactions /> : null }
            { page === 'About' ? <About /> : null }
        </div>
    )
}

function Navbar({ page, setPage }) {
    return (
        <div className="bg-blue-400 w-full p-6 flex items-center justify-between">
            <p className="text-3xl text-center text-white font-bold">Finance Tracker</p>
            <Buttons page={page} setPage={setPage} />
        </div>
    )
}

function Buttons({ page, setPage }) {
    return (
        <div className="flex gap-4">
            <Button name='Dashboard' page={page} setPage={setPage} />
            <Button name='Trends' page={page} setPage={setPage} />
            <Button name='Transactions' page={page} setPage={setPage} />
            <Button name='About' page={page} setPage={setPage} />
        </div>
    )
}

function Button({ name, page, setPage }) {

    function updatePage() {
        setPage(name)
    }

    const color = page === name ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'

    return (
        <div className={color + ' rounded-full px-3 py-1 cursor-pointer hover:brightness-90 active:brightness-75'} onClick={(updatePage)} >
            {name}
        </div>
    )
}