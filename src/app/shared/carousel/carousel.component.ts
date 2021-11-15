import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('carouselContainer') carouselContainer: ElementRef
  @Input() autoPlay: boolean
  @Input() buttons: boolean
  @Input() indicators: boolean
  @Input() visibleItems: number
  @Input() autoPlayDuration: number

  itemWidth: number;
  newScrollWidth: number
  items: any
  windowWidth: number
  scrollableWidth: any
  pages: any = []
  activePage = 1
  totalWidth: number
  counter = 1
  interval: number

  @HostListener('window:resize', ['$event']) onResizeEvent() {
    this._initializeCarousel()
  }

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._animateCarousel()
  }

  private _animateCarousel() {
    this.interval = setInterval(() => {
      if (this.autoPlay && this.autoPlayDuration && this.autoPlayDuration > 0) {
        this.counter++
        this.counter = this.counter > this.pages.length ? 1 : this.counter
        this.indicatorClicked(this.counter)
      }
    }, (this.autoPlayDuration * 1000))
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges()
  }

  ngAfterViewInit(): void {
    this._initializeCarousel()
  }

  indicatorClicked(position: number): void {
    this.activePage = position
    let newPosition = (this.activePage - 1) * this.scrollableWidth
    this.newScrollWidth = newPosition

    this.carouselContainer.nativeElement.scrollTo({
      left: newPosition, top: 0, behavior: 'smooth'
    })
  }

  nextSlide(): void {
    this.activePage = this.activePage + 1

    if (this.activePage > this.pages.length) this.activePage = this.pages.length

    this.newScrollWidth = this.newScrollWidth + this.scrollableWidth
    if (this.newScrollWidth > this.totalWidth) this.newScrollWidth = this.totalWidth

    this.carouselContainer.nativeElement.scrollTo({
      left: this.newScrollWidth, top: 0, behavior: 'smooth'
    })
  }

  prevSlide(): void {
    this.activePage = this.activePage - 1
    if (this.activePage <= 0) this.activePage = 1

    this.newScrollWidth = this.newScrollWidth - this.scrollableWidth

    if (this.newScrollWidth < 0) this.newScrollWidth = 0

    this.carouselContainer.nativeElement.scrollTo({
      left: this.newScrollWidth, top: 0, behavior: 'smooth'
    })
  }

  private _initializeCarousel(): void {
    this.newScrollWidth = 0
    this.items = this.carouselContainer.nativeElement.children
    this.windowWidth = this.carouselContainer.nativeElement.clientWidth
    this.visibleItems = this.visibleItems ? this.visibleItems : 1

    let finalCount: number = this.visibleItems

    if (window.matchMedia('(max-width: 998px)').matches) finalCount = finalCount < 5 ? finalCount : 5

    if (window.matchMedia('(max-width: 898px)').matches) finalCount = finalCount < 4 ? finalCount : 4

    if (window.matchMedia('(max-width: 698px)').matches) finalCount = finalCount < 3 ? finalCount : 3

    if (window.matchMedia('(max-width: 498px)').matches) finalCount = finalCount < 2 ? finalCount : 2

    if (window.matchMedia('(max-width: 328px)').matches) finalCount = finalCount < 1 ? finalCount : 1

    this.itemWidth = Math.floor(this.windowWidth / finalCount)

    this.pages = new Array(Math.ceil(this.items.length / finalCount)).fill('').map((d, i) => ++i)

    for (let item of this.items) {
      item.style.minWidth = `${this.itemWidth}px`
    }
    this.scrollableWidth = this.itemWidth * finalCount
    this.totalWidth = (this.items.length * this.itemWidth) - this.scrollableWidth

    this.carouselContainer.nativeElement.scrollTo({
      left: this.newScrollWidth, top: 0, behavior: 'smooth'
    })
    this.activePage = 1
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
