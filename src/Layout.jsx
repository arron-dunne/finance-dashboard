export function Layout({ children }) {
    return (
        <div className="w-screen h-screen box-border">
            <Navbar />
            { children }
        </div>
    )
}

function Navbar() {
    return (
        <div className="bg-blue-400 w-full p-6 flex items-center justify-between">
            <p className="text-3xl text-center text-white font-bold">Finance Tracker</p>
            <Links />
        </div>
    )
}

function Links() {
    return (
        <div className="flex gap-4">
            <Link name='Dashboard' href='/finance-dashboard/' />
            <Link name='Breakdown'/>
            <Link name='Compare'/>
            <Link name='Transactions' href='/finance-dashboard/transactions'/>
            <Link name='About' href='/finance-dashboard/about'/>
        </div>
    )
}

function Link({name, href}) {
    return (
        <a className="bg-blue-100 text-blue-500 rounded-full px-3 py-1" href={href}>
            {name}
        </a>
    )
}