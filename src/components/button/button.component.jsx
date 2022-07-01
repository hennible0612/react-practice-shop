import './button.styles.scss'
const BUTTON_TYPE_CLASSES = { /* 3가지 버튼 타입에 따라 디자인을 바꾸기 위해서*/
    google: 'google-sign-in',
    inverted: 'inverted',

}

const Button = ({children, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
                {...otherProps}>
            {children}

        </button>
    )
}

export default Button;