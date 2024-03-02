import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
import { useParams } from "react-router-dom";
import product from"../assets/514.webp"


const ProductPage = ({token , setToken}) =>{


    

    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    const fetchListings = async () =>{
        setLoading(true)
        var endpoint = `http://localhost:3000/api/event/findbyCode/${params.id}`
        try{
            const response = await fetch(endpoint)
            const tours = await response.json()
            setLoading(false)
            setListings(tours)
            console.log(tours);
        } catch(error){
            setLoading(false)
            console.log("Error Occured");
            console.log(error);
        }
    }
    useEffect(() => {
        if(!token){
            return (navigate('/login'));
        }
        fetchListings()
    }, [token])

    // if(listings.length===1){
    //     document.title = `${listings[0].title} - Rs ${listings[0].expectedPrice}`
    // }
    // if(listings){
    //     document.title = `${listings[0].eventName}`;
    // }
    if(loading){
        return (
            <div className="grid justify-items-center items-center h-screen">
                <div>
                    <h3 className="text-center text-xl">Loading..</h3>
                    <p className="text-sm">this might take a few minutes</p>
                </div>
            </div>
        );
    }
    return(
        <>
        {/* {console.log(listings)} */}
        <Navbar setToken={setToken} token={token} />
        {/* {listings && <span className="text-sm py-3 px-6 text-gray-600 pt-6">../{listings.length>0?<>{listings[0].title} - Rs. {listings[0].expectedPrice}</> :<></>}</span>} */}
        {/* {listings==0?

                       
        :<div className="text-xl px-5 py-5 mt-30 text-center">:Nothing to show!</div>} */}

      <Product
                            // token={token}
                            eid={"1"}
                            type={"full"}
                            // key={listings.prodcutImg} 
                            // nav={listings.event_random_code} 
                            img={product} 
                            title={"Hack N Win"} 
                            description={"Expect an adrenaline-fueled 24 hours of non-stop coding, brainstorming, and networking. Participants will tackle exciting challenges, engage in workshops, and have the opportunity to win fantastic prizes."} 
                            price={"free"} 
                            old={"2024"}
                            expiresBy={"2-03-24"}
                            category={"workshop"}
                            tags={"ai/ml web3"}
                            pimg={product}
                            eventEmail={"help.d4community@gmail.com"}
                            eventPhoneNumber={"9053797009"}
                            partcipants={"200+"}
                        />        

        </>
    );
}
export default ProductPage