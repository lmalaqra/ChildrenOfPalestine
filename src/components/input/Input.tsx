import * as React from "react"
import { ReactNode,ReactElement } from "react"
import "./input.scss"

type inputProps={
    inputType:string,
    name:string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    values ?: string[],
    children ?:ReactNode,
    value:any

}


const Input:React.FC<any>=(props:inputProps):JSX.Element=>{

switch (props.inputType) {
    case "select":
        return <>
        <select  name={props.name} onChange={(e)=>{
   props.changeHandler(e);
}}>
{props.values.map((e,index)=><option key={index} value={e}> {e}</option>)}
        </select>
        
        </>
        break;

    default:
        return <>
        <div className="input">

<input value={props.value} name={props.name} type={props.inputType} placeholder={props.name}  onChange={(e)=>{
   props.changeHandler(e);
}}  required={true}></input>
        <label className="label" htmlFor={props.name}>{props.name}</label>

</div>
</>
        break;
}


}

export default Input;