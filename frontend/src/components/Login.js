import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [error, setError] = useState("");
    const[message, setMessage] = useState("");
    const navigate = useNavigate();


    // handle the form submit

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = { email, password };

        setError(""); //clear the previous error
        setMessage(""); //clear the previous messages
    
        try {
          const res = await fetch("https://fsd-demo-3-2.onrender.com/api/users/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(user),
          });
    
          if (res.ok) {
            const data = await res.json();
            setMessage(data.message || "Login successfull");
            setEmail("");
            setPassword("");
            navigate("/home")
          } else {
            const errordata = await res.json();
            console.log("Error response:", errordata);
            setError(
              errordata.message ||
                "Login not successful, try again change Password and email"
            );
          }
        } catch (error) {
            console.error("error in login:", error)
          setError("Unable to Login");
        }
      };
    
    //     try{
    //         await api.post("/users/login", {email, password});
    //         setMessage("Login is succcessfull");
    //         navigate("/home")
    //     } catch(error){
    //         console.log(error)
    //     }
    // }

    return(
        <div className="login">
            <h2>Login Form</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>


                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )

}

export default Login