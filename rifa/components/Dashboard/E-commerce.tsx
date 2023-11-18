'use client'
import React from 'react'
import ChartOne from '../Charts/ChartOne'
import ChartThree from '../Charts/ChartThree'
import ChartTwo from '../Charts/ChartTwo'
import ChatCard from '../Chat/ChatCard'
import TableOne from '../Tables/TableOne'
import CardDataStats from '../CardDataStats'
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from 'next/dynamic'
const MapOne = dynamic(() => import('../Maps/MapOne'), {
  ssr: false,
})

const ECommerce: React.FC = () => {
  return (
    <>
      <div>ola teste</div>
    </>
  )
}

export default ECommerce
