import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmployee, getAllEmp } from '../actions/empActions'
import { Link } from 'react-router-dom';


const AllEmployyes = () => {
  const dispatch = useDispatch()

  const employee = useSelector(state => state.empState?.employee)
  console.log(employee, 'frfrfr');

  const deleteHandler = (id) => {
    dispatch(deleteEmployee(id));
  };

  useEffect(() => {
    dispatch(getAllEmp());
  }, [dispatch])
  return (
    <div>
      <h3 className='text-[40px] font-bold text-[#312e81]'>{employee.count} Employees</h3>
      <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4  ">
        {employee && employee?.employees?.map((emp, index) => (
          <li key={index} className="mb-2 flex flex-col justify-center items-center p-4 border rounded-lg shadow lg:text-[20px] mt-4 ">
            <Link to={`/employee/${emp._id}`}>
              <img src={emp.avatar} alt={`${emp.name}'s avatar`} className="w-16 h-16 rounded-full" />
              <p>Name: {emp.name}</p>
              <p>Phone: {emp.phone}</p>
              <p>Email: {emp.email}</p>

            </Link>
            <div className='flex justify-end mt-6 '>
              <button className=' bg-red-600 rounded-md text-white text-[16px] px-4 hover:bg-slate-500' onClick={() => deleteHandler(emp._id)}>Delete</button>
            </div>
          </li>

        ))}

      </ul>
    </div>
  )
}

export default AllEmployyes
