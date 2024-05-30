import React from "react";
import { HeadingTitle } from "../ModalContainer";
import { Button } from "@material-ui/core";

const ConfirmationDialog = ({
    close,
    title,
}) => {
    return (
        <>
            <HeadingTitle title={title} center={false} closeModal={close} />
            <div className="confirmation-box-row">
                <p>
                    Before creating a new box, could you please close the previous one?
                </p>
                <div className="confirmation-container">
                    <Button>
                        Yes
                    </Button>
                    <Button onClick={close}>No</Button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;