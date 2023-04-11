import { trigger,state,style,animate,transition, query, animateChild, group } from '@angular/animations';

export const RouteAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ]),
      ]),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ]),
        query('@*', animateChild())
      ]),
    ])
  ])

  export const shopAnimation =  trigger('openShop', [
    state('open', style({
      opacity: '1',
    })),
    state('closed', style({
      transform: 'translateX(200px)',
      opacity: '0',
      display: 'none'
    })),
    transition('open => closed', [
      animate('0.1s ease-in-out')
    ]),
    transition('closed => open', [
      animate('0.1s ease-in-out')
    ])
  ]);

  export const orderAcceptAnimation = trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(100%)' }),
      animate(100)
    ]),
    transition('* => void', [
      animate(100, style({ transform: 'translateX(100%)' }))
    ])
  ])
  

