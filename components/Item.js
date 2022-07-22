import React, { useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faHistory, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

function Item(props) {
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState("");
    const [value, setValue] = useState(props.value);
    const [date, setDate] = useState(props.date);
    const [showHistory, setShowHistory] = useState(false);

    const historyValues = props.history;

    const handleSubmit = async (name, value) => {
        const data = {
            name,
            value,
        }
        const JSONdata = JSON.stringify(data)

        // Send the form data to our API and get a response.
        const response = await fetch('/api/form', {
            // Body of the request is the JSON data we created above.
            body: JSONdata,

            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // The method is POST because we are sending data.
            method: 'POST',
        })

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
    }

    const historyComponent =
        <div className="history">
            <div className="history-header">
                <span></span>
                <h3>Historique</h3>
                <Button onClick={() => { setShowHistory(false); }}><FontAwesomeIcon className="button-icon" icon={faClose} /></Button>
            </div>
            <div>
                {historyValues && historyValues.map((i) => (
                    <li className="history-entry" key={i[0]}>
                        {i[0]} - <span className="history-value">{i[1]}</span>
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
            <div className="value-date">{date}</div>
            <div className="controls">
                {!edit && <Button className="action-button" onClick={() => {
                    setEdit(true);
                }}><FontAwesomeIcon className="button-icon" icon={faEdit} /></Button>}
                {!edit && <Button className="action-button" onClick={() => {
                    setShowHistory(true);
                }}><FontAwesomeIcon className="button-icon" icon={faHistory} /></Button>}
                {edit &&
                    <InputGroup>
                        <Form.Control
                            placeholder="Valeur"
                            aria-label="Valeur"
                            onInput={e => setInput(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => {
                            setEdit(false);
                            setValue(input);
                            setDate(new Date(Date.now()).toLocaleString());
                            handleSubmit(props.name, input);
                        }}><FontAwesomeIcon className="button-icon" icon={faCheck} /></Button>
                        <Button variant="outline-secondary" onClick={() => {
                            setEdit(false);
                        }}><FontAwesomeIcon className="button-icon" icon={faClose} /></Button>
                    </InputGroup>
                }
            </div>
        </>;

    return (
        <div className="item">
            <h2 className="item-name">{props.name}</h2>
            {display}
        </div>);
}

export default Item;