import "./Pockemon.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Pockemon({ name, image, id }) {
  return (
    <div className="pockemon">
      <Link to={`/pokemon/${id}`}>
        <div className="title">{name}</div>

        <div>
          <img id="pokemon-img" src={image} />
        </div>
      </Link>
    </div>
  );
}

export default Pockemon;
