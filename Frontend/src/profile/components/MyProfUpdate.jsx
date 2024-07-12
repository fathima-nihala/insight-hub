import { useDispatch, useSelector } from "react-redux";
import defaultimage from '../../assets/user-removebg-preview.png';
import { updateProfile } from "../../actions/authActions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyProfUpdate = () => {
  const { error, user, isUpdated } = useSelector(state => state.authState);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user? user?.avatar:defaultimage);
  const dispatch = useDispatch();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('avatar', avatar);
    formData.append('password', password);

    dispatch(updateProfile(formData));

    navigate('/');
  };

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name);
  //     setEmail(user.email);
  //     if (user.avatar) {
  //       setAvatarPreview(user.avatar);
  //     }
  //   }

  //   if (isUpdated) {
  //     toast('Profile updated successfully', {
  //       type: 'success',
  //       position: 'bottom-center',
  //       onOpen: () => dispatch(clearUpdateProfile())
  //     });
  //     return;
  //   }

  //   if (error) {
  //     toast(error, {
  //       position: 'bottom-center',
  //       type: 'error',
  //       onOpen: () => { dispatch(clearAuthError) }
  //     });
  //     return;
  //   }
  // }, [user, isUpdated, error, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center">Update Profile</h1>

        <form onSubmit={submitHandler} className="space-y-4" encType="multipart/form-data">
          <div className="flex flex-col">
            <label htmlFor="name_field" className="mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              id="name_field"
              className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email_field" className="mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email_field"
              className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-sm font-medium">Password</label>
            <input
              type="text"
              id="password"
              className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
              name="name"
              value={password}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="avatar_upload" className="mb-2 text-sm font-medium">Avatar</label>
            <div className="flex items-center space-x-4">
              <figure className="w-20 h-20">
                <img
                  src={avatarPreview}
                  className="object-cover w-full h-full rounded-full"
                  alt="Avatar Preview"
                />
              </figure>
              <input
                type="file"
                name="avatar"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                id="customFile"
                onChange={onChangeAvatar}
              />
            </div>
          </div>

          <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none">Update</button>
        </form>
      </div>
    </div>
  );
};

export default MyProfUpdate;
