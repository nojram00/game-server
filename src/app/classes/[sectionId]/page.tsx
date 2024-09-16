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
                                <tr key={i} className="text-xl">
                                    <td>
                                        { data.name}
                                    </td>
                                    <td>{ data.username }</td>
                                    <td>{ data.score?.preTest || 0 }</td>
                                    <td>{ data.score?.postTest || 0}</td>
                                    <td>{ data.progress?.quantumMastery }</td>
                                    <td>{ data.progress?.ecologyMastery }</td>
                                    <td>{ data.progress?.momentumMastery }</td>
                                    <td>{ data.progress?.teraMastery }</td>

                                </tr>
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
