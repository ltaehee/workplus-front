import { useState } from "react";
import SelectBox from "../components/common/SelectBox";

const VacationPage = () => {
    const [isOption, setIsOption] = useState("연차");
        
    const handleClickYear = () => {
        setIsOption("연차");
    }
    const handleClickMonth = () => {
        setIsOption("반차");
    }
    
    return(
        <div className="mt-96 p-6">
        <h2>select</h2>
        <SelectBox value={isOption} optionText0="종류" optionText1="연차" optionText2="반차"
                   onClick={handleClickYear} onClick1={handleClickMonth} />
        </div>
    )
}

export default VacationPage;
