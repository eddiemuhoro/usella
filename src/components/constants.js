import { useEffect, useState } from "react";
import { getProfile } from "../react-redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfileDetails = ()=>{
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.you)
    
    const [profile, setProfile] = useState({});
    
    useEffect(() => {  
    
        dispatch(getProfile(user.id))
       
          .then(res => {
                 // array [0] because we are getting an array of objects
                 console.log('Profile data:', res.payload);
                 setProfile(res.payload);
               
             }
         );
      }, [dispatch, user.id]);
      let newName = [];

//split name into array if name has more than one word, split only when profile is not empty
if(profile.name && profile.name !== undefined){
    newName = profile.name.split(' ');
}


      return(
        <p>{newName[0]}</p>
    )
    
}


  //export name and profile to be used in other components
    export default ProfileDetails;

    