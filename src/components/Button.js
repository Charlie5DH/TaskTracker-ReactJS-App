import PropTypes from 'prop-types'

const Button = ( {color, text, onClick} ) => {
    return (
        <button
        onClick={onClick} 
        style={{ backgroundColor:color }} 
        className='btn'>{text}
        </button>
    )
}

// defining default props
Button.defaultProps = {
    color: 'steelblue',
    text: 'Add',
}

//defining propTypes. This is way to make the code more robust setting the expected props
Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
