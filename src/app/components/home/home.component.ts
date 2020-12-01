import { AlertService } from './../../service/alert';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication';
import { GeneralService } from './../../service/general';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coupons: Coupon[];
  filteredCoupons: Coupon[];
  allCategories: string[];
  unlaunchedCoupons: Coupon[];
  unlaunchedCouponsCategory = 'Coming soon';
  couponsByCategory = {};
  filterType: string;

  constructor(
    private generalService: GeneralService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    // const values = [{"id":15,"companyName":"OrComp","categoryName":"electricity","title":"phone","description":"iPhone 10 plus","startDate":"2020-04-21T00:00:00.000+00:00","endDate":"2021-05-05T00:00:00.000+00:00","amount":7,"price":1500.0,"image":"https://images-na.ssl-images-amazon.com/images/I/71q39Z4Cq0L._AC_SY355_.jpg"},{"id":197,"companyName":"OrComp","categoryName":"vacation","title":"the best coupon","description":"des","startDate":"2020-11-10T00:00:00.000+00:00","endDate":"2020-12-02T00:00:00.000+00:00","amount":50,"price":400.0,"image":"https://s3.amazonaws.com/iexit/images/static/tc/travelcoupons_logo_small.png"},{"id":198,"companyName":"OrComp","categoryName":"vacation","title":"the best vacation ever","description":"description164","startDate":"2020-09-07T00:00:00.000+00:00","endDate":"2025-07-30T00:00:00.000+00:00","amount":39,"price":2500.0,"image":"https://pix10.agoda.net/hotelImages/593/5937716/5937716_18111014190069628556.jpg?s=1024x768"},{"id":199,"companyName":"OrComp","categoryName":"food","title":"title128","description":"description146","startDate":"2020-09-07T00:00:00.000+00:00","endDate":"2025-07-07T00:00:00.000+00:00","amount":58,"price":23.0,"image":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg"},{"id":226,"companyName":"drink","categoryName":"restaurant","title":"coupon1","description":"des1","startDate":"2020-11-10T00:00:00.000+00:00","endDate":"2021-11-10T00:00:00.000+00:00","amount":100,"price":55.6,"image":"https://media-cdn.tripadvisor.com/media/photo-s/1b/15/7e/cf/artur-restorant.jpg"},{"id":236,"companyName":"OrComp","categoryName":"travels","title":"Best Vacation Ever","description":"funfunfun","startDate":"2020-11-08T00:00:00.000+00:00","endDate":"2021-08-15T00:00:00.000+00:00","amount":99,"price":1200.0,"image":"https://www.destinationcoupons.com/images/715x260-Hilton-EMEA-8jogZUlMXOdUI.jpg"},{"id":237,"companyName":"OrComp","categoryName":"cars","title":"Jeep","description":"4X4 SUV","startDate":"2020-11-14T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":5,"price":35000.0,"image":"https://cdn1.buyacar.co.uk/sites/buyacar/files/styles/w860/public/range-rover-evoque-1.jpg?itok=IEJF_Mof"},{"id":238,"companyName":"eliran","categoryName":"cars","title":"title","description":"description","startDate":"2020-12-19T00:00:00.000+00:00","endDate":"2022-11-09T00:00:00.000+00:00","amount":555,"price":2000.0,"image":"https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/98_-_fastest_accelerating_road_cars_-_ferrari_f8_tributo.jpg?itok=cK2YYgq2"},{"id":239,"companyName":"OrComp","categoryName":"smartphons","title":"iPhone 12 Pro Plus","description":"best iPhone ever","startDate":"2020-11-14T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":21,"price":4999.0,"image":"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2020/10/iphone-12-pro-pro-max-1602825781.jpg"},{"id":241,"companyName":"OrComp","categoryName":"cars","title":"car","description":"des","startDate":"2020-11-19T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":7,"price":20.0,"image":"https://www.focus2move.com/wp-content/uploads/2020/06/McLaren-GT-2020-800-82.jpg"},{"id":243,"companyName":"OrComp","categoryName":"cars","title":"car3","description":"des","startDate":"2020-11-19T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":13,"price":100.0,"image":"https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/story/hero_image/2019-Porsche-911-coupe-red-press-image-1001x565p-%281%29.jpg"},{"id":244,"companyName":"Levi Industries","categoryName":"computers","title":"Leptop","description":"Intel i10","startDate":"2020-11-20T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":24,"price":2420.0,"image":"https://www.ivory.co.il/files/catalog/org/1553092135y35Zl.jpg"},{"id":245,"companyName":"Levi Industries","categoryName":"Toys","title":"chess","description":"Black November","startDate":"2020-11-20T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":12,"price":10000.0,"image":"https://www.italiascacchistica.com/wp-content/uploads/2020/02/Basic-Lesson-of-Chess.jpeg"},{"id":246,"companyName":"OrComp","categoryName":"food","title":"pizza","description":"the dest pizza","startDate":"2020-11-20T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":50,"price":100.0,"image":"https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg"},{"id":247,"companyName":"OfekTheQueen","categoryName":"clothes","title":"H&M","description":"blue jacket with beautiful knitting of a little pocket","startDate":"2020-11-21T00:00:00.000+00:00","endDate":"2020-12-28T00:00:00.000+00:00","amount":123,"price":80.0,"image":"https://i.pinimg.com/originals/4d/cc/24/4dcc24cc961a3d97a3a9892d141955c4.jpg"},{"id":248,"companyName":"OfekTheQueen","categoryName":"food","title":"burger meal","description":"burger with village bread, chips and cola beside","startDate":"2020-11-21T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":1500,"price":30.0,"image":"https://i.pinimg.com/originals/3e/04/c2/3e04c2b8f4cd67e9a4f08c50d67a8647.jpg"},{"id":250,"companyName":"OfekTheQueen","categoryName":"jewelry","title":"Wedding Ring","description":"silver ring with one big diamond in the middle and little ones near the big diamond","startDate":"2020-11-21T00:00:00.000+00:00","endDate":"2020-12-12T00:00:00.000+00:00","amount":755,"price":7500.0,"image":"https://panag-cdn2.shlish-fashion.co.il/images/thumbs/0015202_-_750.jpeg"},{"id":252,"companyName":"Linoy company","categoryName":"jewelry","title":"White gold ring","description":"Upscale ring for women","startDate":"2020-11-24T00:00:00.000+00:00","endDate":"2021-01-20T00:00:00.000+00:00","amount":5,"price":3789.0,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmskgwEHIjdd3sSjKwZqQHXxnwLmyX8kjtQw&usqp=CAU"},{"id":253,"companyName":"Shoose","categoryName":"shoes","title":"elegant shoes","description":"black elegant shoes","startDate":"2020-11-23T00:00:00.000+00:00","endDate":"2022-09-29T00:00:00.000+00:00","amount":100,"price":300.0,"image":"https://content.moss.co.uk/images/extralarge/965872215_03.jpg"},{"id":254,"companyName":"Shoose","categoryName":"food","title":"salomon","description":"coocked salomon","startDate":"2020-11-23T00:00:00.000+00:00","endDate":"2020-11-30T00:00:00.000+00:00","amount":10,"price":100.0,"image":"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=1.00xw:0.753xh;0,0.130xh&resize=640:*"}]
    //
    // this.coupons = values.filter((value) => {
    //   return (new Date(value.startDate).valueOf()) <= new Date().valueOf() && value.amount > 0;
    // });
    // this.unlaunchedCoupons = values.filter((value: Object) => {
    //   return (new Date(value.startDate).valueOf()) > new Date().valueOf();
    // });
    //
    // this.showAllcoupon();
    // this.setCategories();

    this.generalService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values.filter((value: Coupon) => {
        return (new Date(value.startDate).valueOf()) <= new Date().valueOf() && value.amount > 0;
      });
      this.unlaunchedCoupons = values.filter((value: Coupon) => {
        return (new Date(value.startDate).valueOf()) > new Date().valueOf();
      });
      this.showAllcoupon();
      this.setCategories();
    });
  }

  showAllcoupon(): void {
    this.filteredCoupons = this.coupons;
    this.refreshCoupons();
    this.setsortByCategory();
  }

  setCategories(): void {
    this.allCategories = Object.keys(this.couponsByCategory);
  }

  openProfile(coupon: Coupon): void {
    this.router.navigate(['home/public/coupon-details', coupon.id]);
  }

  getCouponsByCategory(categoryName: string): void {
    if (categoryName !== this.unlaunchedCouponsCategory) {
      this.filteredCoupons = this.coupons.filter((value: Coupon) => {
        return value.categoryName === categoryName;
      });
    }
    else {
      this.filteredCoupons = this.unlaunchedCoupons;
    }
    this.refreshCoupons();
  }

  getCouponsByPrice(price: number): void {
    this.filteredCoupons = this.coupons.filter((value: Coupon) => {
      return value.price <= price;
    });
    this.refreshCoupons();
  }

  getCouponsByTitle(title: string): void {
    this.filteredCoupons = this.coupons.filter((value: Coupon) => {
      return value.title === title;
    });
    if (this.filteredCoupons.length === 0) {
      this.alertService.error(`no coupons with '${title}' name found`)
    }
    this.refreshCoupons();
  }

  setFilterType(filterEelement: HTMLSelectElement): void {
    const selectedFilter = filterEelement.options[filterEelement.selectedIndex].value;
    this.filterType = selectedFilter === 'all' ? null : selectedFilter;
    this.showAllcoupon();
  }

  filterCoupons(): void {
    let filterInput;
    if (this.filterType === 'title') {
      filterInput = (document.getElementById('filter-input-title') as HTMLInputElement).value;
      this.getCouponsByTitle(filterInput.toLowerCase());
      (document.getElementById('filter-input-title') as HTMLInputElement).value = '';
    } else {
      filterInput = (document.getElementById('filter-input-price') as HTMLInputElement).value;
      this.getCouponsByPrice(filterInput);
      (document.getElementById('filter-input-price') as HTMLInputElement).value = '';
    }
  }

  filterByCategory(filterEelement: HTMLSelectElement): void {
    const selectedFilter = filterEelement.options[filterEelement.selectedIndex].value;
    this.getCouponsByCategory(selectedFilter);
  }

  refreshCoupons(): void {
    this.couponsByCategory = {};
    this.sortByCategory();
  }

  sortByCategory(): void {
    this.filteredCoupons.forEach((coupon: Coupon) => {
      if (!this.couponsByCategory[coupon.categoryName]) {
        this.couponsByCategory[coupon.categoryName] = [coupon];
      } else {
        this.couponsByCategory[coupon.categoryName].push(coupon);
      }
    });
  }

  setsortByCategory(): void {
    this.unlaunchedCoupons.forEach((value: Coupon) => {
      if (!this.couponsByCategory[this.unlaunchedCouponsCategory]) {
        this.couponsByCategory[this.unlaunchedCouponsCategory] = [value];
      } else {
        this.couponsByCategory[this.unlaunchedCouponsCategory].push(value);
      }
    });
  }
}
