import { useParams } from "react-router-dom";
import { IParams } from "../../utils/interface";
import { selectAuth } from "../../redux/state/authSlice";
import { useAppSelector } from "../../redux/hooks";
import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";
import UserBlog from "../../components/profile/UserBlog";

const Profile: React.FC = () => {


    const {slug}:IParams=useParams()

    const {user}=useAppSelector(selectAuth)



  return (
    <div className="flex w-full flex-wrap gap-3 md:gap-5  justify-center  h-[90%] py-10 bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96 sm:w-96  ">
            {
                slug==user?._id ? <UserInfo/> : <OtherInfo/>
            }
        </div>

        <div className="bg-white p-8 rounded shadow-md w-96 sm:w-96  ">
            <UserBlog/>
        </div>

    </div>

  );
};

export default Profile;
