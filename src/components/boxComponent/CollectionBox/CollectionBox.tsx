import { Link } from "react-router-dom";
import "./CollectionBox.css";

interface CollectionProps {
  CollectionId?: string;
  CollectionName?: string;
  CollectionDescription?: string;
}
const CollectionBox = (props: CollectionProps) => {
  return (
    <div>
      <div className="p-4 border rounded shadow-sm collectionBox_box d-flex flex-column align-items-center">
        <h6 className="text-center w-100 text-break text-truncate">
          {props.CollectionName}
        </h6>
        <div className="text-center w-100 text-muted text-break text-truncate">
          {props.CollectionDescription}
        </div>
        <div className="pt-2 mt-3 text-center w-100 border-top">
          Total items <span className="h6">2</span>
        </div>

        <Link
          className="top-0 position-absolute w-100 h-100"
          to={"/collection/" + props.CollectionId}
        ></Link>
      </div>
    </div>
  );
};
export default CollectionBox;
