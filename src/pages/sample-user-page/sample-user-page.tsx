import React, {Component} from "react";
import translate from "../../translations/translate";
import "./sample-user-page.scss";
import {GiSevenPointedStar} from "react-icons/gi";
import {FcRating} from "react-icons/fc";
import {Link} from "react-router-dom";
// @ts-ignore
import EditButton from "react-edit-button";
import {containerCSS} from "react-select/src/components/containers";

interface SampleUserPageProps {}

const userShowLogin = "___peppa___";
class EditLoginButton extends Component {
    state = {text: userShowLogin}
    onAccept = (text: string) => {
        this.setState({text: text})
    }
    render () {
        const EditButtonProps = {
            editButtonProps: {
                text: ' '
            },
            onAccept: this.onAccept
        }
        return (
            <div>
                <EditButton { ...EditButtonProps }>
                    <span>{ this.state.text }</span>
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
    render () {
        const EditButtonProps = {
            editButtonProps: {
                text: ' '
            },
            onAccept: this.onAccept
        }
        return (
            <div>
                <EditButton { ...EditButtonProps }>
                    <span>{ this.state.text }</span>
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

    return (
        <div className="sample-user-page u-container">
            <div className="sample-user-page-left-side">
            <ul className="user-info">
                <li>
                    <img className="user-photo" src={userShowPhoto}>
                    </img>
                </li>
                <li>
                    <h1 className="user-login">
                        <EditLoginButton />
                    </h1>
                </li>
                <li>
                    <h1 className="user-name">
                        <EditNameButton />
                    </h1>
                </li>
            </ul>
            </div>
            <div className="user-main-container-1">
                <ul className="user-rating-and-xp">
                    <li>
                        <h1 className="user-rating">
                            <nav>
                                <FcRating className="user-rating-icon"/> <Link to="/matify-players" className="link-to-rating">
                                    {translate(rating)}:
                                </Link> {userShowRating}
                            </nav>
                        </h1>
                    </li>
                    <li>
                        <h1 className="user-xp">
                            <GiSevenPointedStar className="user-xp-icon"/> {translate(xp)}: {userShowXp}
                        </h1>
                    </li>
                </ul>
                <div className="arrow-progress-bar" style={{background: `linear-gradient(135deg, #28a745 ${userProgressProc}%, #cfd8dc ${userProgressProc}%)`}}>
                    {userXPNumerator} / {userXPDenominator} XP
                </div>
                <div className="user-rank">
                    <img className="user-rank-image" src={userShowRank}>
                    </img>
                    <div className="user-rank-number-container">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SampleUserPage;
