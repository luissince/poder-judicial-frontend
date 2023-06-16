import { Dispatch, SetStateAction, useRef, useState } from "react";

type Props = {
    selectedFile: File,
    setSelectedFile: Dispatch<SetStateAction<File>>,
    refImagen: React.RefObject<HTMLInputElement>
}

const SeleccionarImagen = (props: Props) => {

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files.length !== 0) {
            props.setSelectedFile(event.target.files[0]);
        } else {
            props.setSelectedFile(null);
            props.refImagen.current.value = "";
        }
    };

    const handleRemoveImage = () => {
        props.refImagen.current.value = "";
        props.setSelectedFile(null);
    };

    const handleUploadButtonClick = () => {
        props.refImagen.current.click();
    };

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="col-span-full">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <div className="flex flex-col items-center">
                            <input
                                ref={props.refImagen}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileInputChange}
                            />
                            <button
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 mb-4"
                                onClick={handleUploadButtonClick}
                            >
                                Cargar una imagen
                            </button>
                            {props.selectedFile && (
                                <div className="flex flex-col items-center">
                                    <div className="relative flex-shrink-0 mb-2">
                                        <img
                                            src={URL.createObjectURL(props.selectedFile)}
                                            alt="Imagen seleccionada"
                                            className="w-full h-auto sm:w-48 md:w-64 lg:w-80 rounded-md object-cover border-4 border-indigo-600"
                                        />
                                        <button
                                            className="absolute top-0 right-0 -mt-2 -mr-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                            onClick={handleRemoveImage}
>
                                            X
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold text-gray-800">{props.selectedFile.name}</p>
                                        <p className="text-sm text-gray-500">{props.selectedFile.type}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeleccionarImagen;