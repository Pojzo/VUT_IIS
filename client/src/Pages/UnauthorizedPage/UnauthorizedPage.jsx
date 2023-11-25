import React from "react";
import Header from "components/Header/Header"
import bateman from "./bateman.jpg"

export const UnauthorizedPage = () => {
    return (
        <>
            <Header />
            <div className="width-container" style={{
                textAlign: 'center'
            }}>
                <p style ={{
                    fontSize: 55,
                    fontWeight: 'bold',
                    color: 'red'
                }}>NOT AUTHORIZED!!!</p>
                <img src={bateman} alt="bateman" />
            </div>
        </>
    )
}