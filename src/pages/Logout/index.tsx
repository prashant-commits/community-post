import { useEffect } from "react";
import { useApp } from "../../contexts/App";
import { useNavigate } from "react-router-dom";

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