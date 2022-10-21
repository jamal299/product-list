import Image from "next/image"

const Product = ({ image, title, description, price }) => {
  return (
    <>
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
          {`- $${price}`}
        </h5>
      </div>

      <div className="p-5 overflow-scroll h-28 mb-3 max-w-full font-normal text-gray-700 dark:text-gray-400 ">
        <p className="">{description}</p>
      </div>
    </>
  )
}

export default Product
