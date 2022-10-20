import Image from "next/image"

const Product = ({ image, title, description }) => {
  return (
    <div className="grid justify-items-center py-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
      <div className="px-5 grid justify-items-center">
        <Image
          className="rounded-lg"
          src={image}
          alt=""
          width="200px"
          height="200px"
        />

        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h5>
      </div>

      <div className="p-5 overflow-scroll h-28">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Product
