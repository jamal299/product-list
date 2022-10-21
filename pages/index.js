import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Product from "../components/Products"

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi"
import Link from "next/link"

export default function Home({ products }) {
  const [productList, setProductList] = useState(products)
  const [noOfTilesToShow, setnoOfTilesToShow] = useState(6)
  const tileOptions = [2, 3, 4, 5, 6]
  const [sortOrder, setSort] = useState("asc")

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
          onClick={() => {
            // router.push({ pathname: "", query: { sortBy: sortOrder } })
            setSort(sortOrder === "desc" ? "asc" : "desc")
          }}
        >
          {sortOrder === "desc" ? (
            <BiUpArrowAlt size={24} />
          ) : (
            <BiDownArrowAlt size={24} />
          )}
        </div>
      </div>

      <div
        className={`grid grid-cols-${noOfTilesToShow} justify-items-center gap-1 p-4 hidden md:grid cursor-pointer`}
      >
        {productList.map((product) => (
          <Link key={product.id} href={`/${product.id}`}>
            <div className="grid justify-items-center m-2 py-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Product
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
              />
            </div>
          </Link>
        ))}
      </div>
      <div
        className={`grid grid-cols-2 justify-items-center gap-1 p-4 md:hidden grid cursor-pointer`}
      >
        {productList.map((product) => (
          <Link key={product.id} href={`/${product.id}`} passHref>
            <div>
              <Product
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://fakestoreapi.com/products")
  const products = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  }
}
