import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Product from "../components/Products"

const tileOptions = [2, 3, 4, 5, 6]

export default function Home() {
  const [productList, setProductList] = useState([])
  const [noOfTilesToShow, setnoOfTilesToShow] = useState(6)
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
          className={`w-1/${numberOfTiles} ${
            i % 2 === 0 ? "bg-gray-400" : "bg-gray-500"
          } h-12`}
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
              class="flex w-[64px] ml-4 cursor-pointer"
            >
              {returnTiles(tile)}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`grid grid-cols-2 md:grid-cols-${noOfTilesToShow} justify-items-center gap-1 p-4`}
      >
        {productList.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            title={product.title}
          />
        ))}
      </div>
    </div>
  )
}
