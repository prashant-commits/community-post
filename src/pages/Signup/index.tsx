import { useApp } from "../../contexts/App";
import { FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupPage: React.FC = () => {
    const {createUser} = useApp()
    const [showPassword, setShowPassword] = useState(false);
    const [isSigninup, setIsSigninup] = useState(false);
    const navigate = useNavigate()

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        //@ts-ignore
        const {email, username, password} = event.target.elements        

        setIsSigninup(true);
        createUser(email.value, username.value, password.value)
            .then(user => {
                navigate("/login")
                toast(`${user.username} account created`)
            })
            .catch(error => {
                console.log(error);
                
                if(error instanceof Error)
                    toast.error(error.message)
            })
            .finally(() => {setIsSigninup(false)})


    }

    return <main className="grid place-content-center justify-items-center h-screen gap-12">
        <img className="h-10 aspect-square" src="/logo.svg" alt="logo"/>
        <form className="border-gradient min-w-[462px] min-h-[400px] rounded-lg bg-zinc-800 py-10 px-6" onSubmit={handleSubmitForm}>
            <p className="text-sm text-gray-500 font-medium text-center">
                SIGN UP
            </p>
            <h3 className="text-lg text-white font-semibold text-center mt-2">Create an account to continue</h3>
            <label>
                <div className="mt-11 text-gray-300">
                    <p>Email</p>
                    <input name="email" className="mt-2.5 w-full" placeholder="Enter your email" required/>
                </div>
            </label>
            <label>
                <div className="mt-4 text-gray-300">
                    <p>Username</p>
                    <input name="username" className="mt-2.5 w-full" placeholder="Choose a preferred username" required/>
                </div>
            </label>
            <label>
                <div className="mt-4 text-gray-300">
                    <p>Password</p>
                    <input name="password" type="password" className="mt-2.5 w-full" placeholder="Choose a strong password" required/>
                </div>
            </label>
            <button className="mt-5 w-full" disabled={isSigninup}>Continue</button>
            <p className="mt-3 text-sm text-gray-500 font-medium">
                Already have an account?&nbsp;
                <Link to="/login" className="text-gray-300">Login →</Link>
            </p>
        </form>
    </main>
}

export default SignupPage;