import CreateSection from "./CreateSection"


const Navbar = () => {
   

   

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md w-full">
            <div className="text-xl font-bold">Dashboard</div>

            <div className="flex justify-center items-center">
                <div className="relative ">
                    <input type="text" placeholder="Search here..." className="w-[500px] pl-10 pr-4 py-2 rounded-md  bg-[#F9FAFB] focus:outline-none focus:border-blue-500" />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#312e81]" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <div>
            {/* <button className='bg-indigo-900 rounded-lg text-white w-full md:w-[150px] h-[46px] hover:bg-[#c4bcb8]'>Create</button> */}
            <CreateSection/>
            </div>

           
        </nav>
    )
}

export default Navbar



