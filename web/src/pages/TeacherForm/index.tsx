import React, {FormEvent, useState} from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/index';
import Input from '../../components/input/index';
import Textarea from '../../components/Textarea';
import Select from '../../components/select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../Services/api';

function TeacherForm() {

    const histoty = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setscheduleItems] = useState([
        {week_day: 0, from: '',to:''},
    ])

    function addNewScheduleItem() {
        setscheduleItems([...scheduleItems,
        {week_day: 0, from: '',to:''}
        ]);
    }

    function setScheduleItemValue(position: number,field: string,value: string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
          if (index === position) {
            // console.log(scheduleItem)
            return { ...scheduleItem, [field]: value };
          }
          return scheduleItem;
        });

        console.log(updateScheduleItems);
    
        setscheduleItems(updateScheduleItems);
      };

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            histoty.push('/');
        }).catch(() => {
            console.log('Erro no cadastro!');
        })
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrivel que voc?? quer dar aulas"
                description="O primeiro passo ?? preencher esse formul??rio de inscri????o"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome completo" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} 
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp} 
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name="subject" 
                            label="Mat??ria"
                            value={subject}
                            onChange= {(e) => {setSubject(e.target.value)}}
                            options={[
                                { value: 'Artes', label: 'Artes'},
                                { value: 'Biologia', label: 'Biologia'},
                                { value: 'Ci??ncias', label: 'Ci??ncias'},
                                { value: 'Educa????o fisica', label: 'Educa????o fisica'},
                                { value: 'fisica', label: 'fisica'},
                                { value: 'Geografia', label: 'Geografia'},
                                { value: 'Hist??ria', label: 'Hist??ria'},
                                { value: 'Matematica', label: 'Matematica'},
                                { value: 'Portugu??s', label: 'Portugu??s'},
                                { value: 'Quimica', label: 'Quimica'},
                            ]}
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost} 
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Hor??rios dispon??veis
                            <button type='button' onClick={addNewScheduleItem}>
                                + Novo hor??rio
                            </button>
                        </legend>

                        {scheduleItems.map( (scheduleItem,index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">                        
                                    <Select 
                                        name="week_day" 
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo'},
                                            { value: '1', label: 'Segunda-feira'},
                                            { value: '2', label: 'Ter??a-feira'},
                                            { value: '3', label: 'Quarta-feira'},
                                            { value: '4', label: 'Quinta-feira'},
                                            { value: '5', label: 'Sexta-feira'},
                                            { value: '6', label: 'Sabado'}
                                        ]}
                                    />
            
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="At??" 
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index,'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p> 
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            preencha todos os dados
                        </p>

                        <button type='submit'>
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;