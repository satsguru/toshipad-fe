import { ProjectAbstract } from '../../ProjectAbstract'
import Banner from './assets/banner.jpeg'
import { AboutProject } from './components/aboutProject'
import { Roadmap } from './components/roadmap'
import { Team } from './components/team'
import { Tokenomics } from './components/tokenomics'

export class Toshi extends ProjectAbstract {
  id = 'toshi' as const
  name = 'Toshipad'
  tokenTicker = 'TBA'

  raiseGoal = 'TBA'
  maxAllocation = 'TBA'
  participants = '0'
  totalRaised = '0'
  // tokenPrice?: string

  shortDescription = 'Toshipad description'
  description = 'Toshi description'

  DescriptionComponent = AboutProject
  RoadMapComponent = Roadmap
  TokenomicsComponent = Tokenomics
  TeamComponent = Team

  // registrationStartDateTime = '2023-07-25T13:00:00Z'
  // registrationEndDateTime = '2023-07-26T18:00:00Z'

  logo = 'https://i.imgur.com/rNBl5ts.png'
  banner = Banner

  tags = ['Launchpad']
  type = 'Launchpad'

  //
  // twitterUrl?: string;
  // mediumUrl?: string;
  // telegramUrl?: string;
  // websiteUrl?: string;

  // whitepaperUrl = ''
}
