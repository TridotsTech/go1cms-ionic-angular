import { BuilderPricingComponent } from './builder-components/builder-pricing/builder-pricing.component';
import { BlurbComponent } from './builder-components/blurb/blurb.component';
import { AccordionComponent } from './builder-components/accordion/accordion.component';
import { TestComponent } from './builder-components/test/test.component';


import { DetailRelatedPostComponent } from './detail/detail-related-post/detail-related-post.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { MobileHeaderComponent } from './headers/mobile-header/mobile-header.component';
import { MobileHeader2Component } from './headers/mobile-header2/mobile-header2.component';
import { SecondaryHeaderComponent } from './headers/secondary-header/secondary-header.component';
import { WebHeaderComponent } from './headers/web-header/web-header.component';

import { HeaderComponent } from './header/header.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FooterComponent } from './footer/footer.component';
import { ReferenceSiteComponent } from './reference-site/reference-site.component';
import { DefaultHeaderComponent } from './headers/default-header/default-header.component';
import { TestimonialsviewComponent } from './testimonialsview/testimonialsview.component';
import { Webform1Component } from './webform1/webform1.component';
import {
  RecaptchaModule,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { OurTeamComponent } from './page-sections/our-team/our-team.component';
import { TestimonialsComponent } from './page-sections/testimonials/testimonials.component';
import { ClientsComponent } from './page-sections/clients/clients.component';
import { FAQComponent } from './page-sections/faq/faq.component';
import { PricingComponent } from './page-sections/pricing/pricing.component';
import { PageBuilderComponent } from './page-sections/page-builder/page-builder.component';
import { FeaturesComponent } from './page-sections/features/features.component';
import { CountersComponent } from './page-sections/counters/counters.component';
import { SlidersComponent } from './page-sections/sliders/sliders.component';
import { BlogsComponent } from './page-sections/blogs/blogs.component';

import { CTAComponent } from './page-sections/cta/cta.component';
import { PortfolioComponent } from './page-sections/portfolio/portfolio.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { GalleryDetailsComponent } from './gallery-details/gallery-details.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { ListStyleComponent } from './list/list-style/list-style.component';
import { ListBoxComponent } from './list/list-box/list-box.component';
import { ListBoxMasonryComponent } from './list/list-box-masonry/list-box-masonry.component';
import { ListHorizontalComponent } from './list/list-horizontal/list-horizontal.component';
import { SubListHeaderComponent } from './headers/sub-list-header/sub-list-header.component';
import { ListSectionComponent } from './page-sections/list-section/list-section.component';
import { DetailStyleComponent } from './detail/detail-style/detail-style.component';
import { ListFilterComponent } from './list/list-filter/list-filter.component';


import { ButtonComponent } from './builder-components/button/button.component';
import { CounterComponent } from './builder-components/counter/counter.component';
import { ExtrasComponent } from './builder-components/extras/extras.component';
import { ImageComponent } from './builder-components/image/image.component';
import { TestimonialComponent } from './builder-components/testimonial/testimonial.component';
import { TextComponent } from './builder-components/text/text.component';
import { BuilderSliderComponent } from './builder-components/builder-slider/builder-slider.component';
import { TemplateBuilderComponent } from './builder-components/template-builder/template-builder.component';
import { BuilderListComponent } from './builder-components/builder-list/builder-list.component';
import { LandingPageComponent } from './page-sections/landing-page/landing-page.component';


@NgModule({
  declarations: [
    DynamicFormComponent,
    PageBuilderComponent,
    WebHeaderComponent,
    MobileHeader2Component,
    SecondaryHeaderComponent,
    HeaderComponent,
    MobileHeaderComponent,
    MobileMenuComponent,
    ReferenceSiteComponent,
    DefaultHeaderComponent,
    TestimonialsviewComponent,
    Webform1Component,
    FooterComponent,
    OurTeamComponent,
    TestimonialsComponent,
    ClientsComponent,
    FAQComponent,
    PricingComponent,
    FeaturesComponent,
    CountersComponent,
    SlidersComponent,
    CTAComponent,
    BlogsComponent,
    PortfolioComponent,
    ImagesListComponent,
    GalleryDetailsComponent,
    ListStyleComponent,
    ListBoxComponent,
    ListBoxMasonryComponent,
    ListHorizontalComponent,
    SubListHeaderComponent,
    ListSectionComponent,
    DetailStyleComponent,
    DetailRelatedPostComponent,
    ListFilterComponent,

    TemplateBuilderComponent,
    TestComponent,
    BlurbComponent,
    AccordionComponent,
    ButtonComponent,
    CounterComponent,
    ExtrasComponent,
    ImageComponent,
    TestimonialComponent,
    TextComponent,
    BuilderSliderComponent,
    BuilderPricingComponent,
    BuilderListComponent,
    LandingPageComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LazyLoadImageModule,
    RecaptchaModule,
    RecaptchaV3Module,
    LightgalleryModule
  ],
  exports:[
    DynamicFormComponent,
    PageBuilderComponent,
    WebHeaderComponent,
    MobileHeader2Component,
    SecondaryHeaderComponent,
    HeaderComponent,
    MobileHeaderComponent,
    MobileMenuComponent,
    ReferenceSiteComponent,
    DefaultHeaderComponent,
    TestimonialsviewComponent,
    Webform1Component,
    FooterComponent,
    OurTeamComponent,
    TestimonialsComponent,
    ClientsComponent,
    FAQComponent,
    PricingComponent,
    FeaturesComponent,
    CountersComponent,
    SlidersComponent,
    CTAComponent,
    BlogsComponent,
    PortfolioComponent,
    ImagesListComponent,
    GalleryDetailsComponent,
    ListStyleComponent,
    ListBoxComponent,
    ListBoxMasonryComponent,
    ListHorizontalComponent,
    SubListHeaderComponent,
   
    ListSectionComponent,
    DetailStyleComponent,
    DetailRelatedPostComponent,
    ListFilterComponent,

    TemplateBuilderComponent,
    TestComponent,
    AccordionComponent,
    ButtonComponent,
     BlurbComponent,
    CounterComponent,
    ExtrasComponent,
    ImageComponent,
    TestimonialComponent,
    TextComponent,
    BuilderSliderComponent,
    BuilderPricingComponent,
    BuilderListComponent,
    LandingPageComponent
 ]
})
export class ComponentsModule { }
