import { useEffect } from "react";
import { useApp } from "../../contexts/App";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const {user} = useApp()
    const navigate = useNavigate()

    return <main>Homepage</main>
}

export default HomePage;