import Modal from "@mui/material/Modal";
import { GetIcon } from "../../../../icons";
import REButton from "../../REButton/REButton";

const DeleteModal = ({ modalOpen, handleClose, task, setModalOpen, clickOnDelete }) => {
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[30%] min-h-[34%] max-h-[35%] rounded-lg shadow-xl bg-white border-none overflow-y-auto">
          <div className="flex justify-between items-center p-5 border-b-2 border-gray-200">

            <div className="text-2xl font-bold text-lightBlack">{task?.title}</div>


            <div className="cursor-pointer" onClick={handleClose}>
              <GetIcon name="CrossIcon" className="h-6 w-6" />
            </div>
          </div>

          <div className="mx-1 my-2">
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Are you sure you want to delete this task?</h3>
              </div>

            </div>
          </div>

          <div className="border-t-2 border-gray-200">
            <div className="flex justify-center gap-2 p-4">
              <REButton
                text="Yes"
                className={"bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2"}
                onClick={() => { clickOnDelete(task); setModalOpen(false) }}
                theme="secondary"
              />
              <REButton
                text="No"
                className={"bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-lg px-4 py-2"}
                onClick={() => setModalOpen(false)}
                theme="secondary"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
