import React from 'react'

const UpdatePopup = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close" onClick={() => props.setTrigger(false)}>
                    <i className="fa fa-times-circle" aria-hidden="true"></i></button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default UpdatePopup