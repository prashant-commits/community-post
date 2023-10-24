import { useApp } from "../../contexts/App";
import { FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
    const {loginUser} = useApp()
    // const [showPassword, setShowPassword] = useState(false);
    const [isLoginin, setIsLoginin] = useState(false)
    const navigate = useNavigate()

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const {usernameOrEmail, password} = event.target.elements
        
        setIsLoginin(true);
        loginUser(usernameOrEmail.value, password.value)
            .then(user => {
                navigate("/")
                toast(`${user.username} account logged in`)
            })
            .catch(error => {
                console.log(error);
                
                if(error instanceof Error)
                    toast.error(error.message)
            })
            .finally(() => {setIsLoginin(false)})


    }


    return <main className="grid place-content-center justify-items-center h-screen gap-12">
        <img className="h-10 aspect-square" src="/logo.svg" alt="logo"/>
        <form className="border-gradient min-w-[462px] min-h-[400px] rounded-lg bg-zinc-800 py-10 px-6" onSubmit={handleSubmitForm}>
            <p className="text-sm text-gray-500 font-medium text-center">
                WELCOME BACK
            </p>
            <h3 className="text-lg text-white font-semibold text-center mt-2">Log into your account</h3>
            <label>
                <div className="mt-11 text-gray-300">
                    <p>Email or Username</p>
                    <input name="usernameOrEmail" className="mt-2.5 w-full" placeholder="Enter your email or username" required/>
                </div>
            </label>
            <label>
                <div className="mt-4 text-gray-300">
                    <p className="flex items-end justify-between">
                        Password
                        <Link to="#forgotpass" className="ml-auto text-xs text-gray-300 font-medium">Forgot password?</Link>
                    </p>
                    <input name="password" type="password" className="mt-2.5 w-full" placeholder="Enter your password" required/>
                </div>
            </label>
            <button className="mt-5 w-full" disabled={isLoginin}>Login now</button>
            <p className="mt-3 text-sm text-gray-500 font-medium">
                Not registered yet?&nbsp;
                <Link to="/signup" className="text-gray-300">Register →</Link>
            </p>
        </form>
    </main>
}

export default LoginPage;