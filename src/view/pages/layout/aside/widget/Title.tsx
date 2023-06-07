import { Link } from "react-router-dom";
import { images } from "../../../../../helper/index.helper";

const Title = () =>{
return (
    <Link to="#" className="flex flex-col items-center pl-2.5 mb-5 ">
    <div className="flex items-center">
        <img src={images.logo_only} className="w-14 mr-0" alt="Flowbite Logo" />
        <div className="flex flex-col justify-center text-left ml-1">
            <span className="font-mont text-white text-xl font-black">
                U P L A
            </span>
            <span className="text-[7px] text-white">
                UNIVERSIDAD PERUANA LOS ANDES
            </span>
        </div>
    </div>
    <small className="font-bold my-2 text-white">INTRANET</small>
</Link>
);
}

export default Title;