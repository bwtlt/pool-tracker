import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faHistory, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import History from './history';

function Item(props) {
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState('');
    const [value, setValue] = useState(props.value);
    const [showHistory, setShowHistory] = useState(false);

    const historyValues = History[props.name];

    const historyComponent =
        <div className="history">
            <div className="history-header">
                <span></span>
                <h3>Historique</h3>
                <Button onClick={() => { setShowHistory(false); }}><FontAwesomeIcon className="button-icon" icon={faClose} /></Button>
            </div>
            <div>
                {historyValues && historyValues.map((i) => (
                    <li key={i.date}>
                        {i.date} - <span className="history-value">{i.value}</span>
                    </li>
                ))}
            </div>
        </div>;

    const display = showHistory ? historyComponent :
        <>
            <div className="value-container">
                <span className="value">{value}</span>
                <span className="unit"> {props.unit}</span>
            </div>
            <div className="value-date">{props.date}</div>
            <div className="controls">
                {!edit && <Button onClick={() => {
                    setEdit(true);
                }}><FontAwesomeIcon className="button-icon" icon={faEdit} /></Button>}
                {!edit && <Button onClick={() => {
                    setShowHistory(true);
                }}><FontAwesomeIcon className="button-icon" icon={faHistory} /></Button>}
                {edit && 
                <>
                    <input className="value-input" id={props.name} value={input} onInput={e => setInput(e.target.value)} />
                    <Button onClick={() => {
                        setEdit(false);
                        setValue(input);
                    }}><FontAwesomeIcon className="button-icon" icon={faCheck}/></Button>
                    <Button onClick={() => {
                        setEdit(false);
                    }}><FontAwesomeIcon className="button-icon" icon={faClose}/></Button>
                </>}
            </div>
        </>;

    return (
        <div className="item">
            <h2 className="item-name">{props.name}</h2>
            {display}
        </div>);
}

export default Item;