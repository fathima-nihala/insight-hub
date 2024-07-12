

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/user-removebg-preview.png';
import { useEffect } from 'react';
import { getUserProfile } from '../../actions/authActions';



const UserProfile = () => {

    const { user } = useSelector(state => state.authState); 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);




    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <div className='shadow-2xl w-[500px] flex flex-col items-center justify-center'>
                <div className="flex flex-col items-center md:items-start mb-5 md:mb-0">
                    <figure className="w-32 h-32 mb-5">
                        <img
                            className="rounded-full object-cover w-full h-full p-2 mt-4"
                            src={user?.avatar ?? defaultAvatar}
                            alt=""
                        />
                    </figure>
                </div>
                <div className="flex flex-col space-y-4 mt-6 p-4">
                    <div>
                        <h4 className="text-lg font-semibold">Full Name</h4>
                        <p>{user?.name}</p>
                    </div>
                    <div className=''>
                        <h4 className="text-lg font-semibold">Email Address</h4>
                        <p>{user?.email}</p>
                    </div>
                    <div className='mt-5'>
                        <Link
                            to="/myprofile/update"
                            className="bg-blue-500 text-white py-2 px-4 rounded w-full text-center "
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
