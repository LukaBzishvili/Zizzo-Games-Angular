import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // const gameButtons = this.elementRef.nativeElement.querySelectorAll('.btn-game');
    // const nextBtn = this.elementRef.nativeElement.querySelector('#next-btn');
    // const prevBtn = this.elementRef.nativeElement.querySelector('#prev-btn');
  
    // let currentIndex = 0;
    // let previndex = 0;
  
    // nextBtn.addEventListener('click', () => {
    //   if (currentIndex < gameButtons.length - 1) {
    //     currentIndex++;
    //     gameButtons[currentIndex - 1].style.display = 'none';
    //     gameButtons[currentIndex].style.display = 'flex';
    //   } else if (currentIndex === 2) {
    //     currentIndex = 0;
    //     gameButtons[currentIndex].style.display = 'flex';
    //     gameButtons[currentIndex + 2].style.display = 'none';
    //   }
    // });
  
    // prevBtn.addEventListener('click', () => {
    //   if (currentIndex > 0) {
    //     currentIndex--;
    //     gameButtons[currentIndex + 1].style.display = 'none';
    //     gameButtons[currentIndex].style.display = 'flex';
    //   } else if (currentIndex === 0) {
    //     currentIndex = 2;
    //     gameButtons[currentIndex].style.display = 'flex';
    //     gameButtons[currentIndex - 2].style.display = 'none';
    //   }
    // });
  
    // for (let i = 1; i < gameButtons.length; i++) {
    //   gameButtons[i].style.display = 'none';
    // }
  
    // const mediaQuery = window.matchMedia('(max-width: 768px)');
  
    // function handleMediaQueryChange() {
    //   if (mediaQuery.matches) {
    //     gameButtons.forEach((cell: any) => {
    //       gameButtons[0].style.display = 'flex';
    //       gameButtons[1].style.display = 'none';
    //       gameButtons[2].style.display = 'none';
    //     });
    //   } else {
    //     gameButtons[0].style.display = 'flex';
    //     gameButtons[1].style.display = 'flex';
    //     gameButtons[2].style.display = 'flex';
    //   }
    // }
  
    // handleMediaQueryChange();
  
    // mediaQuery.addListener(handleMediaQueryChange);
  }

}
