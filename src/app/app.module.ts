import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeroComponent } from './views/hero/hero.component';
import { GamesComponent } from './views/games/games.component';
import { JobOpeningsComponent } from './views/job-openings/job-openings.component';
import { AuthFormComponent } from './views/auth-form/auth-form.component';
import { CareersComponent } from './views/careers/careers.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { GameDesignerComponent } from './views/game-designer/game-designer.component';
import { GameDeveloperComponent } from './views/game-developer/game-developer.component';
import { QaTesterComponent } from './views/qa-tester/qa-tester.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { CommunityManagerComponent } from './views/community-manager/community-manager.component';
import { CardsComponent } from './views/cards/cards.component';
import { FirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './views/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';
import { FanPageComponent } from './views/fan-page/fan-page.component';
import { FanCardsComponent } from './views/fan-cards/fan-cards.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentsComponent } from './views/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    GamesComponent,
    JobOpeningsComponent,
    AuthFormComponent,
    CareersComponent,
    AboutUsComponent,
    GameDesignerComponent,
    GameDeveloperComponent,
    QaTesterComponent,
    MainPageComponent,
    CommunityManagerComponent,
    CardsComponent,
    AdminComponent,
    ProfileComponent,
    ProfileEditComponent,
    FanPageComponent,
    FanCardsComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
