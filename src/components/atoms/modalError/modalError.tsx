import { FC, useEffect, useState } from "react";
import "./modalError.css";

export const ModalError: FC<{ open: boolean }> = ({ open }) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <>
      {openModal && (
        <div className="modal">
          <div className="modal-body">Ops try again.</div>
          <div className="modal-action">
            <button onClick={() => setOpenModal(false)}>Ok</button>
          </div>
        </div>
      )}
    </>
  );
};
