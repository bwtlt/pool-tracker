import React, { useState } from 'react';

function Item(props) {
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState('');
    const [value, setValue] = useState(props.value);

    return (
        <div className="item">
            <h2 className="item-name">{props.name}</h2>
            <div className="value-container">
                <span className="value">{value}</span>
                <span className="unit"> {props.unit}</span>
            </div>
            <div className="value-date">{props.date}</div>
            {!edit && <button className="measure-button" onClick={() => {
                setEdit(true);
            }}>Mesure</button>}
            {edit && <form className="edit-container">
                <input className="value-input" id={props.name} value={input} onInput={e => setInput(e.target.value)}/>
                <button onClick={() => {
                    setEdit(false);
                    setValue(input);
                }}>Ok</button>
                <button onClick={() => {
                    setEdit(false);
                }}>Annuler</button>
            </form>}
        </div>);
}

export default Item;