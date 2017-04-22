import Vue from 'vue'
import Router from 'vue-router'


import Notes from '../components/Notes';
import Index_page from '../components/Index_page'
import Master from '../components/Master';
import Note_detail from '../components/Note_detail';
import Note_list from '../components/Note_list';
import Message from '../components/MessageBoard';
import Imitate from '../components/Imitate';
import IFETraning from '../components/IFETraning';

Vue.use(Router)

export default new Router({
    //mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'index-page',
            component: Index_page
        },
        {
            path: '/notes',
            component: Notes,
            children:[
                {
                    path: '/',
                    name:"note",
                    component: Note_list
                },
                {
                    path: 'detail',
                    component: Note_detail
                }
            ]
        },
        {
            path: '/master/:typeid',
            name: 'master',
            component: Master
        },
        {
            path: '/message',
            name: 'message',
            component: Message
        },
        {
            path: '/imitate',

            component: Imitate
        },
        {
            path: '/ife',

            component: IFETraning
        },
    ]
})
