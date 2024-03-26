/* eslint-disable react/prop-types */

const FilterForm = ({ filter, handleFilterChange }) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={handleFilterChange} />
        </div>
    );
};

export default FilterForm;
