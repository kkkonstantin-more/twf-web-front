import React, {Component} from "react";
import translate from "../../translations/translate";
import "./sample-user-page.scss";
import {GiSevenPointedStar} from "react-icons/gi";
import {FcRating} from "react-icons/fc";
import {Link} from "react-router-dom";
// @ts-ignore
import EditButton from "react-edit-button";
import {containerCSS} from "react-select/src/components/containers";

interface SampleUserPageProps {
}

const userShowLogin = "___peppa___";

class EditLoginButton extends Component {
    state = {text: userShowLogin}
    onAccept = (text: string) => {
        this.setState({text: text})
    }

    render() {
        const EditButtonProps = {
            editButtonProps: {
                text: ' '
            },
            onAccept: this.onAccept
        }
        return (
            <div>
                <EditButton {...EditButtonProps}>
                    <span>{this.state.text}</span>
                </EditButton>
            </div>
        )
    }
}

const userShowName = "Peppa Pig";

class EditNameButton extends Component {
    state = {text: userShowName}
    onAccept = (text: string) => {
        this.setState({text: text})
    }

    render() {
        const EditButtonProps = {
            editButtonProps: {
                text: ' '
            },
            onAccept: this.onAccept
        }
        return (
            <div>
                <EditButton {...EditButtonProps}>
                    <span>{this.state.text}</span>
                </EditButton>
            </div>
        )
    }
}

