import styles from './about.module.css';

const About = () => {
    document.title = 'About';

    return (
        <div className={styles.about__block}>
            <div className={styles.about__text}>
                <h1>О магазине</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi omnis ex magnam porro impedit. Eos impedit facere ea beatae! Laudantium, dolores? Ad, nulla magnam fugit odio vero quas, ab error repellat dolore dolorum rerum iure! Quam laborum a neque omnis totam corporis quisquam fugiat tempora! Corporis, itaque atque est perspiciatis fugit sequi unde illo quia necessitatibus hic inventore mollitia numquam rerum. Alias animi dolorem dicta eligendi ab, nam ut eaque harum libero illum. Nihil consequuntur ex dolorem odit harum ut pariatur quisquam ab recusandae dicta quasi omnis quae iusto, neque ipsa delectus, ducimus nemo ullam, accusamus laudantium nulla nam minus quidem! Eligendi molestias praesentium provident esse possimus molestiae debitis perspiciatis dolore ut ducimus distinctio qui beatae, vel sapiente delectus, aliquam, excepturi ratione maxime. Ea minima cumque, nobis iusto obcaecati cum perspiciatis culpa ut.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut placeat ad, aliquam obcaecati sint unde mollitia, neque ab necessitatibus fuga dignissimos debitis dolore quo dolorum! Illum vel assumenda fugiat eos recusandae. Neque veniam cum ex saepe maxime eveniet sint laboriosam necessitatibus beatae molestiae? Veritatis error ab vitae ut voluptate optio!</p>
            </div>
        </div>
    )
}

export default About;