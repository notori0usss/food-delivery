import React, { useState } from "react"
import Logo from "../img/logo.png"
import { Link } from "react-router-dom"
import Avatar from "../img/avatar.png"
import { motion } from "framer-motion"
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { app } from "../config/firebase.config"
import { useStateValue } from "../context/StateProvider"
import { actionType } from "../context/reducer"

const Header = () => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const [{ user }, dispatch] = useStateValue()
  const [isMenu, setIsMenu] = useState(false)

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      })
      localStorage.setItem("user", JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
      // window.addEventListener("click", setIsMenu(!isMenu))
    }
  }

  const onLogoutClick = () => {
    console.log("User logged out")
    localStorage.removeItem("user")
  }

  return (
    <header className="fixed z-50 w-screen p-6 px-16 bg-gray-100">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={Logo}
            alt="Logo"
            className="w-8 object-cover"
          />
          <p className="text-headingColor text-xl font-bold">Goblin</p>
        </Link>

        <div className="flex items-center gap-8 ">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out ">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer  duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer  duration-100 transition-all ease-in-out">
              About Us
            </li>
            <li className="text-base duration-100 transition-all ease-in-out text-textColor hover:text-headingColor cursor-pointer ">
              Service
            </li>
          </motion.ul>
          <motion.div
            whileHover={{ rotate: 360 }}
            className="relative flex items-center justify-center"
          >
            <MdShoppingCart className="text-textColor text-2xl  cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex justify-center items-center ">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </motion.div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="user-avatar"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
              >
                {user && user.email === "dhunganaswaroop@gmail.com" ? (
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                ) : (
                  ""
                )}
                {user ? (
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    Logout
                    <MdLogout onClick={onLogoutClick} />
                  </p>
                ) : (
                  ""
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full h-full "></div>
    </header>
  )
}

export default Header