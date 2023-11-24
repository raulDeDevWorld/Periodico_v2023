import Head from 'next/head'
import Image from 'next/image'
import NavbarSimple from '../components/NavbarSimple'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import TemplateNota from '../components/TemplateNota'
import Layout from '../layout/Layout'
import TextEditor from '../components/TextEditor'
import { handleSignOut, writeUserData, getSpecificData } from '../firebase/utils'
import { getIndexStorage } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import Banner from '../components/Banner'
import BannerNotas from '../components/BannerNotas'
import Modal from '../components/Modal'


// import Form from './Form'

import styles from '../styles/Temporal.module.css'

import 'react-quill/dist/quill.core.css';



import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('../components/content'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})





function TemplateOne() {
  const [textArea, setTextArea] = useState("");
  const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, specificData, setUserSpecificData } = useUser()
  const [arr, setArr] = useState([0])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [copyrightIMG, setCopyrightIMG] = useState('')

  const [textEditor, setTextEditor] = useState("")

  const [formViewer, setFormViewer] = useState(true)
  const [dataEditor, setDataEditor] = useState(null)
  const [isChecked, setIsChecked] = useState(true)

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

  const [zoomIMG, setZoomIMG] = useState('')
  const [modalsInterval, setModalsInterval] = useState(false)
  const [counterModals, setCounterModals] = useState(0)

  const router = useRouter()

  function handlerOnChange(e) {
    const name = e.target.name
    const value = e.target.value

    name == 'title' ? setTitle(value) : ''
    name == 'description' ? setDescription(value) : ''
    name == 'copyrightIMG' ? setCopyrightIMG(value) : ''






  }
  function handlerTextEditorOnChange(content, delta, source, editor) {
    console.log(editor.getContents())
    setTextEditor(editor.getHTML())
  }




  function validate() {

    switch (router.query.temporal.slice(0, 2)) {
      case '11':
        return "Inicio"
        break;
      case '12':
        return "Sociedad"
        break;
      case '13':
        return "Salud"
        break;
      case '14':
        return "Seguridad"
        break;
      case '15':
        return "Politica"
        break;
      case '16':
        return "Economia"
        break;
      case '17':
        return "Deportes"
        break;
      case '18':
        return "GestionDeGobierno"
        break;
      case '19':
        return "Cultura"
        break;
      case '20':
        return "Internacional"
        break;
      case '21':
        return "Deportes"
        break;
      case '22':
        return "Empresarial"
        break;
      default:
        return 'anything'
    }
  }


  function save(e, st) {

    const ruteDB = `${validate()}/Posts/PostImage_${router.query.temporal.slice(2)}`
    const objectDB = {
      title: title ? title : '',
      description: description ? description : '',
      copyrightIMG: copyrightIMG ? copyrightIMG : '',
      state: st == 'B' ? 'Borrador' : 'Publicado',
      redactor: user.uid
    }
    const rutePost = `/Posts/PostImage_${router.query.temporal}`
    const objectPost = {
      nota: textEditor,
    }
    writeUserData(ruteDB, objectDB, setUserSuccess, 'save')
    isChecked && writeUserData(`Inicio/Posts/PostImage_${router.query.temporal.slice(2)}`, objectDB, setUserSuccess, 'save')
    writeUserData(rutePost, objectPost, setUserSuccess, 'save')

    return setUserSpecificData({
      ...specificData, [`PostImage_${router.query.temporal}`]: objectPost,
    })

  }


  function formViewerHandler() {
    setFormViewer(!formViewer)
  }

  function handlerClickEnlace(data) {
    setDataEditor(data)
  }

  function handlerChecked() {
    setIsChecked(!isChecked)
  }


  useEffect(() => {
    specificData && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota
      ? console.log('nota existente')
      : getSpecificData(`/Posts/PostImage_${router.query.temporal}`, specificData, setUserSpecificData)

     userDB && userDB[validate()] && setTitle(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].title)
     userDB && userDB[validate()] && setDescription(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].description)
     userDB && userDB[validate()] && setCopyrightIMG(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].copyrightIMG)

    specificData && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota
      ? setTextEditor(specificData[`PostImage_${router.query.temporal}`].nota)
      : setTextEditor('En redacción ')
  }, [userDB, specificData, router.query.temporal,]);















  function handlerZoom(i) {
    setZoomIMG(i.url)
}

  function closeZoom() {
    console.log(userDB[validate()]['Modals'] && Object.values(userDB[validate()]['Modals']).length === counterModals + 1)
    // userDB[validate()]['Modals'] && Object.values(userDB[validate()]['Modals']).length < counterModals + 1
    //     ? setCounterModals(0)
    //     : setCounterModals(counterModals + 1)
    setZoomIMG('')
    userDB && userDB[validate()] && userDB[validate()]['Modals'] && Object.values(userDB[validate()]['Modals']).length > 0 && setUserModalsInterval(5000)
}

  const setUserModalsInterval = (time) => {
    console.log('interval')
    const interval = setTimeout(() => {
        Object.values(userDB[validate()]['Modals'])[counterModals + 1] && setZoomIMG(Object.values(userDB[validate()]['Modals'])[getRandomInt(userDB[validate()]['Modals'] && Object.values(userDB[validate()]['Modals']).length)].url)
    }, time)

    return () => {
        clearTimeout(interval)
    }
}
console.log(validate())
console.log(userDB)


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  useEffect(() => {
    userDB && userDB[validate()] && userDB[validate()]['Modals'] && Object.values(userDB[validate()]['Modals']).length > 0 && setUserModalsInterval(5000)
}, [userDB]);

  return (

    <Layout>

      {specificData && router.query.temporal !== undefined && <main className={styles.main}>
        <div>
          <NavbarSimple footer={false}></NavbarSimple>
        </div>

        {/* view */}

        <div className={styles.containerBanner}>
          {userDB && userDB[validate()] && userDB[validate()]["BannerTop"] && <Banner ruta={validate()} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}
        </div>

        <div className={`${styles.viewer} ${formViewer == false && styles.hideForm}`}>

          <h2 className={styles.title}>{description}</h2>
          <p className={styles.description}>{title}</p>


          <div className={styles.containerIMGCenter}>
            <div className={styles.containerIMG}>
              <img src={userDB[validate()] && userDB[validate()].Posts && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url !== undefined && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url} className={styles.image} alt="" />
              <span className={styles.copyrightIMG}>{copyrightIMG}</span>
            </div>
          </div>



          {userDB && userDB[validate()] && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].state == 'Publicado' || user
            ? <div className={`${styles.qlEditor} `} styles={{ padding: '0', height: '50%' }} >
              <div className={`${styles.editor} ${styles.editorNon}`}>
                <TextEditor setValue={handlerTextEditorOnChange} value={textEditor ? textEditor : 'nada'} edit={false}></TextEditor>
              </div>

              <br />

              <div className={styles.redactorData}>
                <div className={styles.perfil}>
                  <img src={userDB[validate()] && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor !== undefined && userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor].url} className={styles.perfilIMG} alt="" />
                  {userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor] && <p>{userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor].name} <br /> Redactor</p>}
                </div>
                <span>
                  {days[new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getDay()]} {' de '}
                  {new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getDate()} {' de '}
                  {months[new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getMonth()]} {' de '}
                  {new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getFullYear()}</span>
              </div>
            </div>


            : <div>En redacción...</div>
          }
          {formViewer == false ? <span className={styles.formHide} onClick={formViewerHandler}>▷</span> : ''}
        </div>

        <div className={styles.adds}>



          <BannerNotas routeDB={`${validate()}`}  items={[1, 2, 3, 4]} click={handlerClickEnlace} admin={formViewer}></BannerNotas>

          {/* <img src="/publicidad.jpg" alt="" /> */}
        </div>



        {/* editor */}


        {user && <div className={`${styles.viewer} ${formViewer == true && styles.hideForm}`}>

          <label htmlFor="Title" >Titulo</label>
          <input type="text" id="Title" name="description" onChange={handlerOnChange} defaultValue={description} />
          <label htmlFor="Description" >Descripcion</label>
          <input type="text" id="Description" name="title" onChange={handlerOnChange} defaultValue={title} />
          <label htmlFor="Description" >Autor IMG</label>
          <input type="text" id="Description" name="copyrightIMG" onChange={handlerOnChange} defaultValue={copyrightIMG} />


          <h2 className={styles.title}>{description}</h2>
          <p className={styles.description}>{title}</p>

          <div className={styles.containerIMGCenter}>
            <div className={styles.containerIMG}>
              <img src={userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url} className={styles.image} alt="" />
              <span className={styles.copyrightIMG}>{copyrightIMG}</span>
            </div>
          </div>
          <div className={styles.editor}>
            <TextEditor setValue={handlerTextEditorOnChange} value={textEditor ? textEditor : 'nada'} edit={true}></TextEditor>
          </div>

          <br />

          <input type="checkbox" onClick={handlerChecked} checked={isChecked} /> init
          <br />
          <br />


          <div className={styles.buttonsContainer}>
            <Button style="miniButtonPrimary" click={(e) => save(e, 'B')}> Guardar/Borrador</Button>
            <Button style="miniButtonPrimary" click={(e) => save(e, 'P')}> Publicar</Button>
          </div>
        </div>}
        {user && <span className={styles.formViewer} onClick={formViewerHandler}>▷</span>}
        <TemplateNota topic={validate()} publicView={true} banner='none'></TemplateNota>

      </main>}

      <br />
      {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}

      {success == "save" && <Success>Cargando...</Success>}



      {zoomIMG !== '' && <div className='fixed flex justify-center items-center top-0 left-0 h-[100vh] w-[100vw] bg-[#000000c7] z-[1000000000]' onClick={closeZoom}>
                <div className='inline-block relative'>
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-[#000000c7] hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center z-50" onClick={closeZoom}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <img src={zoomIMG} className={`landscape:h-[80vh] portrait:w-[70vw] rounded-[20px]`} onClick={handlerZoom} alt="" />
                </div>
            </div>}



    </Layout>
  )
}
export default WithoutAuth(TemplateOne)




