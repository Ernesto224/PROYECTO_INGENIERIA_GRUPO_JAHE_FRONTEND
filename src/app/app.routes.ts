import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { FacilidadesComponent } from './pages/facilidades/facilidades.component';
import { ComoLlegarComponent } from './pages/como-llegar/como-llegar.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
import { ReservarEnLineaComponent } from './pages/reservar-en-linea/reservar-en-linea.component';
import { ContactenosComponent } from './pages/contactenos/contactenos.component';

export const routes: Routes = [


    {path:'',
        component:MainLayoutComponent,
        children: [
            {path: 'inicio', component:InicioComponent},
            {path: 'sobre-nosotros', component:SobreNosotrosComponent},
            {path: 'facilidades', component:FacilidadesComponent},
            {path: 'como-llegar', component:ComoLlegarComponent},
            {path: 'tarifas', component:TarifasComponent},
            {path: 'reservar-en-linea', component:ReservarEnLineaComponent},
            {path: 'contactenos', component:ContactenosComponent},
           

            { path: '', redirectTo: 'inicio', pathMatch: 'full' }
       
        ]

    },

    //si la ruta  no existe redirecciona a inicio
    {path: '**', redirectTo:'inicio'},


];
