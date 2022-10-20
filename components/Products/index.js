import Image from "next/image"

const Product = ({ image, title }) => {
  return (
    <div class="grid justify-items-center py-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
      <a href="#">
        <Image
          class="rounded-lg"
          src={image}
          alt=""
          width="200px"
          height="200px"
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  )
}

export default Product
