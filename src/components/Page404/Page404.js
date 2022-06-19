import styles from './Page404.module.css';

import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className={styles.page404}>
      <div className={styles.page404_text}>
        <h1>Такой страницы не существует!</h1>
        <Link to='/'>На главную</Link>
      </div>
    </div>
  )
}

export default Page404;