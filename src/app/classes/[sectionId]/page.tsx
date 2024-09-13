import SectionModel from "@main/models/sections"

interface Params{
    sectionId : string
}
export default async function ClassInfo({ params } : { params : Params }) {
    const section = await SectionModel.find(params.sectionId)
    const sectionInfo = await section?.getData()

    console.log(sectionInfo)


    return(
        <div>

        </div>
    )
}
