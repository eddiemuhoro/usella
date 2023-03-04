import React from 'react'
import { useSelector } from 'react-redux';

const Greetings = () => {
    const user = useSelector(state => state.auth.user)


    const myDate = new Date();
    const hours = myDate.getHours();
    const date = myDate.getDate();
    const myDay = myDate.getDay();
    const myMonth = myDate.getMonth();

    const monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    const month = monthName[myMonth];

    const weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday");
    const day = weekday[myDay];
    if (hours < 12) {
        var greet = 'Good Morning';
    } else if (hours >= 12 && hours <= 17) {
        greet = 'Good Afternoon';
    } else if (hours >= 17 && hours <= 24) {
        greet = 'Good Evening';
    }

  return (
    <div className='time'>
                            <h2>{day}, {month} {date} </h2>
                            <h1>{greet} {user && user.name}!</h1>
                        </div>
  )
}

export default Greetings