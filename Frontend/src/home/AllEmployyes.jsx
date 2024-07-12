import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmp } from '../actions/empActions'

const AllEmployyes = () => {
    const dispatch = useDispatch()

    const {friend} = useSelector(state => state.empState)
    console.log(friend,'frfrfr');

    useEffect(()=>{
        dispatch(getAllEmp)
    })
  return (
    <div>
      
    </div>
  )
}

export default AllEmployyes
