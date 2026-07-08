import { getServerSideProps  } from '@/app/apis/general'
import MainFooter from './MainFooter'

export default async function Footer() {
    const Data = await getServerSideProps ('components/footer')

    return (
        <footer className='overflow-hidden relative px-4 py-20'>
            <MainFooter data={Data.props.data.data.extra_content} />
        </footer>
    )
}
