import { useState, useEffect } from 'react'

const Filters = ({filter, setFilter}) => {


    return (
        <div className="filters shadow container">
            <form>
                <div className="field">
                    <label>Expenses Filter</label>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value) }
                    >
                        <option value="">-- All Categories --</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="house">House</option>
                        <option value="miscellaneous">Miscellaneous</option>
                        <option value="leisure">Leisure</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filters
