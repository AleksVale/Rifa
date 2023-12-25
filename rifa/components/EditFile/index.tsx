import Image from 'next/image'
import React from 'react'

interface EditFileProps {
  files: File[] | string[]
  onDelete: (index: number) => void
}

const EditFile: React.FC<EditFileProps> = ({ files, onDelete }) => {
  return (
    <React.Fragment>
      {files.map((file, index) => (
        <div
          key={typeof file === 'string' ? file : file.name}
          className="relative flex-none"
        >
          <Image
            src={typeof file === 'string' ? file : URL.createObjectURL(file)}
            alt={`Imagem ${index + 1}`}
            width={300}
            height={112}
            className="flex-none bg-white w-full sm:w-[300px] h-28 text-2xl"
          />
          <button
            onClick={() => onDelete(index)}
            className="absolute top-2 right-2 text-red-500 cursor-pointer"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </React.Fragment>
  )
}

export default EditFile
