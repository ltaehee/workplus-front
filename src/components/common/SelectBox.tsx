import React, {
  ChangeEvent,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useState,
} from "react";

// type SelectProps = {
//   value?: string;
//   defaultValue?: string;
//   id?: string;
//   optionText1: string;
//   optionText2: string;
//   className?: string;
//   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
// };

// const SelectBox: React.FC<SelectProps> = ({
//   value,
//   defaultValue,
//   optionText1,
//   optionText2,
//   className,
//   onChange,
//   id,
// }) => {
//   return (
//     <>
//       <form className={`${className}`}>
//         {id ? (
//           <label className={"text-sm"} htmlFor={id}>
//             {id}
//           </label>
//         ) : null}
//         <select
//           defaultValue={defaultValue}
//           onChange={onChange}
//           value={value}
//           className={`px-4 py-2 border text-gray-900 rounded-md w-full
//              focus:outline-none focus:ring-2 ${className}`}
//         >
//           <option value={optionText1}>{optionText1}</option>
//           <option value={optionText2}>{optionText2}</option>
//         </select>
//       </form>
//     </>
//   );
// };

interface SelectProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLSelectElement> {
  value?: string;
  defaultValue?: string;
  id?: string;
  optionText1?: string;
  optionText2?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox: FC<SelectProps> = (props) => {
  const { id, optionText1, optionText2, className, children, ...SelectProps } =
    props;

  return (
    <>
      {id ? (
        <label className={"text-sm"} htmlFor={id}>
          {id}
        </label>
      ) : null}
      <select
        className={`px-4 py-2 border text-gray-900 rounded-md w-full
              focus:outline-none focus:ring-2 ${className}`}
        {...SelectProps}
      >
        <option value={optionText1}>{optionText1}</option>
        <option value={optionText2}>{optionText2}</option>
        {children}
      </select>
    </>
  );
};

export default SelectBox;
