
import "./form-input.styles.scss"
const FormInput = ({label, ...otherProps}) => { // type required 등등 을 otherProps로 받아 온다.
    return (
        <div className="group">
            <input className="form-input" {...otherProps}/>

            {/* string interpulation을 사용하여 만약 otherProps의 value가 있으면 shrink를 추가 하고 없으면 추가하지마라*/}
            {
                label && ( /*만약 라벨이 있다면 */
                    <label className={`
                    ${otherProps.value.length ? 'shrink' : null} 
                    form-input-label`}>{label}
                    </label>
                )
            }

        </div>

    )
};

export default FormInput;