import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  date: string;
  organizer: string;
  agenda: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  date,
  organizer,
  agenda,
}) => {
  const [modalData, setModalData] = useState<{
    title: string;
    date: string;
    organizer: string;
    agenda: string;
  } | null>();

  const fetchData = async () => {
    try {
      const response = await axios.get("api/meeting");
      const data = response.data;

      setModalData({
        title: data.title,
        date: data.date,
        organizer: data.organizer,
        agenda: data.agenda,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return;

  /* 모달 밖부분 클릭해도 모달 닫히게  */
  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  /* 모달 내부에서 클릭 시 안닫히게 */
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 border-2 border-blue-500"
    >
      <div
        onClick={handleModalClick}
        className=" flex flex-col justify-center items-center w-96  bg-white p-6 rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">일자: {date}</p>
        <div className="w-full h-px my-4 bg-gray-300"></div>
        <div className="w-full flex flex-col justify-left text-sm">
          <p className="mt-4 text-gray-500">주최자</p>
          <p className="mt-2">{organizer}</p>
          <p className="mt-10 text-gray-500">회의 안건</p>
          <p className="mt-2">{agenda}</p>
        </div>
        <Button onClick={onClose} btnText="확인" className="mt-8" />
      </div>
    </div>
  );
};

export default Modal;
