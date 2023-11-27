import PropTypes from 'prop-types';

const AdminMenuCard = ({menu_name}) => {
    return(
        <div
        className="card mb-3 cursor-pointer"
        >
            <div className="card-body py-2 d-flex align-items-center">
                <div className="flex-grow-1">{menu_name}</div>
            </div>
        </div>
    );
};

AdminMenuCard.propTypes = {
    menu_name: PropTypes.string.isRequired,
};

export default AdminMenuCard;