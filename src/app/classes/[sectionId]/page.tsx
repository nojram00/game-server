import Navbar from "@main/components/navbar"
import Sidebar from "@main/components/sidebar"
import { getSection, getSectionStudents } from "@main/models_v2/drizzle"

interface Params{
    sectionId : number
}
export default async function ClassInfo({ params } : { params : Params }) {
    const section = await getSectionStudents(params.sectionId)

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
    const sectionInfo = section[0].section

    console.log("Section: ", section)


    return(
        <div className='flex flex-col'>
            <Navbar headerName={`Section - ${sectionInfo.sectionName}`}/>

            <div className='flex flex-row'>
            <div>
                <Sidebar />
            </div>

            <div className='w-full overflow-x-auto'>
                <table className="table ">
                    <thead>
                        <tr className="text-xl">
                            { headers.map((d, i) => (
                                <th key={i}>{d}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        { section.map((data, i) => (
                            <tr key={i}>
                                <td>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}
