import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Product from "../components/Products"

export default function Home() {
  const [productList, setProductList] = useState([])
  const [noOfTilesToShow, setnoOfTilesToShow] = useState(6)
  const tileOptions = [2, 3, 4, 6]
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProductList(json))
  }, [])

  const returnTiles = (numberOfTiles) => {
    const fields = []
    for (let i = 1; i <= numberOfTiles; i++) {
      fields.push(
        <div
          key={i}
          // className={`w-1/${numberOfTiles} ${
          //   i % 2 === 0 ? "bg-gray-400" : "bg-gray-500"
          // } `}
          className={`bg-gray-400`}
        />
      )
    }
    return fields
  }
  console.log({ noOfTilesToShow })
  return (
    <div>
      <div className="hidden md:block">
        <div className="flex w-full">
          Select
          {tileOptions.map((tile) => (
            <div
              onClick={() => setnoOfTilesToShow(tile)}
              key={tile}
              className="flex w-[64px] ml-4 cursor-pointer bg-red-200"
            >
              {returnTiles(tile)}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`grid sm:grid-cols-2 md:grid-cols-${noOfTilesToShow} justify-items-center gap-1 p-4`}
      >
        {productList.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </div>
  )
}
