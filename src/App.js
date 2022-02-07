import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div>
            <div className="banner-back">
                <div className="wrapper">
                    <div className="banner">Скидка 10% на покупку от 3000 рублей при регистрации</div>
                </div>
            </div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
};

export default App;
