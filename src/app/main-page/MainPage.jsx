import React, { useEffect, useState } from 'react'
import RCalendar from '../../components/calendar/RCalendar'
import { AllproductsDB } from '../../api/Info'
import ListProduct from '../../components/list-filter/ListProduct'
import './MainPage.scss'


const MainPage = () => {
    const [activeCalendar, setActiveCalendar] = useState(false)
    const [filterList, setFilterList] = useState([])
    const [productsList, setProductsList] = useState([])
    const [dateSelect, setDateSelect] = useState(new Date())

    useEffect(() => {
        setProductsList(AllproductsDB())
    }, [])
    useEffect(() => {
        if (productsList.length > 0) {
            setFilterList([...productsList])
        } else return
    }, [productsList]);

    const callbacks = {
        //Открытие/закрытие модалки
        changeActiveCalendar: () => {
            setActiveCalendar(!activeCalendar)
        },

        //Применить фильтрацию
        actionFilterdate: () => {
            if (dateSelect.length > 1) {
                //Фильтр диапазона даты
                let filterRangeList = productsList.filter(i => new Date(i.date) > new Date(dateSelect[0]) && new Date(i.date) < new Date(dateSelect[1]))
                //Сортирвока спсика по дате
                if (filterRangeList.length > 1) {
                    let sortList = filterRangeList.sort((a, b) => {
                        let dateA = new Date(a.date)
                        let dateB = new Date(b.date)
                        if (dateA >= dateB) {
                            return 1
                        }
                        if (dateA < dateB) {
                            return -1
                        }
                        return 0;
                    })
                    setFilterList([...sortList])
                } else setFilterList(filterRangeList)
            }
        },
        //сброс фильтров
        clearSelected: () => {
            setFilterList(productsList)
        }
    }
    /* console.log('dateSelect', dateSelect)
    console.log('filterList', filterList) */
    return (
        <div className='mainPage'>
            <div>
                <button className='mainPage__button' onClick={callbacks.changeActiveCalendar}>Календарь</button>
            </div>
            {activeCalendar ?
                <div>
                    <RCalendar
                        setDateSelect={setDateSelect}
                    />
                    <div className='mainPage__action'>
                        <button className='mainPage__button' onClick={callbacks.actionFilterdate}>Применить</button>
                        <button onClick={callbacks.clearSelected} className="mainPage__button">Сбросить</button>
                    </div>
                </div> : ''}
            <div className='mainPage__list'>
                <ListProduct filterList={filterList} />
            </div>
        </div>
    )
}

export default MainPage