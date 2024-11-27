import React, { useState } from "react";

type SelectProps = {
value: string;
onClick: () => void;
onClick1: () => void;
optionText0: string;
optionText1: string;
optionText2: string;
className?: string;
}

const SelectBox: React.FC<SelectProps> = ({value, onClick, onClick1, optionText0, optionText1, optionText2, className}) => {

    return(
        <>
            <form className={`max-w-sm ${className}`}>
                <select className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}>
                    <option disabled hidden selected>{optionText0}</option>
                    <option value={value} onClick={onClick}>{optionText1}</option>
                    <option value={value} onClick={onClick1}>{optionText2}</option>
                </select>
            </form>
        </>
    )
}

export default SelectBox;