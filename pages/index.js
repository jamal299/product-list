import { useEffect, useState } from "react"
import { Select } from "antd"
import Link from "next/link"
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi"
import Product from "../components/Products"
import Banner from "../components/Banner"

const { Option } = Select
export default function Home({ products, categories }) {
  const [productList, setProductList] = useState(products)
  const [noOfTilesToShow, setnoOfTilesToShow] = useState(6)
  const tileOptions = [2, 3, 4, 5, 6]
  const [sortOrder, setSort] = useState("asc")

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `https://fakestoreapi.com/products?sort=${sortOrder}`
      )
      const products = await res.json()
      setProductList(products)
    }
    fetchProducts()
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
    <div>
      <Banner position={"top"} />
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
        <Select
          style={{
            width: 200,
          }}
          onChange={async (value) => {
            if (value === "Reset") {
              var res = await fetch(`https://fakestoreapi.com/products/`)
            } else {
              var res = await fetch(
                `https://fakestoreapi.com/products/category/${value}`
              )
            }

            const products = await res.json()
            setProductList(products)
          }}
          placeholder="Select a filter"
        >
          <Option value="Reset">Select a filter</Option>
          {categories.map((category) => (
            <Option key={category} value={category}>
              <span className="capitalize"> {category}</span>
            </Option>
          ))}
        </Select>

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
      <Banner position={"bottom"} />
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products")
  const products = await res.json()
  const res1 = await fetch("https://fakestoreapi.com/products/categories")
  const categories = await res1.json()
  return {
    props: {
      products,
      categories,
    },
  }
}
