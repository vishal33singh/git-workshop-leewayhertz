import React from "react";
import {CircularProgress} from "@material-ui/core";

function PublishModal({ isLoading, eventName }) {

    return (
        <>
            {isLoading ? (
                <div className="fixed inset-0 z-0  bg-darkGrey-100 bg-opacity-70 flex justify-center pt-59.75">
                    <div className="z-20 flex flex-col justify-center h-72.25 w-125 bg-white rounded-lg -mx-5 px-12">

                        <h1 className="font-OpenSansSemiBold text-ft7 text-center text-slate-350">
                            {`Minting of ticket NFTs for ${eventName} on Klaytn is in progress...`}
                        </h1>

                        <div className="flex justify-center mt-8">
                            <CircularProgress/>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default PublishModal;
