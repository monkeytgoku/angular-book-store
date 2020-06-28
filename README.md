# AngularBookStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## dependencies
### for using bootstrap, fortawesome
npm install bootstrap
npm install jquery
npm install @fortawesome/fontawesome-free

update angular.json
  "styles": [
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.scss"
  ],
  "scripts": [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
  ]

## Dynamic style
<!-- class -->
<!-- <div class="border-red background-yellow">
  1. normal class
</div>
<div [class.border-red]="isEnableClass" [class.background-yellow]="isEnableClass">
  2. class condition
</div> -->

<!-- ngClass -->
<!-- <div [class]="'border-red background-yellow'">
  3. class variable
</div>
<div [class]="['border-red','background-yellow']">
  4. class array
</div>
<div [class]="{'border-red': isEnableClass, 'background-yellow': isEnableClass}">
  5. class object single key
</div>
<div [ngClass]="{'border-red background-yellow': isEnableClass}">
  5. class object multi key -> only ngClass
</div> -->

<!-- style -->
<!-- <div style="background-color: royalblue;">
  1. normal style
</div>
<div [style.border]="'solid 1px blue'">
  2. style variable
</div>
<div [style.font-size]="'16px'">
  3. style variable
</div>
<div [style.fontSize]="'16px'">
  4. style variable
</div>
<div [style.font-size.px]="'16'">
  5. style variable unit
</div> -->

<!-- ngStyle -->
<!-- <div [style]="{'font-size': isEnableClass ? '16px' : '18px'}">
  6. style object
</div>
<div [ngStyle]="{'fontSize.px': isEnableClass ? 16 : 18}">
  7. style variable unit -> only ngStyle not style
</div> -->

### Navigate
this.router.navigateByUrl(`/store/product/${productId}`);
this.router.navigate(['store', 'product', productId]);
this.router.navigate(['product', productId], { relativeTo: this.route, queryParams: {order: 'popular' } });

### Firebase
npm install firebase @angular/fire --save