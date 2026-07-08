import React from 'react'
import MainHeader from './MainHeader'
import { getServerSideProps  } from '@/app/apis/general'

export default async function Header() {
  const Data = await getServerSideProps ('components/header')
    return (
        <header>
            <MainHeader data={Data.props.data.data.extra_content} />
        </header>
    )
}
