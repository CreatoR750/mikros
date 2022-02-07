import { useEffect, useState } from "react";
import "../App.css";
import FiltersInfo from "./FiltersInfo";
import Slider from "@material-ui/core/Slider";
import Checkboxes from "./Checkboxes";
import { sizes, colors, materials, sections } from "../checkBoxValues";
import r from "../assets/rblack.png";
import arrow from "../assets/listArrow.png";
import arrow2 from "../assets/listArrow2.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import arrowSmall from "../assets/arrow2.png";
import ItemsList from "./ItemsList";
import Pagination from "./Pagination";
import { ThemeProvider } from "@material-ui/styles";
import { muiTheme } from "../sliderTheme";

const Filter = () => {
    const [items, setItems] = useState([]);
    const [value, setValue] = useState([200, 10000]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [dataFilters, setDataFilters] = useState({
        size: [],
        color: [],
        material: [],
        section: [],
        price: [200, 10000],
        sort: "По алфавиту",
    });

    const [isFilterShow, setIsFilterShow] = useState({ priceFilter: false, sizeFilter: false, colorFilter: false, materialFilter: false, sectionFilter: false });
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const response = await fetch("http://localhost:3000/hits");
        let data = await response.json();
        let strData = JSON.stringify(data);
        let parseData = JSON.parse(strData, (_, v) => (typeof v === "string" ? v.replaceAll(`&quot;`, ``) : v));
        setItems(parseData);
        setFilteredItems(parseData);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = (event) => {
        setAnchorEl2(null);
    };

    const addSort = (event) => {
        handleFilters(event.target.innerText, "sort");
        handleClose();
    };

    const handleFilters = (filters, category) => {
        const newFilters = { ...dataFilters };
        newFilters[category] = filters;
        setDataFilters(newFilters);
        applyFilters(newFilters);
    };

    const applyFilters = (filters) => {
        const priceResult = priceFilter(filters.price, items);
        const sizeResult = sizeFilter(filters.size, items);
        const colorResult = colorFilter(filters.color, items);
        const materialResult = materialFilter(filters.material, items);
        const sectionResult = sectionFilter(filters.section, items);
        const inter = intersection(priceResult, sizeResult);
        const inter2 = intersection(inter, colorResult);
        const inter3 = intersection(inter2, materialResult);
        const inter4 = intersection(inter3, sectionResult);
        const finalItems = sortItems(inter4, filters.sort);
        setFilteredItems(finalItems);
    };

    const sortItems = (itemsToSort, sortedWay) => {
        if (sortedWay === "По алфавиту") {
            let alp = itemsToSort.sort((a, b) => a._source.PROPERTYS.NAIMENOVANIE_DLYA_SAYTA.localeCompare(b._source.PROPERTYS.NAIMENOVANIE_DLYA_SAYTA));
            return alp;
        } else if (sortedWay === "По возрастанию цены") {
            let sortedItems = itemsToSort.sort((a, b) => parseFloat(a._source.PRICE.BASE) - parseFloat(b._source.PRICE.BASE));
            return sortedItems;
        } else if (sortedWay === "По убыванию цены") {
            let sortedItems = itemsToSort.sort((a, b) => parseFloat(b._source.PRICE.BASE) - parseFloat(a._source.PRICE.BASE));
            return sortedItems;
        }
    };

    const intersection = (array1, array2) => {
        if (array2.length === 0) {
            return array1;
        } else return array1.filter((value) => array2.includes(value));
    };

    const rangeSelector = (event, newValue) => {
        setValue(newValue);
        setTimeout(() => handleFilters(value, "price"), 500);
    };

    const priceFilter = (filterArr, itemsToFilter) => {
        let result = [];
        if (filterArr.length !== 0) {
            let result = itemsToFilter.filter((item) => item._source.PRICE.BASE > filterArr[0] && item._source.PRICE.BASE < filterArr[1]);
            return result;
        } else return result;
    };

    const sizeFilter = (filterArr, itemsToFilter) => {
        let result = [];
        if (filterArr.length !== 0) {
            filterArr.map((filter) => {
                let newItems = itemsToFilter.filter((item) => item._source.PROPERTYS.RAZMER === String(filter));
                return (result = result.concat(newItems));
            });
            return result;
        } else return result;
    };

    const colorFilter = (filterArr, itemsToFilter) => {
        let result = [];
        if (filterArr.length !== 0) {
            filterArr.map((filter) => {
                let newItems = itemsToFilter.filter((item) => item._source.PROPERTYS.TSVET === String(filter));
                return (result = result.concat(newItems));
            });
            return result;
        } else return result;
    };

    const materialFilter = (filterArr, itemsToFilter) => {
        let result = [];
        if (filterArr.length !== 0) {
            filterArr.map((filter) => {
                let newItems = itemsToFilter.filter((item) => item._source.PROPERTYS.MATERIAL === String(filter));
                return (result = result.concat(newItems));
            });
            return result;
        } else return result;
    };

    const sectionFilter = (filterArr, itemsToFilter) => {
        let result = [];
        if (filterArr.length !== 0) {
            filterArr.map((filter) => {
                let newItems = itemsToFilter.filter((item) => {
                    if (item._source.SECTIONS.hasOwnProperty("2") && item._source.SECTIONS.hasOwnProperty("3")) {
                        return item._source.SECTIONS[1].NAME === String(filter) || item._source.SECTIONS[2].NAME === String(filter) || item._source.SECTIONS[3].NAME === String(filter);
                    } else if (item._source.SECTIONS.hasOwnProperty("2")) {
                        return item._source.SECTIONS[1].NAME === String(filter) || item._source.SECTIONS[2].NAME === String(filter);
                    } else {
                        return item._source.SECTIONS[1].NAME === String(filter);
                    }
                });
                return (result = result.concat(newItems));
            });
            return result;
        } else return result;
    };

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItem = filteredItems.slice(firstItemIndex, lastItemIndex);

    const addItemsNumber = (event) => {
        setItemsPerPage(Number(event.target.innerText));
        handleClose2();
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="filter-and-items">
                <div className="filter-wrapper">
                    <div
                        className="list-header"
                        onClick={() =>
                            setIsFilterShow((prev) => ({
                                ...isFilterShow,
                                priceFilter: !prev.priceFilter,
                            }))
                        }
                    >
                        <img src={isFilterShow.priceFilter ? arrow2 : arrow} alt="icon"></img>
                        <h1>
                            Цена, <img src={r} alt="icon"></img>:
                        </h1>
                    </div>

                    {isFilterShow.priceFilter ? (
                        <div className="price-filter">
                            <div className="price-values">
                                <div className="price 1">
                                    <span style={{ color: "#A8A8A8" }}>от</span> {value[0]}
                                </div>
                                <div className="price 2">
                                    <span style={{ color: "#A8A8A8" }}>до</span> {value[1]}
                                </div>
                            </div>
                            <ThemeProvider theme={muiTheme}>
                                <Slider min={0} max={10000} value={value} onChange={rangeSelector} valueLabelDisplay="off" />
                            </ThemeProvider>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div
                        className="list-header"
                        onClick={() =>
                            setIsFilterShow((prev) => ({
                                ...isFilterShow,
                                sizeFilter: !prev.sizeFilter,
                            }))
                        }
                    >
                        <img src={isFilterShow.sizeFilter ? arrow2 : arrow} alt="icon"></img> <h1>Размер,см: </h1>
                    </div>
                    {isFilterShow.sizeFilter ? (
                        <div className="size-filter">
                            <div className="size-values">
                                <ul>
                                    <Checkboxes checkboxValues={sizes} handleFilters={(filters) => handleFilters(filters, "size")} />
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div
                        className="list-header"
                        onClick={() =>
                            setIsFilterShow((prev) => ({
                                ...isFilterShow,
                                colorFilter: !prev.colorFilter,
                            }))
                        }
                    >
                        <img src={isFilterShow.colorFilter ? arrow2 : arrow} alt="icon"></img> <h1>Цвет: </h1>
                    </div>
                    {isFilterShow.colorFilter ? (
                        <div className="color-filter">
                            <div className="color-values">
                                <ul>
                                    <Checkboxes checkboxValues={colors} handleFilters={(filters) => handleFilters(filters, "color")} />
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div
                        className="list-header"
                        onClick={() =>
                            setIsFilterShow((prev) => ({
                                ...isFilterShow,
                                materialFilter: !prev.materialFilter,
                            }))
                        }
                    >
                        <img src={isFilterShow.materialFilter ? arrow2 : arrow} alt="icon"></img> <h1>Материал: </h1>
                    </div>
                    {isFilterShow.materialFilter ? (
                        <div className="material-filter">
                            <div className="material-values">
                                <ul>
                                    <Checkboxes checkboxValues={materials} handleFilters={(filters) => handleFilters(filters, "material")} />
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div
                        className="list-header"
                        onClick={() =>
                            setIsFilterShow((prev) => ({
                                ...isFilterShow,
                                sectionFilter: !prev.sectionFilter,
                            }))
                        }
                    >
                        <img src={isFilterShow.sectionFilter ? arrow2 : arrow} alt="icon"></img> <h1>Категории: </h1>
                    </div>
                    {isFilterShow.sectionFilter ? (
                        <div className="section-filter">
                            <div className="section-values">
                                <ul>
                                    <Checkboxes checkboxValues={sections} handleFilters={(filters) => handleFilters(filters, "section")} />
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    <div className="filter-info">
                        <div>
                            <h1>Фильтры:</h1>
                        </div>
                        <div>
                            <FiltersInfo filters={dataFilters} />
                        </div>
                        <div className="sort-info">
                            <div>
                                Сортировать по:
                                <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                                    <img src={arrowSmall} alt="icon"></img>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem value="alphabet" onClick={(e) => addSort(e)}>
                                        По алфавиту
                                    </MenuItem>
                                    <MenuItem onClick={(e) => addSort(e)}>По возрастанию цены</MenuItem>
                                    <MenuItem onClick={(e) => addSort(e)}>По убыванию цены</MenuItem>
                                </Menu>
                            </div>
                            <div>
                                Отображать по {itemsPerPage}:
                                <Button id="basic-button" aria-controls={open2 ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open2 ? "true" : undefined} onClick={handleClick2}>
                                    <img src={arrowSmall} alt="icon"></img>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl2}
                                    open={open2}
                                    onClose={handleClose2}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem onClick={(e) => addItemsNumber(e)}>5</MenuItem>
                                    <MenuItem onClick={(e) => addItemsNumber(e)}>10</MenuItem>
                                    <MenuItem onClick={(e) => addItemsNumber(e)}>15</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <ItemsList filteredItems={currentItem} />
                    <div>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={filteredItems.length} paginate={paginate} />
                    </div>
                    <div className="action-banner">
                        <h1>Внимание!</h1>
                        Оптовые цены на сайте действуют при покупке от 3000 руб.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
