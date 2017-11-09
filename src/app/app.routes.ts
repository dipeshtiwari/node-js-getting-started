//Modules
import { Routes, RouterModule } from '@angular/router';

//pages
import { FrontComponent } from './frontend/front.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    { path: '', component: FrontComponent },
    { path: 'admin', component: AdminComponent },
]

export const Routing = RouterModule.forRoot(appRoutes
    //{ enableTracing: true } // <-- debugging purposes only
);