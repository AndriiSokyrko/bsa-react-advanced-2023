import {useNavigate} from "react-router";

const AuthenticatedUser = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('TOKEN');
    if (token) navigate('/trips');
    navigate('/sign-in');


}

export default AuthenticatedUser;