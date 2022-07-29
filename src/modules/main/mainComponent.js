import React from "react";
import Billboard from '../billboard/index'
import Header from "../header/header";

function MainComponent(){
    return (
        <div className="global-container flex justify-center">
            <div className="max-width-1640px">
                <Header/>
                <Billboard/>
            </div>
        </div>
    )
}

export default MainComponent;
