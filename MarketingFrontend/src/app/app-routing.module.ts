import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignTargetsComponent } from './campaign-targets/campaign-targets.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ClientComponent } from './client/client.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {path:"sidebar",component:SidebarComponent},
  {path:"header",component:HeaderComponent},
  {path:"clients",component:ClientComponent},
  {path:"products",component:ProductComponent},
  {path:"campaigns",component:CampaignComponent},
  {path:"campaign-targets",component:CampaignTargetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
