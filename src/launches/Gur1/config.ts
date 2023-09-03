import { ProjectAbstract } from '../../ProjectAbstract'
import Banner from './assets/banner.jpeg'
import Logo from './assets/logo.jpeg'
import { AboutProject } from './components/aboutProject'
import { Roadmap } from './components/roadmap'
import { Team } from './components/team'
import { Tokenomics } from './components/tokenomics'

export class Gur1 extends ProjectAbstract {
  id = 'gur1' as const
  name = 'Satsguru Test Project'
  tokenTicker = 'GUR1'

  raiseGoal = '500000000'
  maxAllocation = '1000'
  participants = '0'
  totalRaised = '0'
  tokenPrice = '1'

  shortDescription = 'Underwater crypto with a twist!'
  description =
    'Dive into GUR1, your aquatic treasure! Get fishy profits with our Satsguru Test Project.'

  DescriptionComponent = AboutProject
  RoadMapComponent = Roadmap
  TokenomicsComponent = Tokenomics
  TeamComponent = Team

  registrationStartDateTime = '2023-07-03T14:00:00Z'
  registrationEndDateTime = '2023-07-12T18:00:00Z'

  logo = Logo
  banner = Banner

  tags = ['Memecoin']
  type = 'Meme are real'

  twitterUrl = 'https://twitter.com/satsguru21'
  mediumUrl = ''
  discordUrl = ''
  telegramUrl = ''
  websiteUrl = ''
  whitepaperUrl = ''
}
