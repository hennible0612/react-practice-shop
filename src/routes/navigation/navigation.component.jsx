import {Outlet, Link} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import './navigation.styles.scss'
import {UserContext} from "../../contexts/user.context";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    // console.log(currentUser)
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link'> SIGN OUT</span>
                        ): ( <Link className='nav-link' to='/auth'>
                            Sign In
                        </Link>)
                    }
                </div>
            </div>
            <Outlet/> {/* 자식들을 rendering 위치 */}

        </Fragment>
    );
};

export default Navigation