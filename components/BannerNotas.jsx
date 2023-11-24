import { useUser } from '../context/Context.js'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import styles from '../styles/Banner.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'


export default function Banner({ routeDB, items, click, admin }) {

    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear } = useUser()
    // console.log(userDB[ruta])
    const router = useRouter()

    const buttonStyle = {
        width: "30px",
        background: 'none',
        border: '0px'
    };

    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}></button>,
        nextArrow: <button style={{ ...buttonStyle }}></button>
    }
    function redirect(rute) {
        console.log('redirect')
        rute !== '#' && window.open(rute, '_blank')
    }
  

    return (
        <>
            {
                items.map((item,) =>
                userDB && userDB[`${routeDB}`] && userDB[`${routeDB}`] !== undefined && userDB[`${routeDB}`][`BannerNotas${item}`] && <div className={`${styles.containerFadeRight} ${styles.containerFadeNota}`} >

                        {
                            Object.keys(userDB[`${routeDB}`][`BannerNotas${item}`]).length == 1 ?
                                Object.keys(userDB[`${routeDB}`][`BannerNotas${item}`]).map((i, index) =>
                                    <div className="each-slide" key={index} >
                                        <div className={styles.containerIframe}>
                                            {
                                                admin ?
                                                    <span onClick={() => click({ routeDB, item, i })}>

                                                        {
                                                        
                                                        userDB[`${routeDB}`][`BannerNotas${item}`][i].url
                                                            ?
                                                            <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].url} />
                                                            :
                                                            <iframe
                                                                className={styles.responsiveIframe}
                                                                src={userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace}
                                                                title="YouTube video player"
                                                                frameborder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                allowfullscreen></iframe>
                                                        }

                                                    </span>
                                                    : <span onClick={() => redirect(userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace ? userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace : '#')}>

                                                        {userDB[`${routeDB}`][`BannerNotas${item}`][i].url
                                                            ?
                                                            <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].url} />
                                                            :
                                                            <iframe
                                                                className={styles.responsiveIframe}
                                                                src={userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace}
                                                                title="YouTube video player"
                                                                frameborder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                allowfullscreen></iframe>
                                                        }

                                                    </span>
                                            }
                                        </div>
                                    </div>
                                )
                                :
                                <Fade transitionDuration={8000} duration={10} scale={1}{...properties} indicators={true} easing='cubic'>
                                    {
                                        Object.keys(userDB[`${routeDB}`][`BannerNotas${item}`]).map((i, index) =>
                                            <div className="each-slide" key={index} >
                                                <div>
                                                    {
                                                        !admin ?
                                                            <span onClick={() => click({ routeDB, item, i })}>
                                                                <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].url} />
                                                                </span>
                                                            : <span onClick={() => redirect(userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace ? userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace : '#')}>
                                                                <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].url} />
                                                                </span>
                                                    }
                                                </div>
                                            </div>
                                        )}
                                </Fade>
                        }
                    </div>
                )
            }
        </>
    )
}
