import styles from './galery.module.css';

import { useState } from 'react';

const Galery = ({images, title}) => {
  const defaultImg = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg';
  const [offsetImg, setOffsetImg] = useState(0);

  const naviBlock = images.map((_, i) => {
    const style = offsetImg === 500 * i ? {background: '#be5d5d'} : null;

    return (
      <div 
        key={i}
        className={styles.navi__block}
        style={style}
        onClick={() => setOffsetImg(500 * i)}>
      </div>
    )  
  });

  const allImages = images.map((item, id) => {
    return (
      <div key={id} className={styles.image__block}>
        <img src={item.includes('image') ? item : defaultImg} alt={title} />
      </div>
    )
  });

  return (
    <div className={styles.images__wrapper}>
      <div 
        className={styles.images__line}
        style={{left: `${-offsetImg}px`}}>
        {allImages}
      </div>
      <div className={styles.images__navi}>
        {naviBlock}
      </div>    
    </div>
  )
}

export default Galery;