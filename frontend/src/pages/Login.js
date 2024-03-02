import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useParams } from "react-router-dom";
import loginImg from '../assets/Group 3.png'

const Login = ({token, setToken}) => {
    const params = useParams();
    console.log(params);
    const navigate = useNavigate();

    const [status, setStatus] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const LoginStatusMessage = (props) =>{
        if(status===401){
            return <div className='bg-blue-200 text-sm text-blue-500 rounded px-1 py-1'>
                {errorMessage}<br />
                <span className="text-black text-xs">To register click <a href='/register' className='text-blue-600'>here </a></span>
            </div>
        }
        if(errorMessage){
            return <div className='bg-red-300 text-xs text-white rounded px-1 py-1'>
                {errorMessage}
            </div>
        }
        else{
            return <></>
        }
    }

    const handleLogin = (event) =>{
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setStatus("");
        if(email && password){
            fetch('http://localhost:3000/api/user/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                })
            })
            .then(function (response) {
                setLoading(false);
                console.log(response);
                setStatus(response.status)
                return response.json();
            })
            //Then with the data from the response in JSON...
            .then((data) => {
                setToken(data);
                if(data.message==="Passwords does not match"){
                    setErrorMessage("Wrong username or password")
                    return false
                }
                if(data.message==="Email not found"){
                    setErrorMessage("You are not yet registered with us.")
                    setStatus(401)
                    return false
                }
                console.log('Success:', data);
                return navigate('/');
            })
            //Then with the error genereted...
            .catch((error) => {
                setErrorMessage("Something Went wrong");
                console.error('Error:', error);
            });

        }else{
            setLoading(false);
            setErrorMessage("Something Went wrong");
            console.log("Something wrong !!");
        }
    }
    const handleTestSignIn = (event)=>{
        //event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setStatus("");
        fetch('http://localhost:3000/api/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:"sahiljena50@gmail.com",
                password:"Sahil",
            })
        })
        .then(function (response) {
            setLoading(false);
            console.log(response);
            setStatus(response.status)
            return response.json();
        })
        //Then with the data from the response in JSON...
        .then((data) => {
            setToken(data);
            if(data.message==="Passwords does not match"){
                setErrorMessage("Wrong username or password")
                return false
            }
            if(data.message==="Email not found"){
                setErrorMessage("You are not yet registered with us.")
                setStatus(401)
                return false
            }
            console.log('Success:', data);
            return navigate('/');
        })
        //Then with the error genereted...
    }
    console.log(params);

    if(params.method=="verify"){
        fetch(`http://localhost:3000/api/user/verify?code=${params.code}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                //setLoading(false);
                console.log(response);
                //setStatus(response.status)
                return response.json();
            })
        return(
            <>
            This params method
            </>
        );
    }

    if(token){
        navigate('/');
    }

    return(
        <>
            <Navbar token={token} />


            <div className='absolute left-[22%] top-[5%] -z-10 '>

            
            <div class=" w-36 h-[15vw] bg-[#676ECC] text-indigo-950 rounded-full">
        <p class="font-serif font-extrabold text-[20vw] leading-none">Amal</p>
    </div>
    </div>

                        <img className='bottom-0 absolute w-[30%]'  src={loginImg} />
                
                        

           
                <div class="w-full flex justify-center mt-48 ">
            <form onSubmit={handleLogin} class="w-[30%] bg-[#b0b2f9df] p-8 rounded-xl">
            <div class="mb-5">
            <div className='mb-4'>
                            <LoginStatusMessage status={status}/>
                        </div>
            <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 "
            >
            Your email
            </label>
            <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            />
            </div>

          

            <div class="mb-5">
            <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 "
            >
            Your password
            </label>
            <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            required
            />
            </div>

            
            
            
            
            <button
            type="submit"
            class="text-white hover:bg-[#8085c9] bg-[#676ecc]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              {loading?<>Logging in...</>:<>Log In</>}
            </button>
            </form>
            
            </div>
           






            {/* <div className='flex justify-center mt-10'>
                <div class="w-full max-w-lg">
                    <form onSubmit={handleLogin} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                        <div className='mb-4 text-center text-lg font-bold text-gray-600'>
                            <h2>Sign In</h2>
                        </div>
                        <div className='mb-4'>
                            <LoginStatusMessage status={status}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="email">
                                Email
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="email" 
                                type="email" 
                                placeholder="name@example.com"
                                value = {email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <p className="text-red-500 text-xs italic"></p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="password">
                                Password
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" 
                                type="password" 
                                placeholder="******************"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <p className="text-red-500 text-xs italic"></p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button 
                                className={`w-full ${loading?'bg-gray-300':'bg-blue-500 hover:bg-blue-700'}  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                type="submit"

                            >
                                {loading?<>Signing in...</>:<>Sign In</>}
                            </button>
                            
                        </div>
                        <br/>
                            <button 
                                className={`w-full ${loading?'bg-gray-300':'bg-gray-900 hover:bg-blue-700'}  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                onClick={()=>handleTestSignIn()}
                                type="button"
                            >
                                {loading?<>Signing in...</>:<>Sign In with Test</>}
                            </button>
                    </form>
                </div>
            </div> */}
        </>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Login;