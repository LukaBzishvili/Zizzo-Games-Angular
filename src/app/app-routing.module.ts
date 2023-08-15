import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { CareersComponent } from './views/careers/careers.component';
import { CommunityManagerComponent } from './views/community-manager/community-manager.component';
import { QaTesterComponent } from './views/qa-tester/qa-tester.component';
import { GameDeveloperComponent } from './views/game-developer/game-developer.component';
import { GameDesignerComponent } from './views/game-designer/game-designer.component';
import { CardsComponent } from './views/cards/cards.component';
import { IsAuthedGuard } from './guards/is-authed.guard';
import { AdminComponent } from './views/admin/admin.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';
import { FanPageComponent } from './views/fan-page/fan-page.component';
import { FanCardsComponent } from './views/fan-cards/fan-cards.component';
import { CommentsComponent } from './views/comments/comments.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'aboutUs', component: AboutUsComponent},
  { path: 'careers', component: CareersComponent},
  { path: 'communityManager', component: CommunityManagerComponent},
  { path: 'QAtester', component: QaTesterComponent},
  { path: 'gameDeveloper', component: GameDeveloperComponent},
  { path: 'gameDesigner', component: GameDesignerComponent},
  { path: 'cards', component: CardsComponent, canActivate: [IsAuthedGuard]  },
  { path: 'admin', component: AdminComponent, canActivate: [IsAdminGuard]},
  { path: 'profile', component: ProfileComponent }, //,canActivate: [IsAuthedGuard] 
  { path: 'profileEdit', component: ProfileEditComponent},
  { path: 'fanPage', component: FanPageComponent},
  { path: 'fanCardPage', component: FanCardsComponent},
  {
    path: "comments/:id",
    component: CommentsComponent
  },
  // { path: "post/:id", component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsAuthedGuard, IsAdminGuard]
})
export class AppRoutingModule { }
