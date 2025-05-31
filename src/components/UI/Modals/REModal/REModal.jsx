import Modal from "@mui/material/Modal";
import { GetIcon } from "../../../../icons";

const REModal = ({ modalOpen, handleClose, footer, content, title}) => {


  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[40%] min-h-[79%] max-h-[80%] rounded-lg shadow-xl bg-white border-none overflow-y-auto">
          <div className="flex justify-between items-center p-5">
            <div className="text-2xl font-bold text-lightBlack">{title}</div>
            <div className="cursor-pointer" onClick={handleClose}>
              <GetIcon name="CrossIcon" className="h-6 w-6" />
            </div>
          </div>

          <div className="mx-1 my-5">
            {content ? (
              content
            ) : (
              <div className="text-center text-gray-500">
                No content available.
              </div>
            )}
          </div>

          <div className="absolute bottom-3 left-[45%]  bg-white">
           {footer ? (
            <div className="flex justify-end p-3">
              {footer}
            </div>
           ) : (
            <div className="flex justify-end p-3">
              <button onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
            </div>
           )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default REModal;
