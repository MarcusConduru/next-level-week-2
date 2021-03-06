import {Request, Response} from 'express';

import db from '../database/connection';
import corvertHourToMinutes from '../utils/corvertHourToMinutes';

interface scheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        if(!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        const timeInMinutes = corvertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=' , 'Users.id')
            .select(['classes.*', 'Users.*']); 
            // Todos os dados das seguintes tabelas

        return response.json(classes);
    }

    async create(request: Request, response: Response)  {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule 
        } = request.body;
    
        const trx = await db.transaction(); // caso aja algum problema em uma das inserções 
    
        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio 
            })
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
                return {
                    class_id: class_id,
                    week_day: scheduleItem.week_day,
                    from: corvertHourToMinutes(scheduleItem.from),
                    to: corvertHourToMinutes(scheduleItem.to),
                };
            })
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit(); // inseri tudo ao mesmo tempo
        
            return response.status(201).send();
        } catch(err) {
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    };
}