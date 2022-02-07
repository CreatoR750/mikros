import "../App.css";
import arrow from "../assets/arrow.png";
import arrow2 from "../assets/arrow2.png";
import Filter from "./Filter";

const Body = () => {
    return (
        <main>
            <div className="wrapper">
                <div className="nav-path">
                    <a>Главная</a>
                    <img src={arrow}></img>
                    <a>Праздники</a>
                    <img src={arrow}></img>
                    <a>День рождения</a>
                    <img src={arrow}></img>
                    <a style={{ color: "black" }}>Полиграфия</a>
                    <img src={arrow2}></img>
                </div>
                <div className="category-title">
                    <h1>
                        Полиграфия ко дню рождения <span>(1300 товаров)</span>
                    </h1>
                </div>
                <div className="categories">
                    <div className="category-button">Открытки</div>
                    <div className="category-button">Конверты для денег</div>
                    <div className="category-button">Приглашения</div>
                    <div className="category-button">Плакаты, гирлянды</div>
                </div>
                <Filter />
            </div>
        </main>
    );
};

export default Body;
