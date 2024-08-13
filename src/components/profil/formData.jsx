import React, { Fragment } from 'react'

const FormData = ( {id, name, setEtat, value}) => {
    return (
        <>
            <div className="divModif">
                <label htmlFor={id}>{name}</label>
                <img src="/images/modification.png"
                    alt="icone de modification"
                    className="modification"
                    onClick={() => setEtat(true)} />
            </div>
            <input type={id} id={id} name={name} value={value} />
        </ >
    )
}

export default FormData