import Modal from "@mui/material/Modal";

const REModal = ({ modalOpen, handleClose }) => {


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
            <div className="text-2xl font-bold text-lightBlack">Modal Title</div>
            <div className="cursor-pointer" onClick={handleClose}>
              <GetIcon name="CrossIcon" className="h-6 w-6" />
            </div>
          </div>

          <div className="mx-1 my-5">
            Modal content
          </div>

          <div className="absolute bottom-3 left-[45%]  bg-white">
            Modal Footer
            {/* <REModal
              // disabled={!isValid}
              iconLeft={
                <GetIcon
                  name="AddShoppingCartOutlinedIcon"
                  className="w-4 h-4 text-white"
                />
              }
              text={`Add `}
              className="bg-green text-white w-full text-[16px] flex justify-center rounded-md hover:bg-darkGreen transition-all ease-out duration-300"
              customSize="py-3 px-4"
              // onClick={handleSubmit}
            /> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default REModal;
