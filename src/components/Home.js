import React,{useState} from 'react'
import Navbar from './Navbar';
import CategoryNavbar from './CategoryNavbar';

export default function Home(props) {
    const [laundryitemsToDisplay, setLaundryItemsToDisplay] = useState([]);

    if (!props.laundryitems){
        return <p>Loading ....</p>
    }
    return (
        <div>
            <Navbar/>
            <CategoryNavbar/>
            {
                props.laundryitems.map((elem,i) => {
                    console.log(elem)
                    return (
                        <a></a>
                    )
                })
            }
        </div>
    )
}
