import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';

export const routes: Routes = [


    {path:'',
        component:MainLayoutComponent,
        children: [
            {path: 'inicio', component:InicioComponent},
            {path: 'sobrenosotros', component:SobreNosotrosComponent},
           

            { path: '', redirectTo: 'inicio', pathMatch: 'full' }
       
        ]

    },

    //si la ruta  no existe redirecciona a inicio
    {path: '**', redirectTo:'inicio'},


];
