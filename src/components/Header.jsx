import "../App.css";
import location from "../assets/location.png";
import logo from "../assets/logo.png";
import catalog from "../assets/catalog.png";
import person from "../assets/Person.png";
import basket from "../assets/full.png";
import love from "../assets/love.png";

const Header = () => {
    return (
        <header>
            <div className="wrapper">
                <div className="nav-bar">
                    <div className="nav-location">
                        <img src={location}></img>
                        Воронеж
                    </div>
                    <div className="nav-buttons">
                        <a>Новости</a>
                        <a>Контакты</a>
                        <a>Условия работы</a>
                        <a>Доставка</a>
                        <a>Оставить отзыв</a>
                    </div>
                    <div className="nav-time">Пн - Пт: 08:00 - 17:00</div>
                </div>
                <div className="search-bar">
                    <div className="search-content">
                        <img className="logo" src={logo}></img>
                        <div className="search-title">
                            <div>
                                <h1>Крупнейший выбор товаров для праздника</h1>
                                Оптовый интернет - магазин
                            </div>
                            <div className="search-wrapper">
                                <button>
                                    <img src={catalog}></img> <span>Каталог</span>
                                </button>
                                <input placeholder="Название товара или артикул"></input>
                            </div>
                        </div>
                    </div>
                    <div className="user-wrapper">
                        <div className="user-phones">
                            <div>
                                <h2>8 (900) 949 83-73</h2>
                                Заказать звонок
                            </div>
                            <div>
                                <h2>8 (900) 949 83-73</h2>
                                <span>Бесплатно по РФ</span>
                            </div>
                        </div>
                        <div className="user-activity">
                            <div className="user-card">
                                <div>
                                    <img src={person}></img>
                                </div>
                                <div> Войти</div>
                            </div>
                            <div className="user-card">
                                <div>
                                    <img src={basket}></img>
                                </div>
                                <div> 1000 руб</div>
                            </div>
                            <div className="user-card">
                                <div>
                                    <img src={love}></img>
                                </div>
                                <div> Избранное</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
