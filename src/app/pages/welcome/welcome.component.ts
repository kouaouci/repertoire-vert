import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  options = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    
  };

  lastSlide = false;

  pages = [
    {
      title: "Bienvenue sur le Répertoire Vert",
      text: "Le Répertoire Vert est divisé en 27 secteurs d’activités, allant de l’alimentation au bâtiment, en passant  par les textiles, les médias et bien  d’autres encore.",
      image: "../../../assets/imgs/welcome/welcome.svg"
    },
    {
      title: "Un système d'évaluation",
      text: "4 niveaux de référencement : Acteur  externe, membre de l’association  gaea21, membre du réseau gaea21  et détenteur du label gaea21.",
      image: "../../../assets/imgs/welcome/evaluation.svg"
    },
    {
      title: "Un système de référencement",
      text: "Il permet aux consomm’acteurs de localiser plus facilement un produit ou service vert adapté à ses besoins.",
      image: "../../../assets/imgs/welcome/referencement.svg"
    },
    {
      title: "Une consommation responsable",
      text: "Le Répertoire permet de concentrer et de référencer toute l’offre de produits et de services verts d’une région, permettant ainsi de savoir où et quoi chercher.",
      image: "../../../assets/imgs/welcome/consommation.svg"
    },
    {
      title: "Economie Verte / Circulaire",
      text: "Le Répertoire vert oriente les éco-consommateurs vers les entreprises locales vertes.",
      image: "../../../assets/imgs/welcome/economie_ville.svg"
    },
    {
      title: "Economie Verte / Circulaire",
      text: "Le Répertoire Vert permet de baisser significativement le chômage et accélère la création d’emplois.",
      image: "../../../assets/imgs/welcome/economie_ville_region.svg"
    },
    {
      title: "Entreprises : Production Responsable",
      text: "Le Répertoire Vert vous fait bénéficier d’une meilleure visibilité et d’une meilleure diffusion sur le marché des produits et services verts, dans le but d’accroître les ventes de vos produits et services verts.",
      image: "../../../assets/imgs/welcome/entreprises.png"
    },
    {
      title: "Entreprises : Production Responsable",
      text: "Grâce au processus d’audit, vous pourrez non seulement diminuer votre impact environnemental, mais aussi renforcer le capital confiance de votre entreprise auprès des éco-consommateurs.",
      image: "../../../assets/imgs/welcome/entreprises_responsable.png"
    },
    {
      title: "Villes : Economie Verte / Circulaire",
      text: "Il accélère la transition écologique de votre région en accompagnant vos entreprises locales vers des pratiques plus vertueuses.",
      image: "../../../assets/imgs/welcome/economie_verte.svg"
    },
    {
      title: "Services",
      text: "Nous proposons différents services  que ce soit pour les individus et les  entreprises : Des programmes  d’accompagnement, de mise en  relation et de coaching.",
      image: "../../../assets/imgs/welcome/services.svg"
    },
    {
      title: "Forum",
      text: "Un lieu d’échange entre acteurs  écologiques (éco-consommateurs,  entreprises), où vous pourrez  échanger vos bons plans et  conseils verts.",
      image: "../../../assets/imgs/welcome/forum.svg"
    },
    {
      title: "Shop",
      text: "Notre boutique en ligne, où vous  pourrez retrouver tous les produits  verts de nots entreprises partenaires.",
      image: "../../../assets/imgs/welcome/shop.svg"
    }
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(() => 
      this.slides.startAutoplay()
    , 5000);
  }

  next() {
    this.slides.slideNext()
    this.showBegin();
  }

  slideDidChange() {
    this.showBegin();
    this.slides.getActiveIndex().then(index => {
      if (index === this.pages.length -1) {
        this.slides.stopAutoplay();
      } else {
        this.slides.stopAutoplay();
        setTimeout(() => 
          this.slides.startAutoplay()
        , 5000);
      }
    });
  }

  showBegin() {
    this.slides.getActiveIndex().then(index => {
      if (index === this.pages.length - 1) {
        this.lastSlide = true;
      } else {
        this.lastSlide = false;
      }
    });
  }
}
