import React from 'react';
import ReactDom from 'react-dom';

const FinalCheckModal = ({ open, children, onClose, handleSubmit }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-40" />
      <div dir='rtl' className="flex flex-col max-h-96 overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 custom-scrollbar">
        {children}
        <div className="flex m-8">
          <button
            onClick={onClose}
            className="border rounded-full px-8 pb-1 transition duration-300 ease-in-out transform hover:scale-105"
          >
            ویرایش
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-900 text-white border rounded-full px-14 pb-1 mr-4 transition duration-300 ease-in-out transform hover:scale-105"
          >
            تائید
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default FinalCheckModal;
