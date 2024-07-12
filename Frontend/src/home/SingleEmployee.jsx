import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../actions/empActions';
import CreateSection from '../shared/CreateSection';

const SingleEmployee = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => state.empState?.singleEmployee?.employee);
    console.log(data, 'iddd');

    useEffect(() => {
        dispatch(getEmployee(id));
    }, [dispatch, id]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center">
                    <img src={data?.avatar} alt={`${data?.name}'s avatar`} className="w-40 h-40 rounded-full mb-4 object-contain" />
                </div>
                <div className="text-center text-[30px]">
                    <p className="text-[35px] font-bold mb-2">{data?.name}</p>
                    <p className="text-gray-600 mb-2">Phone: {data?.phone}</p>
                    <p className="text-gray-600 mb-4">Email: {data?.email}</p>
                    
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded">
                        Edit
                    </button> */}
                    <CreateSection mode="edit" data={data} />
                </div>
            </div>
        </div>
    )
}

export default SingleEmployee
