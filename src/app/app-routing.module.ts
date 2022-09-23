import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'register-form/:type',
    loadChildren: () => import('./pages/register-form/register-form.module').then( m => m.RegisterFormPageModule)
  },
  {
    path: 'register-form',
    loadChildren: () => import('./pages/register-form/register-form.module').then( m => m.RegisterFormPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'coming-soon',
    loadChildren: () => import('./pages/coming-soon/coming-soon.module').then( m => m.ComingSoonPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  // {
  //   path: 'curriculum',
  //   loadChildren: () => import('./pages/curriculum/curriculum.module').then( m => m.CurriculumPageModule)
  // },
  {
    path: 'events/:events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'p/:page_route',
    // path: ':/page_route',
    // path: 'internship',
    loadChildren: () => import('./pages/internship/internship.module').then( m => m.InternshipPageModule)
  },
  {
    path: 'new/:page_route',
    loadChildren: () => import('./pages/web-form/web-form.module').then( m => m.WebFormPageModule)
  },
  {
    path: 'webform-child',
    loadChildren: () => import('./pages/webform-child/webform-child.module').then(m => m.WebformChildPageModule)
  },
  {
    path: 'edit-webformchild',
    loadChildren: () => import('./pages/edit-webformchild/edit-webformchild.module').then(m => m.EditWebformchildPageModule)
  },
  {
    path: 'gallery-detail',
    loadChildren: () => import('./pages/gallery-detail/gallery-detail.module').then( m => m.GalleryDetailPageModule)
  },
  {
    path: 'gallery-detail/:id',
    loadChildren: () => import('./pages/gallery-detail/gallery-detail.module').then( m => m.GalleryDetailPageModule)
  },
  {
    path: 'gallery-list',
    loadChildren: () => import('./pages/gallery-list/gallery-list.module').then( m => m.GalleryListPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then( m => m.ListPageModule)
  },

  {
    path: 'list/:page_route',
    loadChildren: () => import('./pages/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'detail/:page_route',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'detail/:page_route/:page_route_1',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'detail/:page_route/:page_route_1/:page_route_2',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'c/:page_route',
    loadChildren: () => import('./pages/page-builder/page-builder.module').then( m => m.PageBuilderPageModule)
  },
  {
    path: 'c',
    loadChildren: () => import('./pages/page-builder/page-builder.module').then( m => m.PageBuilderPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./pages/landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },





  // {
  //   path: 'blog-list',
  //   loadChildren: () => import('./pages/blog-list/blog-list.module').then( m => m.BlogListPageModule)
  // },
  // {
  //   path: 'blog-list/:id',
  //   loadChildren: () => import('./pages/blog-list/blog-list.module').then( m => m.BlogListPageModule)
  // },
  // {
  //   path: 'blog-detail/:route',
  //   loadChildren: () => import('./pages/blog-detail/blog-detail.module').then( m => m.BlogDetailPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
