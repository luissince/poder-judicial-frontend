import { ArrowRightOnCicleSvg, LoaderSvg } from "../../../component/Svg.component";

type Props = {
    proceso: boolean
}

const Button = (props: Props) => {
    return (
        <button
            type="submit"
            className="font-mont
            block 
            m-auto 
            md:w-full 
          text-white 
          bg-upla-100 
          hover:bg-upla-200 
            hover:transition-all 
            focus:ring-4 
            focus:outline-none 
          focus:ring-blue-300 
            font-medium 
            rounded-lg 
            text-sm w-full 
            sm:w-auto px-5 
            py-2.5 text-center">
            <div className="flex justify-center items-center">
                {
                    props.proceso ?
                        <LoaderSvg />
                        :
                        <ArrowRightOnCicleSvg />
                }

                <span className="px-2">Ingresar</span>
            </div>
        </button>
    );
}

export default Button;