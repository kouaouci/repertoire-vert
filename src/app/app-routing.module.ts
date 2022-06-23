import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { TabPage } from "./pages/tab/tab.page";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { AuthGuard } from "./services/auth/auth.guard";
import { LoginGuard } from "./services/auth/login.guard";
import { AuthGuardService } from "./services/auth.guard.service";
import { ErrorMessageComponent } from "./components/error-message/error-message.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "tabs",
    component: TabPage,
    children: [
      {
        path: "menu",
        loadChildren: () =>
          import("./pages/menu/menu.module").then((m) => m.MenuModule),
        canActivate: [AuthGuard],
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./pages/profile/profile.module").then(
            (m) => m.ProfilePageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "category",
        loadChildren: () =>
          import("./pages/category/category.module").then(
            (m) => m.CategoryPageModule
          ),
      },
      {
        path: "categories/:categoryId/subcategories/:subcategoryId",
        loadChildren: () =>
          import("./pages/subcategory/subcategory.module").then(
            (m) => m.SubcategoryPageModule
          ),
      },
      {
        path: "pricing",
        loadChildren: () =>
          import("./pages/pricing/pricing.module").then(
            (m) => m.PricingPageModule
          ),
      },
      {
        path: "form-options-co2",
        loadChildren: () =>
          import("./pages/co2/form-options/form-options.module").then(
            (m) => m.FormOptionsPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "communaute",
        loadChildren: () =>
          import("./pages/communaute/communaute.module").then(
            (m) => m.CommunautePageModule
          ),
      },
      {
        path: "qrcode",
        loadChildren: () =>
          import("./pages/qrcode/qrcode.module").then(
            (m) => m.QrcodePageModule
          ),
      },
      {
        path: "lieux",
        loadChildren: () =>
          import("./pages/lieux/lieux.module").then((m) => m.LieuxPageModule),
      },
      {
        path: "home-forum",
        loadChildren: () =>
          import("./pages/communaute/Forum/home-forum/home-forum.module").then(
            (m) => m.HomeForumPageModule
          ),
      },
      {
        path: "show-post/:id",
        loadChildren: () =>
          import("./pages/communaute/Forum/show-post/show-post.module").then(
            (m) => m.ShowPostPageModule
          ),
      },
      {
        path: "forum/create-post",
        loadChildren: () =>
          import(
            "./pages/communaute/Forum/create-post/create-post.module"
          ).then((m) => m.CreatePostPageModule),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./pages/social/settings/settings.module").then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./pages/social/users/users.module").then(
            (m) => m.UsersPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "home-shop",
        loadChildren: () =>
          import("./pages/shop/home-shop/home-shop.module").then(
            (m) => m.HomeShopPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "shop-cart",
        loadChildren: () =>
          import("./pages/shop/shop-cart/shop-cart.module").then(
            (m) => m.ShopCartPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "product-details/:id",
        loadChildren: () =>
          import("./pages/shop/product-details/product-details.module").then(
            (m) => m.ProductDetailsPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "communaute-find-result",
        loadChildren: () =>
          import(
            "./pages/communaute-find-result/communaute-find-result.module"
          ).then((m) => m.CommunauteFindResultPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "covoiturage",
        loadChildren: () =>
          import("./pages/communaute/covoiturage/covoiturage.module").then(
            (m) => m.CovoiturageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "covoiturage-details/:id",
        loadChildren: () =>
          import("./pages/cov-details/cov-details.module").then(
            (m) => m.CovDetailsPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "co2/home",
        loadChildren: () =>
          import("./pages/co2/home/home.module").then((m) => m.HomePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "co2/map/:id",
        loadChildren: () =>
          import("./pages/co2/map/map.module").then((m) => m.MapPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "user-orders",
        loadChildren: () =>
          import("./pages/shop/user-orders/user-orders.module").then(
            (m) => m.UserOrdersPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "notifications",
        loadChildren: () =>
          import("./pages/social/notifications/notifications.module").then(
            (m) => m.NotificationsPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "users-profile/:id",
        loadChildren: () =>
          import("./pages/social/users-profile/users-profile.module").then(
            (m) => m.UsersProfilePageModule
          ),
      },
      {
        path: "users-stats/:id",
        loadChildren: () =>
          import("./pages/social/users-stats/users-stats.module").then(
            (m) => m.UsersStatsModule
          ),
      },
      {
        path: "users-ratings/:id",
        loadChildren: () =>
          import("./pages/social/users-ratings/users-ratings.module").then(
            (m) => m.UsersRatingsModule
          ),
      },
      {
        path: "companies/:id/reviews",
        loadChildren: () =>
          import("./pages/reviews/reviews.module").then((m) => m.ReviewsModule),
      },
      {
        path: "products/:id/reviews",
        loadChildren: () =>
          import("./pages/reviews/reviews.module").then((m) => m.ReviewsModule),
      },
      {
        path: "company-profile/:id",
        loadChildren: () =>
          import("./pages/company-profile/company-profile.module").then(
            (m) => m.CompanyProfilePageModule
          ),
      },
      {
        path: "invitations",
        loadChildren: () =>
          import("./pages/social/invitations/invitations.module").then(
            (m) => m.InvitationsPageModule
          ),
      },
      {
        path: "news",
        loadChildren: () =>
          import("./pages/news/news.module").then((m) => m.NewsModule),
      },
      {
        path: "registrations/:type",
        loadChildren: () =>
          import("./pages/registrations/registrations.module").then(
            (m) => m.RegistrationsModule
          ),
      },
    ],
  },
  {
    path: "welcome",
    component: WelcomeComponent,
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "inscription",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "lieux-results",
    loadChildren: () =>
      import("./pages/lieux-results/lieux-results.module").then(
        (m) => m.LieuxResultsPageModule
      ),
  },
  {
    path: "identification",
    loadChildren: () =>
      import("./pages/identification/identification.module").then(
        (m) => m.IdentificationPageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "logout",
    loadChildren: () =>
      import("./pages/logout/logout.module").then((m) => m.LogoutPageModule),
  },
  {
    path: "map-info",
    loadChildren: () =>
      import("./pages/map-info/map-info.module").then(
        (m) => m.MapInfoPageModule
      ),
  },
  {
    path: "map-pricing",
    loadChildren: () =>
      import("./pages/map-pricing/map-pricing.module").then(
        (m) => m.MapPricingPageModule
      ),
  },
  {
    path: "pricing-products",
    loadChildren: () =>
      import("./pages/pricing-products/pricing-products.module").then(
        (m) => m.PricingProductsPageModule
      ),
  },
  {
    path: "lieux-driving",
    loadChildren: () =>
      import("./pages/lieux-driving/lieux-driving.module").then(
        (m) => m.LieuxDrivingPageModule
      ),
  },
  {
    path: "lieux-walking",
    loadChildren: () =>
      import("./pages/lieux-walking/lieux-walking.module").then(
        (m) => m.LieuxWalkingPageModule
      ),
  },
  {
    path: "lieux-cycling",
    loadChildren: () =>
      import("./pages/lieux-cycling/lieux-cycling.module").then(
        (m) => m.LieuxCyclingPageModule
      ),
  },
  {
    path: "lieux-driving-traffic",
    loadChildren: () =>
      import("./pages/lieux-driving-traffic/lieux-driving-traffic.module").then(
        (m) => m.LieuxDrivingTrafficPageModule
      ),
  },
  {
    path: "user-stats",
    loadChildren: () =>
      import("./pages/user-info/user-stats/user-stats.module").then(
        (m) => m.UserStatsPageModule
      ),
  },
  {
    path: "user-favorites",
    loadChildren: () =>
      import("./pages/user-info/user-favorites/user-favorites.module").then(
        (m) => m.UserFavoritesPageModule
      ),
  },
  {
    path: "user-activities",
    loadChildren: () =>
      import("./pages/user-info/user-activities/user-activities.module").then(
        (m) => m.UserActivitiesPageModule
      ),
  },
  {
    path: "user-network",
    loadChildren: () =>
      import("./pages/user-info/user-network/user-network.module").then(
        (m) => m.UserNetworkPageModule
      ),
  },
  {
    path: "allow-modal",
    loadChildren: () =>
      import("./shared/allow-modal/allow-modal.module").then(
        (m) => m.AllowModalPageModule
      ),
  },
  {
    path: "co2-tutorial",
    loadChildren: () =>
      import("./pages/tutorials/co2-tutorial/co2-tutorial.module").then(
        (m) => m.Co2TutorialPageModule
      ),
  },
  {
    path: "chats",
    loadChildren: () =>
      import("./pages/social/chats/chats.module").then(
        (m) => m.ChatsPageModule
      ),
  },
  {
    path: "discussion-chat",
    loadChildren: () =>
      import("./pages/social/discussion-chat/discussion-chat.module").then(
        (m) => m.DiscussionChatPageModule
      ),
  },
  {
    path: "services",
    loadChildren: () =>
      import("./pages/repservices/services/services.module").then(
        (m) => m.ServicesPageModule
      ),
  },
  {
    path: "service-detail/:id",
    loadChildren: () =>
      import("./pages/repservices/service-detail/service-detail.module").then(
        (m) => m.ServiceDetailPageModule
      ),
  },
  {
    path: "quote-request",
    loadChildren: () =>
      import("./pages/repservices/quote-request/quote-request.module").then(
        (m) => m.QuoteRequestPageModule
      ),
  },
  {
    path: "quote-details/:id",
    loadChildren: () =>
      import("./pages/repservices/quote-details/quote-details.module").then(
        (m) => m.QuoteDetailsPageModule
      ),
  },
  {
    path: "quote-detailsuser/:id",
    loadChildren: () =>
      import(
        "./pages/repservices/quote-detailsuser/quote-detailsuser.module"
      ).then((m) => m.QuoteDetailsuserPageModule),
  },
  {
    path: "quote-requestuser",
    loadChildren: () =>
      import(
        "./pages/repservices/quote-requestuser/quote-requestuser.module"
      ).then((m) => m.QuoteRequestuserPageModule),
  },
  {
    path: "add-service",
    loadChildren: () =>
      import("./pages/repservices/add-service/add-service.module").then(
        (m) => m.AddServicePageModule
      ),
  },
  {
    path: "company",
    loadChildren: () =>
      import("./pages/company/company.module").then((m) => m.CompanyPageModule),
  },
  {
    path: "company-services",
    loadChildren: () =>
      import(
        "./pages/repservices/company-services/company-services.module"
      ).then((m) => m.CompanyServicesPageModule),
  },
  {
    path: "add-servicescategory",
    loadChildren: () =>
      import(
        "./pages/repservices/add-servicescategory/add-servicescategory.module"
      ).then((m) => m.AddServicescategoryPageModule),
  },
  {
    path: "company-categories",
    loadChildren: () =>
      import(
        "./pages/repservices/company-catgories/company-catgories.module"
      ).then((m) => m.CompanyCatgoriesPageModule),
  },
  {
    path: "user-orders",
    loadChildren: () =>
      import("./pages/shop/user-orders/user-orders.module").then(
        (m) => m.UserOrdersPageModule
      ),
  },
  {
    path: "identification",
    loadChildren: () =>
      import("./pages/identification/identification.module").then(
        (m) => m.IdentificationPageModule
      ),
  },
  {
    path: "forgotPassword",
    loadChildren: () =>
      import("./pages/forgot-passeword/forgot-passeword.module").then(
        (m) => m.ForgotPassewordPageModule
      ),
  },
  {
    path: "new-password",
    loadChildren: () =>
      import("./pages/new-password/new-password.module").then(
        (m) => m.NewPasswordPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, LoginGuard],
})
export class AppRoutingModule {}
