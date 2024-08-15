import './bouton.css';

export default function Bouton(props) {
    return (
        <button style={props.style} onClick={props.onClick} className='bouton'>
            {props.text}
        </button>
    )
}