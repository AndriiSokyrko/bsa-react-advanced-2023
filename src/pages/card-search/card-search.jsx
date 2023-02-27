import React, {useState} from 'react';

const CardSearch = ({onSearch}) => {
    const [search, setSearch] = useState({title:'', duration:'', level:''})
    const handleSearchName = (e) => {
        const title = e.target.value;
        setSearch({...search,title});
        onSearch({...search,title});
    }
    const handleSearchDuration = (e) => {
        const duration = e.target.value;
        if(!duration.length) {
            setSearch({...search, duration: {}});
            onSearch({...search, duration: {}});
            return;
        }
        const splitDur = duration.split('_');
        if (splitDur.length<3) splitDur.push("30");
        setSearch({...search, duration:{from: splitDur[0], to: splitDur[2]}});
        onSearch({...search, duration:{from: splitDur[0], to: splitDur[2]}});
    }
    const handleSearchLevel = (e) => {
        const level = e.target.value;
        setSearch({...search, level});
        onSearch({...search,level})
    }

    return (
        <section className="trips-filter">
            <h2 className="visually-hidden">Trips filter</h2>
            <form className="trips-filter__form" autoComplete="off">
                <label className="trips-filter__search input">
                    <span className="visually-hidden">Search by name</span>
                    <input
                        data-test-id="filter-search"
                        name="search"
                        type="search"
                        placeholder="search by title"
                        onChange={handleSearchName}
                    />
                </label>
                <label className="select">
                    <span className="visually-hidden">Search by duration</span>
                    <select data-test-id="filter-duration" name="duration" onChange={handleSearchDuration}>
                        <option value="">duration</option>
                        <option value="0_x_5">&lt; 5 days</option>
                        <option value="5_x_10">&lt; 10 days</option>
                        <option value="10_x">&ge; 10 days</option>
                    </select>
                </label>
                <label className="select">
                    <span className="visually-hidden">Search by level</span>
                    <select data-test-id="filter-level" name="level" onChange={handleSearchLevel}>
                        <option value="">level</option>
                        <option value="easy">easy</option>
                        <option value="moderate">moderate</option>
                        <option value="difficult">difficult</option>
                    </select>
                </label>
            </form>
        </section>

    );
}

export default CardSearch;