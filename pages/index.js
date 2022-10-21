import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Product from "../components/Products"

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi"

export default function Home() {
  const [productList, setProductList] = useState([])
  const [noOfTilesToShow, setnoOfTilesToShow] = useState(6)
  const tileOptions = [2, 3, 4, 5, 6]
  const [sortOrder, setSort] = useState("desc")

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?sort=${sortOrder}`)
      .then((res) => res.json())
      .then((json) => setProductList(json))
  }, [sortOrder])

  const returnTiles = (numberOfTiles) => {
    const fields = []
    for (let i = 1; i <= numberOfTiles; i++) {
      fields.push(
        <div
          key={i}
          className={`w-6 border ${
            noOfTilesToShow === numberOfTiles
              ? "border-indigo-800"
              : "border-gray-400"
          } m-1 rounded-sm `}
        />
      )
    }
    return fields
  }

  const columnsStyle = ` sm:grid-cols-2 grid-cols-${noOfTilesToShow} `

  return (
    <div className="p-4 flex flex-col items-center w-full dark:bg-gray-900 dark:text-white h-screen overflow-scroll">
      <div className="hidden md:block">
        <div className="flex w-full">
          Select Layout
          {tileOptions.map((tile) => (
            <div
              onClick={() => setnoOfTilesToShow(tile)}
              key={tile}
              className={`flex ml-4 cursor-pointer border ${
                noOfTilesToShow === tile
                  ? "border-indigo-800"
                  : "border-gray-400"
              }   grid-cols-${tile} rounded-md hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              {returnTiles(tile)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex align-center my-2 ">
        Sort
        <div
          className="cursor-pointer"
          onClick={() => setSort(sortOrder === "desc" ? "asc" : "desc")}
        >
          {sortOrder === "desc" ? (
            <BiUpArrowAlt size={24} />
          ) : (
            <BiDownArrowAlt size={24} />
          )}
        </div>
      </div>

      <div
        className={`grid grid-cols-${noOfTilesToShow} justify-items-center gap-1 p-4 hidden md:grid`}
      >
        {productList.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
      <div
        className={`grid grid-cols-2 justify-items-center gap-1 p-4 md:hidden grid`}
      >
        {productList.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  )
}
