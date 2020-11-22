import React from 'react';

import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'

import HTTPRequest from '../../helper/httpRequest';

class CardComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            currentInfo: {
                title: null,
                content: null
            },
            favorites: JSON.parse(localStorage.getItem("favorites")),
            isFavorited: false
        };

        this.infos = {
            user: "My name is",
            born: "I was born at",
            location: "My address is",
            cell: "My cellphone number",
            lock: "Lock"
        };
    };

    initUserInfo() {
        this.setState({
            isFavorited: false
        })
        HTTPRequest.get({
        }).then(response => {
            this.setState({
                user: response.data.results[0].user,
                currentInfo: Object.assign({}, this.state.currentInfo, {
                    title: this.infos.location,
                    content: response.data.results[0].user.location.street
                })
            })
        }).catch(error => {
            console.log(error)
        })
    };

    onFavoriteImageClick(user) {
        this.setState({
            user: user,
            currentInfo: Object.assign({}, this.state.currentInfo, {
                title: this.infos.location,
                content: user.location.street
            })
        })
    }

    getFavorites() {
        let favorites = localStorage.getItem("favorites");
        favorites = JSON.parse(favorites)
        this.setState({
            favorites: favorites
        })
    };

    setFavorite() {
        let favorites = this.state.favorites;
        let checkCurrent = favorites.filter(a => a.username === this.state.user.username)
        if(!checkCurrent.length) {
            favorites.unshift(this.state.user)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            this.setState({
                isFavorited: true
            })
            this.getFavorites()
        }
    };

    onFooterIconClick(icon) {
        switch (icon) {
            case this.infos.user:
                this.setState({
                    currentInfo: Object.assign({}, this.state.currentInfo, {
                        title: this.infos.user,
                        content: this.state.user.username
                    })
                })
                break
            case this.infos.born:
                this.setState({
                    currentInfo: Object.assign({}, this.state.currentInfo, {
                        title: this.infos.born,
                        content: "01/01/1990"
                    })
                })
                break
            case this.infos.location:
                this.setState({
                    currentInfo: Object.assign({}, this.state.currentInfo, {
                        title: this.infos.location,
                        content: this.state.user.location.street
                    })
                })
                break
            case this.infos.cell:
                this.setState({
                    currentInfo: Object.assign({}, this.state.currentInfo, {
                        title: this.infos.cell,
                        content: this.state.user.cell
                    })
                })
                break
            case this.infos.lock:
                this.setState({
                    currentInfo: Object.assign({}, this.state.currentInfo, {
                        title: this.infos.lock,
                        content: "Dummy text"
                    })
                })
                break
            default:
                return;
        }
    };

    onSlideChange() {
        let fav = document.querySelector("#Favorite");
        this.hideFavorite();
        this.getFavorites();
        setTimeout(() => {
            if(!fav.classList.contains("show")) {
                this.initUserInfo()
            }
        })
        
    };

    hideFavorite() {
        let fav = document.querySelector("#Favorite");
        fav.classList.remove("show")
    };

    swipe(e) {
        let width = window.screen.width;
        let translate = Math.abs(e.translate)

        let fav = document.querySelector("#Favorite");
        
        if(translate <= width) {
            fav.classList.add("show")
        } else {
            fav.classList.remove("show")
        }
        this.getFavorites()
    };

    componentDidMount() {
        this.initUserInfo();
        this.getFavorites();
    };

    render() {
        return (
            <>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onTouchMove={(event)=>this.swipe(event)}
                allowSlidePrev = {false}
                loop = {true}
                onSlideChange={() => this.onSlideChange()}
                onSwiper={(swiper) => {}}
                className="Swiper"
            >
                <div id="Favorite" className="">
                    <div className="Favorite__list">
                        {
                            this.state.favorites && this.state.favorites.map((user, index) => (
                                <div key={index} onClick={()=>this.onFavoriteImageClick(user)}>
                                    <img className="Favorite__img" src={user.picture}/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="Favorite__add">
                        <span>Add favorite</span>
                        <span className="Favorite__icon" onClick={()=>this.setFavorite()}>
                            <i className={`fas fa-heart ${this.state.isFavorited ? "text-danger" : ""}`}></i>
                        </span>
                    </div>
                    
                    
                <div className="overlay" onClick={()=>this.hideFavorite()}></div>
            </div>
                <SwiperSlide>
                    <Card className="Card">
                        <div className="Card__bg-top"></div>
                        {
                            this.state.user && (
                                <>
                                    <CardImg className="Card__img" src={this.state.user.picture} alt="Card image" />
                                    <CardBody className="Card__body">
                                        <CardSubtitle tag="h6" className="text-muted Card__subtitle">{this.state.currentInfo.title}</CardSubtitle>
                                        <CardTitle tag="h4" className="Card__title">{this.state.currentInfo.content}</CardTitle>
                                        <div className="Card__footer">
                                            <div className="Card__footer-items">
                                                <span className={`Card__footer-item ${this.state.currentInfo.title === this.infos.user ? "active" : ""}`} onClick={() => this.onFooterIconClick(this.infos.user)}>
                                                    <i className="fas fa-user"></i>
                                                </span>
                                                <span className={`Card__footer-item ${this.state.currentInfo.title === this.infos.born ? "active" : ""}`} onClick={() => this.onFooterIconClick(this.infos.born)}>
                                                    <i className="far fa-calendar-alt"></i>
                                                </span>
                                                <span className={`Card__footer-item ${this.state.currentInfo.title === this.infos.location ? "active" : ""}`} onClick={() => this.onFooterIconClick(this.infos.location)}>
                                                    <i className="fas fa-map-marked-alt"></i>
                                                </span>
                                                <span className={`Card__footer-item ${this.state.currentInfo.title === this.infos.cell ? "active" : ""}`} onClick={() => this.onFooterIconClick(this.infos.cell)}>
                                                    <i className="fas fa-phone-alt"></i>
                                                </span>
                                                <span className={`Card__footer-item ${this.state.currentInfo.title === this.infos.lock ? "active" : ""}`} onClick={() => this.onFooterIconClick(this.infos.lock)}>
                                                    <i className="fas fa-lock"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </>
                            )
                        }
                    </Card>
                </SwiperSlide>
            </Swiper>
            </>
            
        )
    }

}

export default CardComponent;
