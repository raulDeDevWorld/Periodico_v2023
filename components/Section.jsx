import { useUser } from '../context/Context'
import Template from './Template'
import styles from '../styles/Template.module.css'
import { useState, useEffect } from 'react'
import Tag from '../components/Tag'
import style from '../styles/Form.module.css'

import Form from './Form'
import FormAddsC from './FormAddsC'

import { getDate, getDayMonthYear } from "../utils/Utils";


export default function Section({ topic, publicView, color }) {

    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear, dayMonthYear, viewPeriodista } = useUser()
    const [tag, setTag] = useState('Banners')

    function handlerTag(val) {
        tag === val ? setTag('') : setTag(val)
    }
    { console.log(userDB && userDB[topic] && userDB[topic]) }

    //console.log(postsIMG)
    return (
        <div className='bg-sky-100'>
            {userDB[topic] !== null && publicView == false && <Form topic={topic} value={userDB[`${topic}-${date}`]} color={color}></Form>}
            
            {userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' && publicView == false && viewPeriodista == false &&
                <>
                    <div className='grid grid-cols-3 gap-2'>
                        <Tag theme={tag === 'Banners' ? 'Primary' : 'Transparent'} click={() => handlerTag('Banners')}>Banners</Tag>
                        <Tag theme={tag === 'Modals' ? 'Primary' : 'Transparent'} click={() => handlerTag('Modals')}>Modals</Tag>
                        <Tag theme={tag === 'Notas' ? 'Primary' : 'Transparent'} click={() => handlerTag('Notas')}>Notas</Tag>
                    </div>
                    <div className={`${style.formInputsAdmin} ${style.formInputs}`}>
                        {tag === 'Banners' && <>
                            <FormAddsC ruteDB={`/${topic}/BannerTop`} ruteSTG='Banners' id={`/${topic}/BannerTop`} title='Añadir Banner Cabecera' />
                            <FormAddsC ruteDB={`/${topic}/BannerBottom`} ruteSTG='Banners' id={`/${topic}/BannerBottom`} title='Añadir Banner Pie' />
                        </>}
                        {tag === 'Modals' && <FormAddsC ruteDB={`/${topic}/Modals`} ruteSTG='Modals' id={`/${topic}/Modals`} title='Añadir Modal' />}
                        {tag === 'Notas' && <FormAddsC ruteDB={`/${topic}/Notas`} ruteSTG='Notas' id={`/${topic}/Notas`} title='Añadir publicidad' />}
                    </div>
                </>
            }

            <div className="columns-3xs">
                {userDB && userDB[topic] && userDB[topic]['Modals'] && Object.values(userDB[topic]['Modals']).map((i) => console.log(i))}
            </div>

            {userDB && userDB[topic] && userDB[topic]['Templates'] &&
                <Template
                    topic={topic}
                    color={color}
                    grid={userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()]} />
            }
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