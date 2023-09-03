import { format } from 'date-fns'

import { TProjectName } from './launchConfig'

export abstract class ProjectAbstract {
  id: TProjectName
  name: string
  tokenTicker: string

  participants: string
  raiseGoal: string
  maxAllocation: string
  totalRaised: string
  tokenPrice?: string

  shortDescription: string
  description: string
  DescriptionComponent: any
  RoadMapComponent: any
  TokenomicsComponent: any
  TeamComponent: any

  registrationStartDateTime: string
  registrationEndDateTime: string

  logo?: any
  banner?: any

  tags: string[]
  type?: string

  twitterUrl?: string
  mediumUrl?: string
  discordUrl?: string
  telegramUrl?: string
  websiteUrl?: string
  whitepaperUrl?: string

  isLive(): boolean {
    const now = new Date()
    if (this.registrationStartDateTime && this.registrationEndDateTime) {
      const startDate = new Date(this.registrationStartDateTime)
      const endDate = new Date(this.registrationEndDateTime)
      return now >= startDate && now <= endDate
    }
    return false
  }

  isUpcoming(): boolean {
    const now = new Date()
    if (this.registrationStartDateTime) {
      const startDate = new Date(this.registrationStartDateTime)
      return now < startDate
    }
    return false
  }

  isCompleted(): boolean {
    const now = new Date()
    if (this.registrationEndDateTime) {
      const endDate = new Date(this.registrationEndDateTime)
      return now > endDate
    }
    return false
  }

  registrationEndDateShortFormat(): string {
    if (this.registrationEndDateTime) {
      const date = new Date(this.registrationEndDateTime)
      return format(date, 'dd.MM.yyyy')
    }
    return 'TBA'
  }

  registrationStartDateShortFormat(): string {
    if (this.registrationStartDateTime) {
      const date = new Date(this.registrationStartDateTime)
      return format(date, 'dd.MM.yyyy')
    }
    return 'TBA'
  }

  status(): string {
    return this.isLive()
      ? 'In progress'
      : this.isCompleted()
      ? 'Completed'
      : 'Upcoming'
  }

  timerStatus(): string {
    return this.isLive() ? 'Ending In:' : this.isUpcoming() ? 'Upcoming In' : ''
  }
}