const SampleUserPage: React.FC<SampleUserPageProps> = () => {
    const translationPrefix: string = "sampleUserPage";
    const rating: string = translationPrefix + ".rating";
    const xp: string = translationPrefix + ".xp";
    const userShowPhoto = "https://avatarfiles.alphacoders.com/115/115920.png";
    const userShowRank = "https://cdn.drawception.com/images/panels/2017/4-5/x76Qd5RwcG-8.png";
    const userShowRating = "9397";
    const userShowXp = "217325";
    const userProgressProc = 72;
    const userXPNumerator = 720;
    const userXPDenominator = 1000;
    const inProgress =
        <li className="user-stats__achievements__sections__blocks__in-progress__item">
            <ul className="user-stats__achievements__sections__blocks__in-progress__item__achievement">
                <li>
                    <img
                        className="user-stats__achievements__sections__blocks__in-progress__item__achievement__image"
                        src={userShowPhoto}/>
                </li>
                <li className="user-stats__achievements__sections__blocks__in-progress__item__achievement__arrow"
                    style={{background: `linear-gradient(135deg, #28a745 ${userProgressProc}%, #cfd8dc ${userProgressProc}%)`}}/>
            </ul>
        </li>
    const done =
        <li className="user-stats__achievements__sections__blocks__done__item">
            <img className="user-stats__achievements__sections__blocks__done__item__image"
                 src={userShowPhoto}/>
        </li>


    return (
        <div className="sample-user-page u-container">
            <div className="user-info">
                <ul className="user-info__block">
                    <li>
                        <img className="user-info__block__photo" src={userShowPhoto}/>
                    </li>
                    <li>
                        <div className="user-info__block__login">
                            <EditLoginButton/>
                        </div>
                    </li>
                    <li>
                        <div className="user-info__block__name">
                            <EditNameButton/>
                        </div>
                    </li>
                </ul>
                <div className="user-info__progress">
                    <div className="user-info__progress__arrow-progress-bar"
                         style={{background: `linear-gradient(135deg, #28a745 ${userProgressProc}%, #cfd8dc ${userProgressProc}%)`}}>
                        {userXPNumerator} / {userXPDenominator} XP
                    </div>
                    <div className="user-info__progress__rank">
                        <img className="user-info__progress__rank__image" src={userShowRank}>
                        </img>
                        <div className="user-info__progress__rank__number-container">
                        </div>
                    </div>
                    <ul className="user-info__progress__rating-and-xp">
                        <li>
                            <div className="user-info__progress__rating-and-xp__rating">
                                <nav>
                                    <FcRating className="user-info__progress__rating-and-xp__rating-icon"/> <Link
                                    to="/matify-players"
                                    className="user-info__progress__rating-and-xp__link-to-rating">
                                    {translate(rating)}:
                                </Link> {userShowRating}
                                </nav>
                            </div>
                        </li>
                        <li>
                            <div className="user-info__progress__rating-and-xp__xp">
                                <GiSevenPointedStar
                                    className="user-info__progress__rating-and-xp__xp-icon"/> {translate(xp)}: {userShowXp}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <ul className="user-stats">
                <li className="user-stats__achievements">
                    <ul className="user-stats__achievements__sections">
                        <li>
                            <h1 className="user-stats__achievements__sections__label">
                                Достижения
                            </h1>
                        </li>
                        <li>
                            <ul className="user-stats__achievements__sections__blocks">
                                <li>
                                    {/* очень много копипасты :|, поправлю*/}
                                    <ul className="user-stats__achievements__sections__blocks__in-progress">
                                        {inProgress}
                                        {inProgress}
                                        {inProgress}
                                        {inProgress}
                                        {inProgress}
                                        {inProgress}
                                        {inProgress}
                                        {inProgress}
                                        {inProgress}
                                        {inProgress}
                                    </ul>
                                </li>
                                <li>
                                    <ul className="user-stats__achievements__sections__blocks__done">
                                        {done}
                                        {done}
                                        {done}
                                        {done}
                                        {done}
                                        {done}
                                        {done}
                                        {done}
                                        {done}
                                        {done}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="user-stats__rating">
                    <ul className="user-stats__rating__sections">
                        <li>
                            <h1 className="user-stats__rating__sections__label">
                                Рейтинг
                            </h1>
                        </li>
                        <li className="user-stats__rating__sections__table">
                            <div className="user-stats__rating__sections__table__tab" style={{backgroundColor: "gold"}}>
                                <div className="user-stats__rating__sections__table__tab__place">
                                    1
                                </div>
                                <div className="user-stats__rating__sections__table__tab__login">
                                    Master_Flomaster
                                </div>
                                <div className="user-stats__rating__sections__table__tab__rating">
                                    123123
                                </div>
                                <img className="user-stats__rating__sections__table__tab__rank" style={{borderColor: "blueviolet"}} src={userShowRank}/>
                            </div>
                            <div className="user-stats__rating__sections__table__tab">
                                <div className="user-stats__rating__sections__table__tab__place">
                                    141
                                </div>
                                <div className="user-stats__rating__sections__table__tab__login">
                                    M1cky M0use
                                </div>
                                <div className="user-stats__rating__sections__table__tab__rating">
                                    10000
                                </div>
                                <img className="user-stats__rating__sections__table__tab__rank" style={{borderColor: "gold"}} src={userShowRank}/>
                            </div>
                            <div className="user-stats__rating__sections__table__tab">
                                <div className="user-stats__rating__sections__table__tab__place">
                                    142
                                </div>
                                <div className="user-stats__rating__sections__table__tab__login">
                                    zxc
                                </div>
                                <div className="user-stats__rating__sections__table__tab__rating">
                                    9876
                                </div>
                                <img className="user-stats__rating__sections__table__tab__rank" src={userShowRank}/>
                            </div>
                            <div className="user-stats__rating__sections__table__tab" style={{backgroundColor: "lightgreen"}}>
                                <div className="user-stats__rating__sections__table__tab__place">
                                    143
                                </div>
                                <div className="user-stats__rating__sections__table__tab__login">
                                    ___peppa___
                                </div>
                                <div className="user-stats__rating__sections__table__tab__rating">
                                    9397
                                </div>
                                <img className="user-stats__rating__sections__table__tab__rank" src={userShowRank}/>
                            </div>

                            <div className="user-stats__rating__sections__table__tab">
                                <div className="user-stats__rating__sections__table__tab__place">
                                    144
                                </div>
                                <div className="user-stats__rating__sections__table__tab__login">
                                    BamBy
                                </div>
                                <div className="user-stats__rating__sections__table__tab__rating">
                                    8901
                                </div>
                                <img className="user-stats__rating__sections__table__tab__rank" src={userShowRank}/>
                            </div>
                            <div className="user-stats__rating__sections__table__tab">
                                <div className="user-stats__rating__sections__table__tab__place">
                                    145
                                </div>
                                <div className="user-stats__rating__sections__table__tab__login">
                                    Donald Duck (0^0)
                                </div>
                                <div className="user-stats__rating__sections__table__tab__rating">
                                    7000
                                </div>
                                <img className="user-stats__rating__sections__table__tab__rank" src={userShowRank}/>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SampleUserPage;
