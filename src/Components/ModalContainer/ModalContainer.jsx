import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Fade } from "@mui/material";
import CreateEditEvents from "./ModalContent/CreateEditEvents";

// xxxxxxxxxxxxx

const ModalContainer = (props) => {
    const { index } = props;
    const [width, setWidth] = useState(380);
    const [height, setHeight] = useState(300);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        right: 0,
        transform: "translate(-50%, -50%) !important",
        width: width,
        bgcolor: "background.paper",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        p: 2,
        borderRadius: 3,
        border: "1px solid #C7C7C7",
        height: height,
        overflowX: "hidden",
        overflowY: index === 0 ? "auto" : "",
        outline: "none",
    };

    const backdropStyle = {
        // Add backdrop filter for blur
        backdropFilter: "blur(3px)",
    };

    const componentMap = {
        1: (
            <CreateEditEvents close={props.closeModal} event_id={props.event_id} create_event={props.createEvent} />
        )
    };

    useEffect(() => {
        if (index === 1) {
            setWidth(600)
            setHeight(400)
        }
    }, [index]);

    return (
        <Modal
            open={props.Isopen}
            onClose={props.closeModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                style: backdropStyle,
            }}
            className="modal-container"
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            style={{ overflow: "scroll" }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={props.Isopen}>
                <Box sx={style}>{componentMap[index]}</Box>
            </Fade>
        </Modal>
    );
};

export default ModalContainer;

export const HeadingTitle = (props) => {
    console.log(props);
    return (
        <>
            <div
                className={`header-cross-title ${props.center ? "center-text" : "left-align-text"
                    }`}
            >
                <Typography
                    style={{
                        color: "#1C1C1C",
                    }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    className={`${!props.center && "left-text"}`}
                >
                    {props.title}
                </Typography>
                <div className="bg-cross" onClick={props.closeModal}>
                    {/* <img src={CrossIcon} alt="" /> */}
                    <CloseIcon className="cross-icon-col" />
                </div>
            </div>
            {props.desc && (
                <p
                    style={{ marginTop: props.descTop ? "5px" : "" }}
                    className="description-text"
                >
                    {props.desc}
                </p>
            )}
        </>
    );
};