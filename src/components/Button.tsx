type ButtonProps = {
    onClick: ()=>void;
    value: string;
}
//Props sont les propriétés que l'on demande lorsque l'on appele le components

export const Button = ({onClick, value}: ButtonProps) => {
  return (
      <button onClick={onClick}>{value}</button>
  )
}