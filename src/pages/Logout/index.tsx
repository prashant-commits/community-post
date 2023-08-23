import { useEffect } from "react";
import { useApp } from "../../contexts/App";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LogoutPage: React.FC = () => {
    const {user, logoutUser} = useApp()
    const navigate = useNavigate()

    useEffect(() => {
        logoutUser()
        navigate("/login")
        toast(`${user?.username} is logged out`)
    }, [])

    return null;
}

export default LogoutPage;