
function App() {

    return (
        <div className="w-screen h-screen box-border">
            <Navbar />
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
            <Link name='Dashboard'/>
            <Link name='Breakdown'/>
            <Link name='Compare'/>
            <Link name='Transactions'/>
        </div>
    )
}

function Link({name}) {
    return (
        <div className="bg-blue-100 text-blue-500 rounded-full px-3 py-1">
            {name}
        </div>
    )
}

export default App
