import React, { FormEvent, useState } from 'react';
import PageHeader from '../../components/PageHeader/index';
import TeacherItem, {Teacher} from '../../components/TeacherItem/index'
import Input from '../../components/input/index';
import Select from '../../components/select/index';

import './styles.css'
import api from '../../Services/api';


function TeacherList() {
    const [teacher, setTeacher] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setweek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.defaultPrevented;
        
        const response = await api.get('classes', 
            {
                params: {
                    subject,
                    week_day,
                    time
                }
            }
        )
        console.log((response.data))
        alert((response.data))

        setTeacher(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form action="" id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e)=> {setSubject(e.target.value)}}
                        options={[
                            { value: 'Artes', label: 'Artes'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Ciências', label: 'Ciências'},
                            { value: 'Educação fisica', label: 'Educação fisica'},
                            { value: 'fisica', label: 'fisica'},
                            { value: 'Geografia', label: 'Geografia'},
                            { value: 'História', label: 'História'},
                            { value: 'Matematica', label: 'Matematica'},
                            { value: 'Português', label: 'Português'},
                            { value: 'Quimica', label: 'Quimica'},
                        ]}
                    />

                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e)=> {setweek_day(e.target.value)}}
                        options={[
                            { value: '0', label: 'Domingo'},
                            { value: '1', label: 'Segunda-feira'},
                            { value: '2', label: 'Terça-feira'},
                            { value: '3', label: 'Quarta-feira'},
                            { value: '4', label: 'Quinta-feira'},
                            { value: '5', label: 'Sexta-feira'},
                            { value: '6', label: 'Sabado'}
                        ]}
                    />
                    
                    <Input 
                        name="time" 
                        label="Hora" 
                        type="time"
                        value={time}
                        onChange={(e)=> {setTime(e.target.value)}}
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teacher.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
                
            </main>
        </div>
    )
}

export default TeacherList;