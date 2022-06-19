import styles from './button.module.css';

const Button = ({value, handle, isDisabled = false}) => {
  return (
    <div className={styles.cart__block}>
      <button 
        disabled={isDisabled}
        href="#" 
        onClick={handle}>
        {value}
      </button>
    </div>
  )
}

export default Button;