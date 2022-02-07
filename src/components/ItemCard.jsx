import love from "../assets/love.png";
import cardImg from "../assets/Group 161.png";
import r from "../assets/r.png";

const ItemCard = ({ item }) => {
    return (
        <div className="card-wrapper">
            <div className="card-header">
                <div>
                    <span style={{ color: "#A8A8A8" }}>Артикул: </span>
                    {item._source.RM_ARTICLE}{" "}
                </div>
                <img src={love} alt="icon"></img>
            </div>
            <img src={cardImg} alt="icon"></img>
            <div className="item-name">
                <span>{item._source.PROPERTYS.NAIMENOVANIE_DLYA_SAYTA}</span>
            </div>
            <div className="item-price">
                <h1>{item._source.PRICE.BASE}</h1>
                <img src={r} alt="icon"></img>
            </div>
            <div className="item-available">
                <div className="item-store">
                    <div style={{ color: "#A8A8A8", fontSize: "13px" }}>Наличие на складах:</div>
                    <div style={{ fontSize: "13px" }}>Ростов-на-Дону - {item._source.STORE[472]} </div>
                    <div style={{ fontSize: "13px" }}>Воронеж - {item._source.STORE[475]}</div>
                </div>
                <div>
                    <button className="add-button">В корзину</button>
                </div>
            </div>
            <div className="item-promo">
                <div style={{ fontSize: "13px" }}>До конца акции: 06:55:47</div>
                <div style={{ fontSize: "13px" }}>Мин.партия-1рул</div>
            </div>
        </div>
    );
};

export default ItemCard;
