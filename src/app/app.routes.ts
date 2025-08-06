import { Routes } from '@angular/router';
import { Form } from './form/form';
import { List } from './list/list';
import { Home } from './home/home';
import { Manage } from './manage/manage';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'form', component: Form},
    {path: 'list', component: List},
    {path: 'manage', component: Manage},
    { path: 'form/:id', component: Form },
{ path: 'form', component: Form }

];
