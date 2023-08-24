import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../contexts/App";

const LogoutPage: React.FC = () => {
    const {logoutUser} = useApp()
    const navigate = useNavigate()

    useEffect(() => {
        logoutUser()
        navigate("/login")
    }, [])

    return null;
}

export default LogoutPage;