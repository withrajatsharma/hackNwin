import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
import Category from "./Category";
import product from "../assets/514.webp"
const Home = ({token , setToken }) =>{

    document.title = "Amal | HackNWin"

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    const arr =["1","2","3","4"]

    const fetchListings = async () =>{
        setLoading(true)
        try{
            const response = await fetch('http://localhost:3000/api/event/all')
            const tours = await response.json()
            setLoading(false)
            setListings(tours)
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

    

    if(loading){
        return (
            <>
            <Navbar setToken={setToken} token={token} />
            <div className="grid justify-items-center items-center h-screen">
                <div>
                    <h3 className="text-center text-xl">Loading..</h3>
                    <p className="text-sm">this might take a few minutes</p>
                </div>
            </div>
            </>
            
        );
    }
    return(
        <>
        <Navbar setToken={setToken} token={token} />
        
        {listings.length>=0?
        <>
        <h2 className="text-2xl py-3 px-6 text-blue-600 mt-2 ml-3 font-semibold">Recently Added</h2>
        <div class="mb-14 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 w-full md:px-15 px-5 pt-5">
            {
                listings.slice(0, 5).map((data)=>{
                    //console.log(data);
                    var today = new Date();
                    var yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1; // Months start at 0!
                    let dd = today.getDate();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    var today = mm + '-'+ dd+'-' + yyyy;

                    var gotData = data.expiresBy.split("-");
                    gotData = gotData[1]+"-"+gotData[0]+"-"+gotData[2];

                    var d1 = new Date(gotData);   
                    var d2 = new Date(today);   
                        
                    var diff = d1.getTime() - d2.getTime();   
                        
                    var daydiff = diff / (1000 * 60 * 60 * 24);   
                    //console.log(data);
                    return <>
                        <Product 
                            key={data._id} 
                            nav={data.event_random_code} 
                            img={data.prodcutImg} 
                            title={data.eventName} 
                            description={data.eventDescription} 
                            price={data.expectedPrice} 
                            old={data.hostedBy}
                            expiresBy={daydiff}
                            category={data.category}
                            tags={data.tags}
                            pimg={data.posterImg}
                        />
                    </>
                })
            }

            {
                        arr.map((e)=><Product 
                        key={1} 
                        nav={"HackNWin"} 
                        img={product} 
                        title={"Hack n Win"} 
                        description={"Our mission is simple yet profound: to challenge participants to harness their creativity, coding skills, and teamwork to solve real-world problems."}  
                        price={"Free"} 
                        old={"2024"}
                        expiresBy={"1"}
                        category={"hackathon"}
                        tags={"workshop"}
                        pimg={product}
                    />)
            }
              
              {/* <Product 
                            key={2} 
                            nav={"sdfs"} 
                            img={product} 
                            title={"data structures"} 
                            description={"complete course on data structures and algorithms"}  
                            price={"$200"} 
                            old={"2023"}
                            expiresBy={"123"}
                            category={"workshop"}
                            tags={"workshop"}
                            pimg={product}
                        /> */}
        </div>
        <br />
        <Category setToken={setToken} token={token} endpoint={"http://localhost:3000/api/event/category/workshop"} category={"Workshops"} limit={true}  />
        <Category setToken={setToken} token={token} endpoint={"http://localhost:3000/api/event/category/seminar"} category={"Seminars"} limit={true}  />
        <Category setToken={setToken} token={token} endpoint={"http://localhost:3000/api/event/category/symposium"} category={"symposium"} limit={true}  />
        <Category setToken={setToken} token={token} endpoint={"http://localhost:3000/api/event/category/internship"} category={"internships"} limit={true}  />
    
        </>:<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>}
        </>
    );
}

export default Home;