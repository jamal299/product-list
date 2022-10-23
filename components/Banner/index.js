import React, { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { GrAnnounce } from "react-icons/gr"
import styles from "./new.module.css"
// import Marquee from "../Marquee/index";

const Banner = ({ position }) => {
  const [showMarquee, setShowMarquee] = useState()
  useEffect(() => {
    setShowMarquee(true)
  }, [])
  return (
    <div
      className={`bg-indigo-600 dark:bg-slate-800 w-full ${
        position === "top" ? "fixed top-0 z-10" : "fixed bottom-0 z-10"
      }`}
    >
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <GrAnnounce className={styles.notification} />
            </span>
            {showMarquee && (
              <marquee className="font-medium text-white">
                Big news! We're excited to announce a brand new product. Big
                news! We're excited to announce a brand new product. Big news!
                We're excited to announce a brand new product. Big news! We're
                excited to announce a brand new product. Big news! We're excited
                to announce a brand new product. Big news! We're excited to
                announce a brand new product.
              </marquee>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
