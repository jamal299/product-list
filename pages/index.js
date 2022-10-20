import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Product from "../components/Products"

export default function Home() {
  const [productList, setProductList] = useState([])
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProductList(json))
  }, [])

  return (
    <div>
      <div className="hidden md:block">Select number of tiles</div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-1 p-4">
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
