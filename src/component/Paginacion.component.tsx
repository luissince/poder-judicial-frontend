import React, { useRef } from "react";

type Props = {
    loading: boolean,
    restart: boolean,
    paginacion: number,
    totalPaginacion: number,
    fillTable: (value: number) => void,
}

const Paginacion = (props: Props) => {

    const upperPageBound = useRef(3);
    const lowerPageBound = useRef(0);
    const isPrevBtnActive = useRef("disabled");
    const isNextBtnActive = useRef("");
    const pageBound = useRef(3);

    const setPrevAndNextBtnClass = (listid: number) => {
        isNextBtnActive.current = "disabled";
        isPrevBtnActive.current = "disabled";

        if (
            props.totalPaginacion === listid &&
            props.totalPaginacion > 1
        ) {
            isPrevBtnActive.current = "";
        } else if (listid === 1 && props.totalPaginacion > 1) {
            isNextBtnActive.current = "";
        } else if (props.totalPaginacion > 1) {
            isNextBtnActive.current = "";
            isPrevBtnActive.current = "";
        }

        props.fillTable(listid);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (props.loading) return;


        let listid = parseInt(event.currentTarget.id);
        setPrevAndNextBtnClass(listid);
    }

    const btnPrevClick = () => {
        if (props.loading) return;

        if ((props.paginacion - 1) % pageBound.current === 0) {
            upperPageBound.current = upperPageBound.current - pageBound.current;
            lowerPageBound.current = lowerPageBound.current - pageBound.current;

        }
        let listid = props.paginacion - 1;
        setPrevAndNextBtnClass(listid);
    }

    const btnNextClick = () => {
        if (props.loading) return;

        if (props.paginacion + 1 > upperPageBound.current) {
            upperPageBound.current = upperPageBound.current + pageBound.current;
            lowerPageBound.current = lowerPageBound.current + pageBound.current;
        }
        let listid = props.paginacion + 1;
        setPrevAndNextBtnClass(listid);
    }

    const btnDecrementClick = () => {
        if (props.loading) return;

        upperPageBound.current = upperPageBound.current - pageBound.current;
        lowerPageBound.current = lowerPageBound.current - pageBound.current;
        let listid = upperPageBound.current;
        setPrevAndNextBtnClass(listid);
    }

    const btnIncrementClick = () => {
        if (props.loading) return;

        upperPageBound.current = upperPageBound.current + pageBound.current;
        lowerPageBound.current = lowerPageBound.current + pageBound.current;

        let listid = lowerPageBound.current + 1;
        setPrevAndNextBtnClass(listid);
    }

    if (props.restart) {
        upperPageBound.current = 3;
        lowerPageBound.current = 0;
        isPrevBtnActive.current = "disabled"
        isNextBtnActive.current = "";
        pageBound.current = 3;
    }

    const pageNumbers = [];
    for (let i = 1; i <= props.totalPaginacion; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number, index) => {
        if (number === 1 && props.paginacion === 1) {
            return (
                <li key={index} aria-current="page">
                    <button className="bg-upla-100 text-white text-sm px-3 py-2 border-r border-t border-b border-gray-300 hover:bg-upla-200">{number}</button>
                </li>
            );
        } else if (
            number < upperPageBound.current + 1 &&
            number > lowerPageBound.current
        ) {
            return (
                <li
                    key={index}
                // className={`page-item ${number === props.paginacion ? "active" : ""}`}
                >
                    {number === props.paginacion ? (
                        <button id={"" + number} className={`${number === props.paginacion ? "bg-upla-100 text-white" : ""} text-sm px-3 py-2 border-r border-t border-b border-gray-300 hover:bg-upla-200`}>
                            {number}
                        </button>
                    ) : (
                        <button
                            id={"" + number}
                            className="text-sm px-3 py-2 border-r border-t border-b border-gray-300 hover:bg-gray-200"
                            onClick={handleClick}
                        >
                            {number}
                        </button>
                    )}
                </li>
            );
        } else {
            return null;
        }
    });

    let pageDecrementBtn = null;
    if (lowerPageBound.current >= 1) {
        pageDecrementBtn = (
            <li>
                <button className="text-sm px-3 py-2 border-r border-t border-b border-gray-300 hover:bg-gray-200" onClick={btnDecrementClick}>
                    {" "}
                    &hellip;{" "}
                </button>
            </li>
        );
    }

    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound.current) {
        pageIncrementBtn = (
            <li>
                <button className="text-sm px-3 py-2 border-t border-r border-b border-gray-300 hover:bg-gray-200" onClick={btnIncrementClick}>
                    {" "}
                    &hellip;{" "}
                </button>
            </li>
        );
    }

    let renderPrevBtn = null;
    if (isPrevBtnActive.current === "disabled" ||
        props.totalPaginacion <= 1) {
        renderPrevBtn = (
            <li>
                <button disabled className="disabled:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed text-sm px-3 py-2 rounded-l-md border border-gray-300 hover:bg-gray-200"> Ante. </button>
            </li>
        );
    } else {
        renderPrevBtn = (
            <li>
                <button className="disabled:bg-gray-300 disabled:cursor-not-allowed text-sm px-3 py-2 rounded-l-md border border-gray-300 hover:bg-gray-200" onClick={btnPrevClick}>
                    {" "}
                    Ante.{" "}
                </button>
            </li>
        );
    }

    let renderNextBtn = null;
    if (
        isNextBtnActive.current === "disabled" ||
        props.totalPaginacion <= 1
    ) {
        renderNextBtn = (
            <li>
                <button disabled className="disabled:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed text-sm px-3 py-2 rounded-r-md border-t border-r border-b border-gray-300 hover:bg-gray-200"> Sigui. </button>
            </li>
        );
    } else {
        renderNextBtn = (
            <li>
                <button className="text-sm px-3 py-2 rounded-r-md border-t border-r border-b border-gray-300 hover:bg-gray-200" onClick={btnNextClick}>
                    {" "}
                    Sigui.{" "}
                </button>
            </li>
        );
    }


    return (
        <>
            {renderPrevBtn}
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            {renderNextBtn}
        </>
    );
}

export default Paginacion;