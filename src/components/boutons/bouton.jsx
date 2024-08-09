import './bouton.css';

export default function Bouton(props) {
    return (
        <button width={props.width} onClick={props.onClick} className='bouton'>
            {props.text}
        </button>
    )
}