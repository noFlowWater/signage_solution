import PropTypes from 'prop-types';

const AdminMenuCard = ({menu_name, onClick, children}) => {
    return(
        <div
        className="card mb-3 cursor-pointer"
        onClick={onClick}
        >
            <div className="card-body py-2 d-flex align-items-center">
                <div className="flex-grow-1">{menu_name}</div>
                {children && <div>{children}</div>}
            </div>
        </div>
    );
};

AdminMenuCard.propTypes = {
    menu_name: PropTypes.string.isRequired,
    children: PropTypes.element,
    onClick : PropTypes.func,
};

AdminMenuCard.defaultProps = {
    children : null,
    onClick : () => {},
}

export default AdminMenuCard;