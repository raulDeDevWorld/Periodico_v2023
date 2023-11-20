import { useUser } from '../context/Context'
import Template from './Template'
import Button from './Button'
import styles from '../styles/Template.module.css'
import { useState, useEffect } from 'react'
import Tag from '../components/Tag'
import style from '../styles/Form.module.css'
import { removeData } from '../firebase/utils'
import Form from './Form'
import FormAddsC from './FormAddsC'

import { getDate, getDayMonthYear } from "../utils/Utils";

import Modal2 from './Modal2'

export default function Section({ topic, publicView, color }) {

    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear, dayMonthYear, viewPeriodista, item, setItem, modal, setModal } = useUser()
    const [tag, setTag] = useState('Banners')
    const [zoomIMG, setZoomIMG] = useState('')
    const [modalsInterval, setModalsInterval] = useState(false)
    const [counterModals, setCounterModals] = useState(0)

    function handlerTag(val) {
        tag === val ? setTag('') : setTag(val)
    }

    function handlerZoom(i) {
        setZoomIMG(i.url)
    }
    function closeZoom() {
        setZoomIMG('')
    }
    function deletConfirm() {
        removeData(item.route, setUserData, setUserSuccess)
        setModal('')
    }
    function delet(i, path) {
        console.log(topic)
        setItem({ ...i, route: `${topic}/${path}/${i.uuid}` })
        setModal('DELETE')
    }
console.log(item)
    return (
        <div className='w-full bg-sky-100'>
            {modal === 'DELETE' && <Modal2 theme="Danger" button="Eliminar" funcion={deletConfirm}>Estas seguro de eliminar la publicidad que selecionaste</Modal2>}

            {userDB[topic] !== null && publicView == false && <Form topic={topic} value={userDB[`${topic}-${date}`]} color={color}></Form>}

            { user && userDB && userDB.users && userDB.users[user.uid] !== undefined && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' && publicView == false && viewPeriodista == false &&
                <>
                     <div className={`grid ${topic !== 'Inicio' ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                        <Tag theme={tag === 'Banners' ? 'Primary' : 'Transparent'} click={() => handlerTag('Banners')}>Banners</Tag>
                        <Tag theme={tag === 'Modals' ? 'Primary' : 'Transparent'} click={() => handlerTag('Modals')}>Modals</Tag>
                       { topic !== 'Inicio' && <Tag theme={tag === 'Notas' ? 'Primary' : 'Transparent'} click={() => handlerTag('Notas')}>Notas</Tag>}
                    </div>
                    <div className={`${style.formInputsAdmin} ${style.formInputs}`}>
                        {tag === 'Banners' && <>
                            <FormAddsC ruteDB={`/${topic}/BannerTop`} ruteSTG='Banners' id={`/${topic}/BannerTop`} title='Añadir Banner Cabecera' />
                            <FormAddsC ruteDB={`/${topic}/BannerBottom`} ruteSTG='Banners' id={`/${topic}/BannerBottom`} title='Añadir Banner Pie' />
                        </>}
                        { tag === 'Modals' && <FormAddsC ruteDB={`/${topic}/Modals`} ruteSTG='Modals' id={`/${topic}/Modals`} title='Añadir Modal' />}
                        {topic !== 'Inicio' && tag === 'Notas' && <FormAddsC ruteDB={`/${topic}/Notas`} ruteSTG='Notas' id={`/${topic}/Notas`} title='Añadir banner notas' />}
                    </div>
                </>
            }

            {tag === 'Modals' && <div className="columns-3 gap-3 pb-3">
                {userDB && userDB[topic] && userDB[topic]['Modals'] && Object.values(userDB[topic]['Modals']).map((i, index) => {
                    return <div className='inline-block relative' key={index}>
                        <img src={i.url} className={`${'w-full gap-5 rounded-[15px] mb-3.5'} transition-all`} style={{ zIndex: '1000000000' }} onClick={() => handlerZoom(i)} alt="" />
                        <div className='w-full absolute bottom-[20px] px-5 z-50'>
                            <Button theme='MiniDanger' click={() => delet(i, 'Modals')}>Eliminar</Button>
                        </div>
                    </div>
                })}
            </div>}
            {tag === 'Notas' && <div className="columns-3 gap-3 pb-3">
                {userDB && userDB[topic] && userDB[topic]['Notas'] && Object.values(userDB[topic]['Notas']).map((i, index) => {
                    return <div className='inline-block relative' key={index}>
                        <img src={i.url} className={`${'w-full gap-5 rounded-[15px] mb-3.5'} transition-all`} style={{ zIndex: '1000000000' }} alt="" />
                        <div className='w-full absolute bottom-[20px] px-5 z-50'>
                            <Button theme='MiniDanger' click={() => delet(i, 'Notas')}>Eliminar</Button>
                        </div>
                    </div>
                })}
            </div>}

            {userDB && userDB[topic] && userDB[topic]['Templates'] && tag === 'Banners' &&
                <Template
                    topic={topic}
                    color={color}
                    grid={userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()]} />
            }
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

        </div>

    )
}





{/* <>
            {userDB[topic] !== null && publicView == false && <Form topic={topic} value={userDB[`${topic}-${date}`]} color={color}></Form>}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateOne" &&
                <TemplateOne topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateThreeA" &&
                <TemplateThreeA topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateThreeB" &&
                <TemplateThreeB topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == null &&
                <TemplateThreeB topic={topic} color={color} />}   
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateFour" &&
                <TemplateFour topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateFive" &&
                <TemplateFive topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateSix"
                &&
                <TemplateSix topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateSeven"
                &&
                <TemplateSeven topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateEight"
                &&
                <TemplateEight topic={topic} color={color} />}
        </> */}