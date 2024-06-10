import React from 'react';
import ReactDOM from 'react-dom/client';
import formCss from './form.css'
import {useState} from 'react'


const Form = (props) => { 

    const [value, setValue] = useState("")
    return ( 
        <form className="form" onSubmit={e => { 
            e.preventDefault();
            props.putTodo(value);
            setValue("");
        }}> 
            <input className="input" type="text" placeholder="Введите текст" value={value} onChange={e => setValue(e.target.value)}></input>
            <button className="btn-ord">create</button>
        </form>
    )
}


export default Form