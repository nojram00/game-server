import Navbar from "@main/components/navbar"
import Sidebar from "@main/components/sidebar"
import { getSection, getSectionData } from "@main/models_v2/drizzle"
import TableData from "./tableData"

interface Params{
    sectionId : number
}
export default async function ClassInfo({ params } : { params : Params }) {
    const section = await getSectionData(params.sectionId)

    const headers = [
        'Name',
        'Username',
        'Pre Test',
        'Post Test',
        'Quantum Mastery',
        'Ecology Mastery',
        'Momentum Mastery',
        'Tera Mastery'
    ]

    const students = (typeof section?.students !== 'undefined' ? section?.students : [])

    return(
        <div className='flex flex-col'>
            <Navbar headerName={`Section - ${section?.sectionName}`}/>

            <div className='flex flex-row'>
            <div>
                <Sidebar />
            </div>

            <div className='w-full overflow-x-auto'>
                { students.length > 0 ? (
                    <table className="table ">
                        <thead>
                            <tr className="text-xl">
                                { headers.map((d, i) => (
                                    <th key={i}>{d}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((data, i) => (
                                <TableData key={i} data={data}/>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        No Students Found...
                    </div>
                )}

            </div>
            </div>

        </div>
    )
}
