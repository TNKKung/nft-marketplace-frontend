import { Link } from "react-router-dom";
import "./CollectionBox.css"

interface CollectionProps {
    CollectionName?: string;
    CollectionOwner?: string;
    CollectionDescription?: string;
}
const CollectionBox = (props: CollectionProps) => {
    return (
        <div>
            <div className="collectionBox_box d-flex flex-column align-items-center border rounded p-4 shadow-sm">
                <h6 className="w-100 text-center text-break text-truncate">{props.CollectionName}</h6>
                <div className="w-100 text-muted text-center text-break text-truncate">{props.CollectionDescription}</div>
                <div className="w-100 text-center mt-3 pt-2 border-top">Total items <span className="h6">2</span></div>

                <Link className="position-absolute top-0 w-100 h-100" to={"/collection/" + props.CollectionName + "/" + props.CollectionOwner}></Link>

            </div>
        </div>
    )
}
export default CollectionBox;