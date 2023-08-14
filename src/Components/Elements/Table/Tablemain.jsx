import React, { useState, useEffect, useMemo } from "react";
import Spinner from '../../Image/spinner.png';
import Str from '../../Image/str.png';
function Tablemain() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(3);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortedColumn, setSortedColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    let paginationWindowSize = 5;

    if (paginationWindowSize < 5) {
        paginationWindowSize = Math.max(paginationWindowSize, 1);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "https://64d4ac17b592423e46947829.mockapi.io/dis"
            );
            const jsonData = await response.json();
            setData(jsonData);
            setLoading(false);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const filteredData = data.filter((item) =>
            item.brend.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredData);
        setCurrentPage(1);
    }, [searchTerm, data]);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        if (
            pageNumber >= 1 &&
            pageNumber <= Math.ceil(filteredData.length / itemsPerPage)
        ) {
            setCurrentPage(pageNumber);
        }
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSort = (column) => {
        if (column === sortedColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortedColumn(column);
            setSortDirection("asc");
        }
    };

    const sortedData = useMemo(() => {
        let sortedArray = filteredData;
        if (sortedColumn === "brend") {
            sortedArray = sortedArray.sort((a, b) => {
                if (sortDirection === "asc") {
                    return a.brend.localeCompare(b.brend);
                } else {
                    return b.brend.localeCompare(a.brend);
                }
            });
        }
        if (sortedColumn === "year") {
            sortedArray = sortedArray.sort((a, b) => {
                if (sortDirection === "asc") {
                    return a.year - b.year;
                } else {
                    return b.year - a.year;
                }
            });
        }
        if (sortedColumn === "price") {
            sortedArray = sortedArray.sort((a, b) => {
                if (sortDirection === "asc") {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        }

        return sortedArray;
    }, [sortedColumn, sortDirection, filteredData]);
    const sortedData2 = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    console.log(sortedData2)
    const generatePaginationButtons = () => {
        let paginationButtons = [];
        let startPage = currentPage - Math.floor(paginationWindowSize / 2);
        let endPage = currentPage + Math.floor(paginationWindowSize / 2);

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(paginationWindowSize, totalPages);
        }

        if (endPage > totalPages) {
            startPage = Math.max(totalPages - paginationWindowSize + 1, 1);
            endPage = totalPages;
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? "active" : ""}
                    style={{
                        width: "25px",
                        height: "25px",
                        backgroundColor: i === currentPage ? "#058074b2" : "white",
                        borderRadius: "15px",
                        color: i === currentPage ? "white" : "black",
                    }
                    }
                >
                    {i}
                </button >
            );
        }

        return paginationButtons;
    };
    const handlePerPage = (size) => {
        if (size >= 1 && size <= 3) {
            setitemsPerPage(size);
        }
    };
    return (
        <> {loading ? (
            <div className="header-container__block-spinner"><img className="header-container__spinner" src={Spinner} alt="Spinner" /></div>
        ) : (
            <div className="header-container__table">
                <div className="header-container__table-top">
                    <div className="header-container__search">
                        <label>Показывать автомобилей по</label>
                        <input className="header-container__input-num"
                            type="number"
                            value={itemsPerPage}
                            onChange={(e) => handlePerPage(Number(e.target.value))}
                        />
                    </div>
                    <div className="header-container__search">
                        <span className="registration-form__span">Поиск:</span>
                        <input className="header-container__input"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Введите бренд автомобиля"
                        />
                    </div>
                </div>
                <table className="header-table">
                    <thead>
                        <tr className="header-table__header">
                            <th className="header-table__data">Фото</th>
                            <th className="header-table__data" onClick={() => handleSort("brend")}>
                                <img className="header-table__img-str" src={Str} alt="Str" /> Бренд
                            </th>
                            <th className="header-table__data" id="table-none">Модель</th>
                            <th className="header-table__data" id="table-none" onClick={() => handleSort("year")}>
                                <img className="header-table__img-str" src={Str} alt="Str" /> Год выпуска
                            </th>
                            <th className="header-table__data" id="table-none">Класс</th>
                            <th className="header-table__data" id="table-none">Цвет</th>
                            <th className="header-table__data" id="table-none2" onClick={() => handleSort("price")}>
                                <img className="header-table__img-str" src={Str} alt="Str" /> Цена
                            </th>
                        </tr>
                    </thead>
                    <tbody className="header-table__body">
                        {currentItems.length === 0 ? (
                            <tr className="header-table__row">
                                <td className="header-table__rowblok" colSpan="1">Элементы не найдены</td>
                            </tr>
                        ) : (
                            currentItems.map((item) => (
                                <tr className="header-table__row" key={item.id}>
                                    <td className="header-table__rowblok"><img className="header-table__img" src={item.avatar} alt="foto" /></td>
                                    <td className="header-table__rowblok">{item.brend}</td>
                                    <td className="header-table__rowblok" id="table-none">{item.model}</td>
                                    <td className="header-table__rowblok" id="table-none">{parseInt(item.year)}</td>
                                    <td className="header-table__rowblok" id="table-none">{item.class}</td>
                                    <td className="header-table__rowblok" id="table-none">{item.color}</td>
                                    <td className="header-table__rowblok" id="table-none2">{parseFloat(item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="header-container__table-bottom">
                    {currentItems.length > 0 && (<>
                        <div className="header-container__table-elements">Атомобили с {indexOfFirstItem + 1} по {Math.min(indexOfLastItem, filteredData.length)} из {filteredData.length}</div>
                        <div className="header-container__block-btn">
                            <button className="header-container__btn"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                {"<"}
                            </button>
                            {generatePaginationButtons()}
                            <button className="header-container__btn"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                {">"}
                            </button>

                        </div>
                    </>)}
                </div>
            </div>)}
        </>)
};

export default Tablemain;