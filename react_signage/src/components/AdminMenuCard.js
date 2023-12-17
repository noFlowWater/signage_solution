import PropTypes from 'prop-types';

const AdminMenuCard = ({menu_name, onClick, children}) => {
    return(
            <div 
                className="card square-card cursor-pointer d-flex justify-content-center ms-3 me-3 mb-3"
                onClick={onClick}
            >
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <div
                    style = {{fontFamily: 'SansM', fontSize:'20px'}}
                    >{menu_name}</div>
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