import Head from 'next/head';
import React from 'react'
import { Toaster } from 'react-hot-toast';
import FileUploadButton from '../components/FileUploadButton';
import ThreeScene from '../components/ThreeScene';
import VersionSwitch from '../components/VersionSwitch';
import Credit from '../components/Credt';

const Home = () => {
  return (
    <>
      <Head>
        <title>MinSkin - Minecraft Skin Tester</title>
        <meta name="description" content="Minskin is website for testing minecraft skins. Minskin is created by Hamza512b" />
      </Head>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <div className='h-screen w-screen relative'>
        <ThreeScene />
        <Credit />
      </div>
      <div className='flex justify-between items-center  w-full fixed top-0 right-0 p-4'>
        <FileUploadButton />
        <VersionSwitch />
      </div>
    </>
  )
}

export default Home
