import styles from './errorFetch.module.css';

const ErrorFetch = () => {
  return (
    <div className={styles.error__window}>
      <p>Проблема на сервере! <br/>Попробуйте зайти к нам позже и получите скидку в 5% по промокоду <strong>"Ошибка fetch-запроса"</strong></p> 
    </div>
  )
}

export default ErrorFetch;