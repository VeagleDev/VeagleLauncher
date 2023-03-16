interface Props{
    path:string;
    color:string;
}

function Icon(props:Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="fill-orange w-icon h-icon" style={{ fill: `${props.color || '#EB5E28'}`}}>
            <path d={props.path}/>
        </svg>
    );
}
  
export default Icon;