import { useNavigate } from "react-router-dom";

function BackButton() {

     const navigate = useNavigate();

    return (
    <div className="d-flex justify-content-end">
    <button className="btn btn-lg" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-right-circle"></i>
    </button>
    </div>
     );
}

export default BackButton;
  
