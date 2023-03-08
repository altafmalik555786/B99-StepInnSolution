import { constRoute } from '@utils/route';
import {MenuIcon} from '@utils/menu/menuIcon';

export const menusList = [
  {
    menuTitle: 'MAIN MENU',
    menu: [
      {
        name: 'Dashboard',
        icon: MenuIcon.dashboard,
        link: constRoute.dashboard,
      },
      {
        name: 'Users',
        icon: MenuIcon.dashboard,
        link: constRoute.users,
      },
      {
        name: 'Soccer',
        icon: MenuIcon.soccer,
        link: constRoute.soccer,
      },
      {
        name: 'Tennis',
        icon: MenuIcon.tennis,
        link: constRoute.tennis,
      },
      {
        name: 'Cricket',
        icon: MenuIcon.cricket,
        link: constRoute.cricket,
      },
      {
        name: 'Horse Race',
        icon: MenuIcon.horseRace,
        link: constRoute.horseRace,
      },
      {
        name: 'Greyhound',
        icon: MenuIcon.greyhound,
        link: constRoute.greyhound,
      },
      {
        name: 'RoyalStar Casino',
        icon: MenuIcon.royalStarCasino,
        link: constRoute.royalStarCasino,
      },
      {
        name: 'Star Casino',
        icon: MenuIcon.starCasino,
        link: constRoute.starCasino,
      },
      {
        name: 'Bet Fair Games',
        icon: MenuIcon.betFairGames,
        link: constRoute.betFairGames,
      },
      {
        name: 'Current Positions',
        icon: MenuIcon.currentPosition,
        link: constRoute.currentPosition,
      },
      {
        name: 'All Sports',
        icon: MenuIcon.allSports,
        link: constRoute.allSports,
      },
      {
        name: 'Results',
        icon: MenuIcon.results,
        link: constRoute.results,
      },
      {
        name: 'Market Rules',
        icon: MenuIcon.marketRules,
        link: constRoute.marketRules,
      },
      {
        name: 'Terms and Conditions',
        icon: MenuIcon.termsAndConditions,
        link: constRoute.termsAndConditions,
      },
     
      
    ]
  },
 
]
