import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmp } from '../actions/empActions'
import { Link } from 'react-router-dom'

const AllEmployyes = () => {
  const dispatch = useDispatch()

  const employee = useSelector(state => state.empState?.employee)
  console.log(employee, 'frfrfr');

  // const data = useSelector(state => state.empState)
  // console.log(data)


  useEffect(() => {
    dispatch(getAllEmp)
  })
  return (
    <div>
      <h3 className='text-[40px] font-bold text-[#312e81]'>{employee.count} Employees</h3>
      <ul className="grid grid-cols-4 gap-4  ">
        {employee && employee?.employees.map((emp, index) => (
          <li key={index} className="mb-2 flex flex-col justify-center items-center p-4 border rounded-lg shadow text-[20px] ">
            <Link to={`/employee/${emp._id}`}>
              <img src={emp.avatar} alt={`${emp.name}'s avatar`} className="w-16 h-16 rounded-full" />
              <p>Name: {emp.name}</p>
              <p>Phone: {emp.phone}</p>
              <p>Email: {emp.email}</p>
            </Link>

          </li>

        ))}
      </ul>
    </div>
  )
}

export default AllEmployyes
