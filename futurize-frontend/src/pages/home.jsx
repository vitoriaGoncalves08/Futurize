import Buttons from "../components/Buttons/Buttons";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { signout } = useAuth();
  const navigate = useNavigate();
    return (
      <>
       <Buttons onClick={() => [signout(), navigate("/")]}>
        Sair
      </Buttons>
      </>
    )
  }
