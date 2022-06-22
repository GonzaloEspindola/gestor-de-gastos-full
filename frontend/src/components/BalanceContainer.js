import React from "react";

function BalanceContainer ({type, ammount}) {
    return (
        <div className={`balance_container ${type}`}>
            <h1>$ {ammount}</h1>
            <p>{type}</p>
        </div>
    )
}

export {BalanceContainer};