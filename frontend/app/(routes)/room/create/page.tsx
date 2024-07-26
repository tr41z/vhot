import { CreateForm } from '@/components/create/form';
import React from 'react'

const CreateRoomPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="flex flex-col justify-center items-center mx-5">
        <div className="flex flex-col text-center">
          <p className="uppercase text-base md:text-xl mr-2 tracking-widest bg-gradient-to-b from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
            Create a room by completing the form
          </p>
          <p className="uppercase text-base md:text-xl tracking-widest bg-gradient-to-b from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
            and share the event link or ID!
          </p>
        </div>
        <CreateForm />
      </div>
    </div>
  );
}

export default CreateRoomPage
