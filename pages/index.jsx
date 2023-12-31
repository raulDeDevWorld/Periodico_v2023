import Head from 'next/head'
import Image from 'next/image'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'

import Link from 'next/link'
import FormAdds from '../components/FormAdds'
import Layout from '../layout/Layout'

import BannerLeft from '../components/BannerLeft'
import BannerRight from '../components/BannerRight'
import BannerPortada from '../components/BannerPortada'

import Success from '../components/Success'
import Error from '../components/Error'

import Section from '../components/Section'
import Date from '../components/Date'
import Header from '../components/Header'

import styles from '../styles/Home.module.css'
import { handleSignOut } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { listAll } from 'firebase/storage'


const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_API_KEY = "AIzaSyBZkk7x_tGRbf-Yg_A7Y9QYcBQe7T9QtWU"

var fetch_url = `${YOUTUBE_PLAYLIST_ITEMS_API}`


function Home() {
  const { userDB, setUserData, monthAndYear, setUserSuccess, success, postsIMG, showImg, showVideo, date, setUserDate } = useUser()
  const router = useRouter()

  const [listYT, setListYT] = useState(false);


  const [zoomIMG, setZoomIMG] = useState(undefined)
  const [modalsInterval, setModalsInterval] = useState(false)
  const [counterModals, setCounterModals] = useState(0)

  async function getYB() {
    const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=8&playlistId=UULFXFA6pzESb1NQMsepmhC6Vw&key=${YOUTUBE_API_KEY}`)
    const data = await res.json();
    setListYT(data)
  }

  function redirectYT() {
    window.open('https://www.youtube.com/@periodicohoybolivia2201/videos', '_blank')
  }

  useEffect(() => {
    getYB()
  }, [])
  console.log(date)





  function handlerZoom(i) {
    setZoomIMG(i.url)
  }

  function closeZoom() {
    console.log(userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length === counterModals + 1)
    // userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length < counterModals + 1
    //     ? setCounterModals(0)
    //     : setCounterModals(counterModals + 1)
    setZoomIMG(undefined)
    userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(15000)
  }

  const setUserModalsInterval = (time) => {
    console.log('interval')
    const interval = setTimeout(() => {
      Object.values(userDB['Inicio']['Modals'])[counterModals + 1] && setZoomIMG(Object.values(userDB['Inicio']['Modals'])[getRandomInt(userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length)])
    }, time)

    return () => {
      clearTimeout(interval)
    }
  }
  console.log(userDB && userDB['Inicio'] && userDB['Inicio']['Modals'])
  console.log('Inicio')

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }







  useEffect(() => {
    userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(3000)
  }, [userDB]);











  return (
    <Layout>
      <div className={styles.main}>
        <Header></Header>

        {/* {showImg &&

          <div className='columns-3 gap-2 pb-3'>

            {userDB && userDB.Inicio && Object.keys(userDB.Inicio.Posts).map((i, index) => {

              return <div className='relative' key={index}>
                <Link href='#' legacyBehavior>
                  <a target='_blank'>
                    <img className='block w-full mb-2' src={userDB.Inicio.Posts[i].url} alt="img" />
                    <span className={styles.description}>{userDB.Inicio.Posts[i].description}</span>
                  </a>
                </Link >
              </div>
            })}
          </div>} */}



        {showImg &&

          <div className={styles.gridImages}>

            {userDB && userDB.Inicio && Object.keys(userDB.Inicio.Posts).map((i, index) => {

              return <div className={styles.image} key={index}>
                <Link href='#' legacyBehavior>
                  <a target='_blank'>
                    <img className={styles.image} src={userDB.Inicio.Posts[i].url} alt="img" />
                    <span className={styles.description}>{userDB.Inicio.Posts[i].description}</span>
                  </a>
                </Link >
              </div>
            })}
          </div>}

        {showVideo && listYT !== false &&

          <div className={styles.gridVideos}>


            {listYT.items.map(({ id, snippet = {} }) => {
              const { title, thumbnails = {}, resourceId = {} } = snippet;
              const { medium } = thumbnails;
              return (
                <div key={id} className={styles.boxVideo}>

                  <iframe
                    className={styles.video}
                    // width={medium.width}
                    // height={medium.heigth}
                    src={`https://www.youtube.com/embed/${resourceId.videoId}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>

                  {/* <p className={styles.videoDescription}>{title}</p> */}

                </div>
              )
            })}
            <div className={styles.boxVideo} onClick={redirectYT}>
              <img className={styles.seeMoreYT}
                src="/seeMoreYT.jpeg"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen />
              {/* <p className={styles.videoDescription}>Las noticias mas relevantes en <br /> HOY.BO</p> */}
            </div>

          </div>}

        {showImg == false && showVideo == false && <>
          <Section topic="Inicio" publicView={true} color=''></Section>
          <Section topic="Sociedad" publicView={true} color=''></Section>
          <Section topic="Salud" publicView={true} color=''></Section>
          <Section topic="Seguridad" publicView={true} color=''></Section>
          <Section topic="Politica" publicView={true} color=''></Section>
          <Section topic="Economia" publicView={true} color=''></Section>
          <Section topic="Deportes" publicView={true} color=''></Section>
          <Section topic="GestionDeGobierno" publicView={true} color=''></Section>
          <Section topic="Cultura" publicView={true} color=''></Section>
          <Section topic="Internacional" publicView={true} color=''></Section>
          <Section topic="Empresarial" publicView={true} color=''></Section>
        </>}
      </div>





      {zoomIMG !== undefined && <div className='fixed flex justify-center items-center top-0 left-0 h-[100vh] w-[100vw] bg-[#000000c7] z-[1000000000]' onClick={closeZoom}>
        <div className='inline-block relative'>
          <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-[#000000c7] hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center z-50" onClick={closeZoom}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <img src={zoomIMG.url} className={`landscape:h-[80vh] portrait:w-[70vw] rounded-[20px]`} onClick={handlerZoom} alt="" />
       {zoomIMG.whatsapp !== undefined && <Link href={`https://api.whatsapp.com/send?phone=${zoomIMG.whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
            <a target="_blank"><span><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></span></a>
          </Link>}
          {/* {<Link href={`https://api.whatsapp.com/send?phone=${zoomIMG.whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
            <a target="_blank"><img className='block h-[50px] w-[50px]' src={zoomIMG.url} /></a>
          </Link>} */}

        </div>
      </div>}
    </Layout>
  )
}

export default WithoutAuth(Home)







// function handlerClickEnlace(data) {
//   router.pathname != "/Admin" && window.open(data.href, data.target)
//   router.pathname == "/Admin" && setDataEditor(i)
//   // console.log(data.href, data.target)

// }



// function whatsappClickHandler() {
//   router.push("https://api.whatsapp.com/send?phone=+59160589090&text=Buenas%20Hoy...")
// }

// function handlerPDFView(parametro) {
//   parametro && setPeriodicoPDFEffect(true)
//   setPeriodicoPDF(!periodicoPDF)
// }


