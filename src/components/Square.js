function Square(props) {
  const boldStyle = props.isBold ?
  {'fontWeight': 'bold'} :
  {'fontWeight': 'normal'}

  return (
    <button
      className="square"
      style={boldStyle}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

export default Square
