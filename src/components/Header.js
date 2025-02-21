import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/UserSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const user = useSelector((state) => state?.user?.user);
  // console.log("user : ", user);
  const dispatch = useDispatch()
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context)
  const searchInput = useLocation()
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1])

  // console.log("searchInput : ", searchInput?.search.split("=")[1])

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.messgae);
      dispatch(setUserDetails(null))
      navigate('/'); // Redirect to home page after logout
    }

    if (data.error) {
      toast.error(data.messgae)
    }
  }

  // console.log("header add to count",context);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate('/search')
    }
  }


  return (
    <>
      <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
          <div>
            <Link to={"/"}>
              {/* <Logo w={190} h={150} /> */}
            </Link>
          </div>
          {/* Search Bar  */}
          {/* <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
            <input type="text" placeholder='Search Product here...' className='w-full outline-none' onChange={handleSearch} value={search} />
            <div className='text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white'>
              <GrSearch />
            </div>
          </div> */}

          <div className='flex items-center gap-7'>


            <div className='relative group flex justify-center'>

              {/* {
                user?._id && (
                  <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay((prev) => !prev)}>
                    {
                      user?.profilePic ? (
                        < img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                      ) : (
                        <FaRegCircleUser />
                      )
                    }
                  </div>
                )
              } */}

              {menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {user?.role === 'ADMIN' && (
                      <Link to="/admin-panel/all-products" className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>
                        Admin Panel
                      </Link>
                    )}
                    <Link to="/order-list" className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>
                      Order
                    </Link>
                  </nav>
                </div>
              )}
            </div>

            {/* {
              user?._id && (
                <Link to={"/cart"} className='text-2xl relative'>
                  <span><FaShoppingCart /></span>

                  <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{context?.cartProductCount}</p>
                  </div>
                </Link>
              )
            } */}

            <div>
              {
                user?._id ? (
                  <button onClick={handleLogout} className="px-2 py-1 rounded-full bg-red-600 text-white hover:bg-red-700">Logout</button>
                ) : (
                  <Link to="/login" className="px-2 py-1 rounded-full bg-red-600 text-white hover:bg-red-700">Login</Link>
                )
              }

            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header   