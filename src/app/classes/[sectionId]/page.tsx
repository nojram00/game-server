import Navbar from "@main/components/navbar"
import Sidebar from "@main/components/sidebar"
import SectionModel from "@main/models/sections"

interface Params{
    sectionId : string
}
export default async function ClassInfo({ params } : { params : Params }) {
    const section = await SectionModel.find(params.sectionId)
    const sectionInfo = await section?.getData()

    console.log(sectionInfo)


    return(
        <div className='flex flex-col'>
            <Navbar headerName={`Section - ${sectionInfo?.sectionName}`}/>

            <div className='flex flex-row'>
            <div>
                <Sidebar />
            </div>

            <div className='w-full'>

            </div>
            </div>
        </div>
    )
}
