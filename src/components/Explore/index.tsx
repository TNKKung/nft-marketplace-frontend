import { useEffect, useState } from "react";

interface Exploreprops {
    name: string,
    dropdown: boolean,
    setFilter: Function,
    children?: React.ReactNode
};

const Explore = (props: Exploreprops) => {

    //state
    const [dropdownSelect, setDropdownSelect] = useState("All");

    //function
    useEffect(()=>{
        if(dropdownSelect === "All"){
            props.setFilter("");
        }else{
            props.setFilter(dropdownSelect);
        }
    },[dropdownSelect, props])

    return (
        <div className="container">
            <div className="row mt-5 justify-content-between align-items-center">
                <h5 className="col-auto mb-0">Explore {props.name}</h5>
                {props.dropdown === true?
                <div className="col-auto">
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">{dropdownSelect}</button>
                        <div className="dropdown-menu dropdown-menu-end" >
                        <button className="dropdown-item text-end" onClick={()=>{setDropdownSelect("All")}}>All</button>
                            <button className="dropdown-item text-end" onClick={()=>{setDropdownSelect("Artwork")}}>Artwork</button>
                            <button className="dropdown-item text-end" onClick={()=>{setDropdownSelect("Memes")}}>Memes</button>
                            <button className="dropdown-item text-end" onClick={()=>{setDropdownSelect("Photography")}}>Photography</button>
                            <button className="dropdown-item text-end" onClick={()=>{setDropdownSelect("Collections")}}>Collections</button>
                        </div>
                    </div>
                </div>:
                null}
            </div>
            {props.children}
        </div>
    )
}
export default Explore