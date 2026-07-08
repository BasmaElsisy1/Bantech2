import BantechTeam, { BantechTeamProps, SingleBlogWidget } from '../HomepageComp/BantechTeam'
import CoreValues from '../HomepageComp/CoreValues'
import CustomSoftware, { CustomSoftwareProps } from '../HomepageComp/CustomSoftware'
import HeroSection, { HeroHomePorps } from '../HomepageComp/HeroSection'
import Services, { SingleService } from '../HomepageComp/Services'
import Video, { VideoProps } from '../HomepageComp/Video'
import StartQR, { StartQRProps } from '../PaymentLinks/StartQR'

interface HomepageProps {
    hero: HeroHomePorps,
    mission_and_vission: {
        image: {
            src: string,
            alt: string
        },
        mission: {
            title: string,
            content: string
        },
        vision: {
            title: string,
            content: string
        },
        innovation: {
            title: string,
            content: string
        }
    },
    free_trial: VideoProps,
    services: CustomSoftwareProps,
    start_payment: StartQRProps,
    blogs: BantechTeamProps,
    products: SingleService[]
}

export default function Homepage({ data, BlogsData }: { data: HomepageProps, BlogsData: SingleBlogWidget[] }) {
    const CoreValuesData = {
        List: [
            {
                Title: data.mission_and_vission.mission.title,
                Description: data.mission_and_vission.mission.content
            },
            {
                Title: data.mission_and_vission.vision.title,
                Description: data.mission_and_vission.vision.content
            },
            {
                Title: data.mission_and_vission.innovation.title,
                Description: data.mission_and_vission.innovation.content
            }
        ],
        ImageSrc: {
            src: data.mission_and_vission.image.src,
            alt: data.mission_and_vission.image.alt
        }
    }


    return (
        <>
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 pt-10'>
                <HeroSection data={data.hero} />
                <CoreValues data={CoreValuesData} />
                <Services data={data.products} />
                <Video data={data.free_trial} />

            </div>
            <CustomSoftware data={data.services} />

            <StartQR data={data.start_payment} />
            <div className='max-w-[1437px] mx-auto xl:px-20 px-4 relative z-10'>
                <BantechTeam
                    BlogsData={BlogsData}
                    data={data.blogs} />
            </div>
        </>
    )
}
