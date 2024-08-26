import React from 'react'

const FormData = ({ id, name, setEtat, value }) => {
    return (
        <>
            <label htmlFor={id} className="labelModif">{name} :</label>
            <div className="divModif">
                <p className='value'>{value}</p>
                <img src="/images/modification.png"
                    alt="icone de modification"
                    className="modification"
                    onClick={() => setEtat(true)} />
            </div>
        </>
    )
}

export default FormData