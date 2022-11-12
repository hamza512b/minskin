import React from 'react'
import { Toaster } from 'react-hot-toast';
import FileUploadButton from '../components/FileUploadButton';
import ThreeScene from '../components/ThreeScene';
import VersionSwitch from '../components/VersionSwitch';

const Home = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <div className='h-screen w-screen'>
        <ThreeScene />
      </div>
      <div className='flex justify-between items-center  w-full fixed top-0 right-0 p-4'>
        <FileUploadButton />
        <VersionSwitch />
      </div>
    </>
  )
}

export default Home
