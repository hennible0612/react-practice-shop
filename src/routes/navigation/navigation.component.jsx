import {Outlet, Link} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import './navigation.styles.scss'
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);

    // const signOutHandler = async () => {
    //     await signOutUser(); //undefind return
    //     // setCurrentUser(null); // user를 null로 초기화
    // };


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
                            <span className='nav-link' onClick={signOutUser}> SIGN OUT</span>
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