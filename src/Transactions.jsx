import data from './data.json'

export function Transactions() {

    return (
        <div className='p-6'>
            <div className='text-2xl pl-3 pb-1 w-full border-b'>
                <p>All Transactions</p>
            </div>
            {/* <table className="table-auto w-full"> */}
            <div className='flex justify-center mt-8'>
                <table className='rounded-md'>
                    <thead className='bg-gray-200 border'>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Account</th>
                            <th className="px-4 py-2">Currency</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(transaction => (
                            <tr className='border'>
                                <td className="px-4 py-2">{transaction.date}</td>
                                <td className="px-4 py-2">{transaction.account}</td>
                                <td className="px-4 py-2">{transaction.currency}</td>
                                <td className="px-4 py-2">{transaction.description}</td>
                                <td className="px-4 py-2">{transaction.category}</td>
                                <td className="px-4 py-2">{transaction.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}