import { TbListDetails } from 'react-icons/tb';
import { MdEditDocument } from 'react-icons/md'
import { Link } from 'react-router-dom';
import TableMessages from './TableMessages';


const Table = ({ data, loading }) => {
    return (
        <table className="table-fixed text-left w-4/5 shadow-lg">
            <thead className="border-b border-t font-medium w-[calc(100%-1rem)] table table-fixed">
                <tr className=''>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Patient Name</th>
                    <th className="px-6 py-4">Patient Address</th>
                    <th className="px-6 py-4">Hospital Name</th>
                    <th className="px-6 py-4">Bill Amount</th>
                    <th className="px-6 py-4">Action</th>
                </tr>
            </thead>

            {loading ?
                (<TableMessages message="Loading data..." />) : (
                    data.length > 0 ?
                        (
                            <tbody className='max-h-80 overflow-y-auto block'>
                                {data.map(({ id, fname, lname, street_address_1, street_address_2, city, state, county, zip, hospital_name, bill_amount }, index) =>

                                    <tr
                                        key={id}
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 w-full table table-fixed">
                                        <td className="px-6 py-4 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4">{fname + " " + lname}</td>
                                        <td className="px-6 py-4">{`${street_address_1}, ${street_address_2 ? street_address_2 + ' ,' : ' '} ${city}, ${county ? county + ' ,' : ' '} ${state}, ${zip} `}</td>
                                        <td className="px-6 py-4">{hospital_name}</td>
                                        <td className="px-6 py-4">{`$ ${bill_amount}`}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-x-3">
                                                <Link to={`/input-form/edit/${id}`}>
                                                    <MdEditDocument size={25} className='cursor-pointer hover:text-pink-500 text-gray-700' />
                                                </Link> |
                                                <Link to={`/details/${id}`}>
                                                    <TbListDetails size={25} className='cursor-pointer hover:text-pink-500 text-gray-700' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>) :
                        <TableMessages message="No data present. Please add bill details." />
                )}

        </table>
    )
}

export default Table